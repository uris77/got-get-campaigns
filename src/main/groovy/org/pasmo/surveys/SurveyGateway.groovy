package org.pasmo.surveys

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient

import javax.inject.Inject

class SurveyGateway {
    private final String COLLECTION_NAME = "pasmo_surveys"
    private DBCollection mongoCollection
    private MongoDBClient mongoDBClient

    @Inject
    SurveyGateway(MongoDBClient mongoDBClient) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
    }

    SurveyEntity findByMonthAndYear(String month, String year) {
        DBObject obj = mongoCollection.findOne(new BasicDBObject("month", month).append("year", Integer.parseInt(year)))
        if(!obj) {
            return null
        }
        new SurveyEntity(
                id: obj.get("_id").toString(),
                month: obj.get("month"),
                year: obj.get("year")
        )
    }

    List<SurveyEntity> list() {
        List<SurveyEntity> surveys = []
        DBCursor cursor = mongoCollection.find().sort(new BasicDBObject("year", -1))
        try {
            while(cursor.hasNext()) {
                DBObject obj = cursor.next()
                surveys << new SurveyEntity(
                        id: obj.get("_id").toString(),
                        month: obj.get("month"),
                        year: Integer.parseInt(obj.get("year").toString())
                )
            }
        } finally {
            cursor.close()
        }
        surveys
    }

    SurveyEntity findById(String id) {
        DBObject obj = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(id)))
        new SurveyEntity(
                id: obj.get("_id").toString(),
                month: obj.get("month"),
                year: obj.get("year")
        )
    }

    long countBySurveyAndLocationType(SurveyEntity survey, String locationType) {
        DBObject doc = new BasicDBObject()
        doc.append("survey_id", new ObjectId(survey.id))
        long count = 0
        switch(locationType) {
            case "Traditional":
                count = mongoDBClient.getCollection("traditional_outlet_surveys").count(doc)
                break
            case "Non-Traditional":
                count = mongoDBClient.getCollection("nontraditional_outlet_surveys").count(doc)
                break
            case "Hotspot":
                count = mongoDBClient.getCollection("hotspot_surveys").count(doc)
                break
        }
        count
    }


}
