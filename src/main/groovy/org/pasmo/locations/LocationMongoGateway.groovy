package org.pasmo.locations

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.pasmo.persistence.MongoDBClient

import javax.inject.Inject

class LocationMongoGateway implements LocationGateway {
    private final String COLLECTION_NAME = "pasmo_locations"
    private DBCollection mongoCollection
    private MongoDBClient mongoDBClient

    @Inject
    LocationMongoGateway(MongoDBClient mongoDBClient) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
    }

    @Override
    List<LocationSurvey> findSurveys(String locationId) {
        //Retrieve location
        return null
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
}
