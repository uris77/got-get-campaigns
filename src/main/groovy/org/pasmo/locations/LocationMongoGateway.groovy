package org.pasmo.locations

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.builder.QueryBuilder
import org.pasmo.repositories.AbstractMongoRepository

class LocationMongoGateway extends AbstractMongoRepository implements LocationRepositoryTrait, LocationGateway {

     LocationMongoGateway(MongoClient mongo, String databaseName) {
        super(mongo, databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
    }

    long countBySurvey(String month, String year) {
        1
    }

    long countByType(String locationType) {
        mongoCollection.count(QueryBuilder.where("locationType").equals(locationType))

    }

    List<LocationEntity> findAllByType(String locationType) {
        if(locationType == "Non_traditional") {
            locationType = "Non-Traditional"
        }
        mongoCollection.find(QueryBuilder.where("locationType").equals(locationType)).collect{ Document doc ->
            new LocationEntity(doc)
        }
    }
}
