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
                doc.append("survey_id", new ObjectId(value))
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                doc.append(key, value)
            } else {
                doc.append(key, value)
            }
        }
        mongoCollection.insert(doc)
        SurveyEntity survey = surveyGateway.findById(doc.survey_id.toString())
        createNonTraditionalOutletSurveyEntity(doc, survey)
    }

    NonTraditionalOutletSurveyEntity update(Map params, String outletSurveyId) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject()
        updateDoc.append("condoms_available", params.condomsAvailable)
        updateDoc.append("lubes_available", params.lubesAvailable)
        updateDoc.append("gigi", params.gigi)
        updateDoc.append("outreach", params.outreach)
        updateDoc.append("target_populations", params.targetPopulations)
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(outletSurveyId)), doc)
        findById(outletSurveyId)
    }

    List<NonTraditionalOutletSurveyEntity> listAll(String surveyId) {
        List<NonTraditionalOutletSurveyEntity> surveys = []
        SurveyEntity survey = surveyGateway.findById(surveyId)
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey_id", new ObjectId(surveyId)))
        try {
            while(cursor.hasNext()) {
                DBObject obj = cursor.next()
                surveys << createNonTraditionalOutletSurveyEntity(obj, survey)
            }
        } finally {
            cursor.close()
        }
        surveys
    }

    NonTraditionalOutletSurveyEntity findById(String id) {
        BasicDBObject doc = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(id)))
        createNonTraditionalOutletSurveyEntity(doc)
    }

    private createNonTraditionalOutletSurveyEntity(DBObject doc, SurveyEntity survey) {
        new NonTraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                outletType: doc.get("outlet_type"),
                targetPopulations: doc.get("target_populations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                survey: [
                        year: survey.year.toString(),
                        month: survey.month
                ],
                locationName: doc.get("location").name,
                district: doc.get("location").district
        )
    }

    private createNonTraditionalOutletSurveyEntity(DBObject doc) {
        SurveyEntity survey = surveyGateway.findById(doc.get("survey_id").toString())
        createNonTraditionalOutletSurveyEntity(doc, survey)
    }

}
