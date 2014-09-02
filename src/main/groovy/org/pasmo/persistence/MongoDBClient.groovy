package org.pasmo.persistence

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo

class MongoDBClient {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    def DB_PORT = System.getProperty("USER_DB_PORT") //Integer.parseInt(System.getProperty("USER_DB_PORT"))
    private final String DB_NAME = System.getProperty("USER_DB_NAME")

    private Mongo _mongoClient

    Mongo getMongoClient() {
        if(_mongoClient == null) {
            println "\n\nDB_PORT: ${System.getProperty('USER_DB_PORT')}"
            println "DB_NAME: ${System.getProperty('USER_DB_NAME')}"
            _mongoClient = new Mongo(DB_HOST, Integer.parseInt(DB_PORT.toString()))
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
