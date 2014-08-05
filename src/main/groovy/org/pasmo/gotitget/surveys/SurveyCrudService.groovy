package org.pasmo.gotitget.surveys

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.allanbank.mongodb.builder.Aggregate
import com.allanbank.mongodb.builder.QueryBuilder
import com.allanbank.mongodb.builder.Sort
import com.mongodb.util.JSON
import org.pasmo.gotitget.repositories.AbstractMongoRepository

class SurveyCrudService extends AbstractMongoRepository {

    private MongoCollection mongoCollection

    SurveyCrudService(MongoClient mongo, String databaseName) {
        super(mongo, databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
    }

    @Override
    String getCollectionName() {
        "pasmo_surveys"
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
}
