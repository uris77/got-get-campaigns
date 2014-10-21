package org.pasmo.locations

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway
import org.pasmo.surveys.outlets.OutletSurvey

import javax.inject.Inject

class LocationMongoGateway implements LocationGateway {
    private final String COLLECTION_NAME = "pasmo_locations"
    private final String SURVEYS_COLLECTION = "outlet_surveys"
    private DBCollection mongoCollection
    private MongoDBClient mongoDBClient
    private final SurveyGateway surveyGateway

    @Override
    LocationEntity findById(String locationId) {
        LocationEntity.create mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(locationId)))
    }

    @Inject
    LocationMongoGateway(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    @Override
    List<OutletSurvey> findSurveys(String locationId) {
        List<OutletSurvey> surveys = []
        DBCollection surveyCollection = mongoDBClient.getCollection(SURVEYS_COLLECTION)
        DBCursor cursor = surveyCollection.find(new BasicDBObject("location.id", new ObjectId(locationId)))
        try {
            while(cursor.hasNext()) {
                surveys << OutletSurvey.create(cursor.next())
            }
        }finally {
            cursor.close()
        }
        surveys
    }

    long countByType(String locationType) {
        mongoCollection.count(new BasicDBObject("locationType", locationType))
    }

    List<LocationEntity> findAllByType(String locationType) {
        List<LocationEntity> locations = []
        if(locationType == "Non_traditional") {
            locationType = "Non-Traditional"
        }
        DBCursor cursor = mongoCollection.find(new BasicDBObject("locationType", locationType))
        try {
            while(cursor.hasNext()) {
                DBObject doc = cursor.next()
                locations << LocationEntity.create(doc)
            }
        } finally {
            cursor.close()
        }
        locations
    }

    @Override
    List<LocationEntity> findByName(String locationName) {
        List<LocationEntity> locations = []
        DBCursor cursor = mongoCollection.find(new BasicDBObject('$text', ['$search': locationName]))
        try {
            while(cursor.hasNext()) {
                DBObject doc = cursor.next()
                locations << LocationEntity.create(doc)
            }
        } finally {
            cursor.close()
        }
        locations
    }

    private DBCollection getSurveyCollection(String locationType) {
        String surveyCollection
        switch(locationType) {
            case "Hotspot":
                surveyCollection = "hotspot_surveys"
                break
            case "Traditional":
                surveyCollection = "traditional_outlet_surveys"
                break
            case "Non-Traditional":
                surveyCollection = "nontraditional_outlet_surveys"
                break
        }
        mongoDBClient.getCollection(surveyCollection)
    }
}
