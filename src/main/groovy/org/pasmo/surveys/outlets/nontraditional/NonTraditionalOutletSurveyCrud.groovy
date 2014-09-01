package org.pasmo.surveys.outlets.nontraditional

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway

import javax.inject.Inject

class NonTraditionalOutletSurveyCrud {

    private final String COLLECTION_NAME = "nontraditional_outlet_surveys"
    private SurveyGateway surveyGateway
    private DBCollection mongoCollection


    @Inject
    TraditionalOutletSurveyCrud(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    NonTraditionalOutletSurveyEntity create(Map params) {
        BasicDBObject doc = new BasicDBObject()
        params.each{key, value ->
            if(key == "surveyId") {
                SurveyEntity survey = surveyGateway.findById(value.toString())
                doc.append("survey",[id: new ObjectId(survey.id), year: survey.year, month: survey.month])
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                doc.append(key, value)
            } else {
                doc.append(key, value)
            }
        }
        mongoCollection.insert(doc)
        NonTraditionalOutletSurveyEntity.create(doc)
    }

    NonTraditionalOutletSurveyEntity update(Map params, String outletSurveyId) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject()
        updateDoc.append("condomsAvailable", params.condomsAvailable)
        updateDoc.append("lubesAvailable", params.lubesAvailable)
        updateDoc.append("gigi", params.gigi)
        updateDoc.append("outreach", params.outreach)
        updateDoc.append("targetPopulations", params.targetPopulations)
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(outletSurveyId)), doc)
        findById(outletSurveyId)
    }

    List<NonTraditionalOutletSurveyEntity> listAll(String surveyId) {
        List<NonTraditionalOutletSurveyEntity> surveys = []
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey.id", new ObjectId(surveyId)))
        try {
            while(cursor.hasNext()) {
                DBObject obj = cursor.next()
                surveys << NonTraditionalOutletSurveyEntity.create(obj)
            }
        } finally {
            cursor.close()
        }
        surveys
    }

    NonTraditionalOutletSurveyEntity findById(String id) {
        BasicDBObject doc = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(id)))
        NonTraditionalOutletSurveyEntity.create(doc)
    }

}
