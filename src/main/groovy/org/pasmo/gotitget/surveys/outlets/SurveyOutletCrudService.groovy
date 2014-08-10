package org.pasmo.gotitget.surveys.outlets

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.mongodb.util.JSON
import org.pasmo.gotitget.repositories.AbstractMongoRepository
import org.pasmo.gotitget.surveys.SurveyEntity

import static com.allanbank.mongodb.builder.QueryBuilder.where

class SurveyOutletCrudService extends AbstractMongoRepository {

    SurveyOutletCrudService(MongoClient mongo, String databaseName) {
        super(mongo, databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
    }

    @Override
    String getCollectionName() {
        "outlet_surveys"
    }

    def create(String json) {
        def params = JSON.parse(json)
        DocumentBuilder doc = BuilderFactory.start()
        params.each{ key, value ->
            doc.add(key, value)
        }
        mongoCollection.insert(doc)
        new OutletSurveyEntity(find(survey, params.json.location.id))
    }

    def find(SurveyEntity  survey, String locationId) {
        mongoCollection.findOne(where("month").equals(survey.month).where("year").equals(survey.year).where("location_id").equals(locationId))
    }
}
