package org.pasmo.persistence

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo

class MongoDBClient {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    private final int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))
    private final String DB_NAME = System.getProperty("USER_DB_NAME")
    private final String USERNAME = System.getProperty("MONGO_USERNAME")
    private final String PASSWORD =  System.getProperty("MONGO_PASSWORD")

    private Mongo _mongoClient

    Mongo getMongoClient() {
        if(_mongoClient == null) {
            _mongoClient = new Mongo(DB_HOST, DB_PORT)

        }
        _mongoClient
    }

    DB getDatabase() {
        if(USERNAME && PASSWORD) {
            return mongoClient.getDB(DB_NAME).authenticate(USERNAME, PASSWORD as char[])
        }
        mongoClient.getDB(DB_NAME)
    }

    DBCollection getCollection(String collectionName) {
        database.getCollection(collectionName)
    }
}
