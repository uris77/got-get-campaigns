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
        createTraditionalOutletSurveyEntity(doc, survey)
    }

    List<TraditionalOutletSurveyEntity> listAll(String surveyId) {
        List<TraditionalOutletSurveyEntity> tradtionalOutletSurveys = []
        SurveyEntity survey = surveyGateway.findById(surveyId.toString())
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey_id", new ObjectId(surveyId)))
        try{
            while(cursor.hasNext()) {
                DBObject obj = cursor.next()
                tradtionalOutletSurveys << createTraditionalOutletSurveyEntity(obj, survey)
            }
        } finally {
            cursor.close()
        }
        tradtionalOutletSurveys
    }

    private TraditionalOutletSurveyEntity createTraditionalOutletSurveyEntity(DBObject doc, SurveyEntity survey) {
        new TraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                condomsAvailable: doc.get("condoms_available").asBoolean(),
                lubesAvailable: doc.get("lubes_available").asBoolean(),
                gigi: doc.get("gigi").asBoolean(),
                locationName: doc.get("location").name,
                locationDistrict: doc.get("location").district,
                survey: [month: survey.month.toString() ,year: survey.year.toString()]
        )
    }

}
