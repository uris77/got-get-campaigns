package org.pasmo.surveys.outlets.traditional

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway
import javax.inject.Inject

class TraditionalOutletSurveyCrud {
    private final String COLLECTION_NAME = "traditional_outlet_surveys"
    private final SurveyGateway surveyGateway
    private final DBCollection mongoCollection


    @Inject
    TraditionalOutletSurveyCrud(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    TraditionalOutletSurveyEntity create(Map params) {
        BasicDBObject doc = new BasicDBObject()
        params.each{ key, value ->
            if(key == "surveyId") {
                SurveyEntity survey = surveyGateway.findById(value.toString())
                doc.append("survey", [id: new ObjectId(survey.id), year: survey.year, month: survey.month])
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                doc.append(key, value)
            } else {
                doc.append(key, value)
            }
        }
        mongoCollection.insert(doc)
        TraditionalOutletSurveyEntity.create(doc)
    }

    TraditionalOutletSurveyEntity update(Map params, String outletSurveyId) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject("gigi", params.gigi)
        updateDoc.append("condoms_available", params.condomsAvailable)
        updateDoc.append("lubes_available", params.lubesAvailable)
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(outletSurveyId)), doc)
        findById(outletSurveyId)
    }

    List<TraditionalOutletSurveyEntity> listAll(String surveyId) {
        List<TraditionalOutletSurveyEntity> traditionalOutletSurveys = []
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey.id", new ObjectId(surveyId)))
        try{
            while(cursor.hasNext()) {
                DBObject obj = cursor.next()
                traditionalOutletSurveys << TraditionalOutletSurveyEntity.create(obj)
            }
        } finally {
            cursor.close()
        }
        traditionalOutletSurveys
    }

    TraditionalOutletSurveyEntity findById(String outletSurveyId) {
        DBObject doc = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(outletSurveyId)))
        TraditionalOutletSurveyEntity.create(doc)
    }


}
