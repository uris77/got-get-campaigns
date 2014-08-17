package org.pasmo.surveys.outlets.traditional

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
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
            if(key == "survey_id") {
                doc.append(key, new ObjectId(value))
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                doc.append(key, value)
            } else {
                doc.append(key, value)
            }
        }
        mongoCollection.insert(doc)
        SurveyEntity survey = surveyGateway.findById(doc.survey_id.toString())
        new TraditionalOutletSurveyEntity(
            id: doc.get("_id").toString(),
            condomsAvailable: doc.get("condoms_available").asBoolean(),
            lubesAvailable: doc.get("lubes_available").asBoolean(),
            gigi: doc.get("gigi").asBoolean(),
            locationName: doc.get("location").name,
            survey: [month: survey.month.toString() ,year: survey.year.toString()]
        )
    }

}
