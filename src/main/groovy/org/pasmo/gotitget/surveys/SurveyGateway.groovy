package org.pasmo.gotitget.surveys

import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.Document
import org.pasmo.gotitget.DatabaseClient
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
        mongoCollection.findOne(where("month").equals(month).where("year").equals(year))
    }
}
