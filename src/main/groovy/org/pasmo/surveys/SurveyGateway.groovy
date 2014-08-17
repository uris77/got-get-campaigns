package org.pasmo.surveys

import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectId
import com.allanbank.mongodb.builder.Aggregate
import com.allanbank.mongodb.builder.QueryBuilder
import com.allanbank.mongodb.builder.Sort
import org.pasmo.DatabaseClient
import javax.inject.Inject
import static com.allanbank.mongodb.builder.QueryBuilder.where

class SurveyGateway {
    private final String COLLECTION_NAME = "pasmo_surveys"

    private final MongoCollection mongoCollection

    @Inject
    SurveyGateway(DatabaseClient databaseClient) {
        mongoCollection = databaseClient.getCollection(COLLECTION_NAME)
    }

    Document findByMonthAndYear(String month, String year) {
        mongoCollection.findOne(where("month").equals(month).and("year").equals(Integer.parseInt(year)))
    }

    List<SurveyEntity> list() {
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
