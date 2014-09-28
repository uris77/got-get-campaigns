package org.pasmo.surveys.outlets

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway

import javax.inject.Inject

class OutletSurveyCrud {
    private final MongoDBClient mongoDBClient
    private final DBCollection mongoCollection
    private final SurveyGateway surveyGateway
    private final String COLLECTION_NAME = "outlet_surveys"

    @Inject
    OutletSurveyCrud(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    OutletSurvey create(Map params, String username) {
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
        doc.append("createdBy", username)
        doc.append("dateCreated", new Date())
        mongoCollection.insert(doc)
        OutletSurvey.create(doc)
    }
}
