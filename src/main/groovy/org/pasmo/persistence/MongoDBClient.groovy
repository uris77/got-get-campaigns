package org.pasmo.persistence

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo

class MongoDBClient {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    private final int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))
    private final String DB_NAME = System.getProperty("USER_DB_NAME")

    private Mongo _mongoClient

    Mongo getMongoClient() {
        if(_mongoClient == null) {
            _mongoClient = new Mongo(DB_HOST, DB_PORT)
        }
        _mongoClient
    }

    DB getDatabase() {
        mongoClient.getDB(DB_NAME)
    }

    DBCollection getCollection(String collectionName) {
        database.getCollection(collectionName)
    }
}
