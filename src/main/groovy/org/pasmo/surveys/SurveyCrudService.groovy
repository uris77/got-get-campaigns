package org.pasmo.surveys

import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.mongodb.util.JSON
import org.pasmo.DatabaseClient

import javax.inject.Inject

class SurveyCrudService  {
    private final String COLLECTION_NAME = "pasmo_surveys"

    private final MongoCollection mongoCollection
    private final SurveyGateway surveyGateway

    @Inject
    SurveyCrudService(DatabaseClient databaseClient, SurveyGateway surveyGateway) {
        mongoCollection = databaseClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    SurveyEntity create(String json){
        def params = JSON.parse(json)
        SurveyEntity surveyEntity = new SurveyEntity()
        if(surveyGateway.findByMonthAndYear(params.month, params.year)) {
            surveyEntity.addError("Survey already exists!")
        } else {
            DocumentBuilder doc = BuilderFactory.start()
            params.each{ key, value->
                if(key == 'year') {
                    doc.addInteger(key, Integer.parseInt(value))
                } else {
                    doc.add(key, value)
                }
            }
            mongoCollection.insert(doc)
            surveyEntity = surveyGateway.findByMonthAndYear(params.month, params.year)
        }
        surveyEntity
    }
}
