package org.pasmo.surveys

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.util.JSON
import org.pasmo.persistence.MongoDBClient
import javax.inject.Inject

class SurveyCrudService  {
    private final String COLLECTION_NAME = "pasmo_surveys"

    private final DBCollection mongoCollection
    private final SurveyGateway surveyGateway
    private final MongoDBClient mongoDBClient

    @Inject
    SurveyCrudService(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    SurveyEntity create(String json,  String userName){
        def params = JSON.parse(json)
        SurveyEntity surveyEntity = new SurveyEntity()
        if(surveyGateway.findByMonthAndYear(params.month, params.year)) {
            surveyEntity.addError("Survey already exists!")
        } else {
            BasicDBObject doc = new BasicDBObject()
            params.each{ key, value->
                if(key == "year") {
                    value = Integer.parseInt(value)
                }
                doc.append(key, value)
            }
            doc.append("userName", userName)
            doc.append("dateCreated", new Date())
            mongoCollection.insert(doc)
            surveyEntity = surveyGateway.findByMonthAndYear(params.month, params.year)
        }
        surveyEntity
    }
}
