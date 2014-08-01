package org.pasmo.gotitget.repositories

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.MongoDatabase

abstract class AbstractMongoRepository {
    abstract String getCollectionName()

    MongoCollection mongoCollection
    MongoDatabase mongoDatabase

    public AbstractMongoRepository(MongoClient mongo, String databaseName) {
        mongoDatabase = mongo.getDatabase(databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
    }
}
