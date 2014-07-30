package org.pasmo.gotitget.repositories

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoClientConfiguration
import com.allanbank.mongodb.MongoDatabase
import com.allanbank.mongodb.MongoFactory
import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo

abstract class AbstractMongoRepository {
    abstract String getCollectionName()

    DBCollection collection
    MongoClient mongoClient
    MongoDatabase mongoDatabase

    public AbstractMongoRepository(Mongo mongo, String databaseName) {
        DB db = mongo.getDB(databaseName)
        collection = db.getCollection(getCollectionName())
        MongoClientConfiguration config = new MongoClientConfiguration()
        config.addServer(System.getProperty("USER_DB_HOST"))
        mongoClient = MongoFactory.createClient(config)
        mongoDatabase = mongoClient.getDatabase(System.getProperty("USER_DB_NAME"))
    }
}
