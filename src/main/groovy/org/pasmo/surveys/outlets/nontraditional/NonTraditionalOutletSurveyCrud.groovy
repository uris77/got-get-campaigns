package org.pasmo.surveys.outlets.nontraditional

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
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

    private createNonTraditionalOutletSurveyEntity(DBObject doc, SurveyEntity survey) {
        new NonTraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                outletType: doc.get("outlet_type"),
                targetPopulations: doc.get("targetPopulations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                survey: [
                        year: survey.year.toString(),
                        month: survey.month
                ]
        )
    }

}
