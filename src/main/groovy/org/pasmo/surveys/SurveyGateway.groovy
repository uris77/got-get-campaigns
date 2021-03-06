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
        DBCursor cursor = mongoCollection.find().sort(new BasicDBObject("year", -1).append("monthOrder", 1))
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
        DBCollection outletSurveysCollection = mongoDBClient.getCollection("outlet_surveys")
        doc.append("survey.id", new ObjectId(survey.id))
        long count = 0
        switch(locationType) {
            case "Traditional":
                count = outletSurveysCollection.count(doc.append("outletType", "traditional"))
                break
            case "Non-Traditional":
                count = outletSurveysCollection.count(doc.append("outletType", "non-traditional"))
                break
            case "Hotspot":
                count = outletSurveysCollection.count(doc.append("outletType", "hotspot"))
                break
        }
        count
    }


}
