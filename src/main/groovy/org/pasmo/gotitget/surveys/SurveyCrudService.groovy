package org.pasmo.gotitget.surveys

import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.allanbank.mongodb.bson.element.ObjectId
import com.allanbank.mongodb.builder.Aggregate
import com.allanbank.mongodb.builder.QueryBuilder
import com.allanbank.mongodb.builder.Sort
import com.mongodb.util.JSON
import org.pasmo.gotitget.DatabaseClient

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
        if(find(params.month, Integer.parseInt(params.year.toString()))) {
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
            surveyEntity = new SurveyEntity(find(params.month, Integer.parseInt(params.year.toString())))
            //surveyEntity = new SurveyEntity(surveyGateway.findByMonthAndYear(params.month, params.year))
        }
        surveyEntity
    }

    Document find(String month, int year) {
        mongoCollection.findOne(QueryBuilder.where("month").equals(month).and("year").equals(year))
    }

    List<SurveyEntity> findAll() {
        List<SurveyEntity> surveys = []
        Aggregate.Builder builder = new Aggregate.Builder()
        builder.sort(Sort.desc("year"))
        mongoCollection.aggregate(builder).each { doc ->
            surveys << new SurveyEntity(doc)
        }
        surveys
    }

    SurveyEntity findById(String id) {
        Document doc = mongoCollection.findOne(QueryBuilder.where("_id").equals(new ObjectId(id)))
        new SurveyEntity(doc)
    }
}
