package org.pasmo.persistence

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo
import com.mongodb.MongoClient
import com.mongodb.MongoCredential
import com.mongodb.ServerAddress

class MongoDBClient {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    private final int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))
    private final String DB_NAME = System.getProperty("USER_DB_NAME")
    private final String USERNAME = System.getProperty("MONGO_USERNAME")
    private final String PASSWORD =  System.getProperty("MONGO_PASSWORD")

    private MongoClient _mongoClient

    MongoClient getMongoClient() {
        if(_mongoClient == null) {
            _mongoClient = new MongoClient(new ServerAddress(DB_HOST, DB_PORT),
                    [MongoCredential.createMongoCRCredential(USERNAME, DB_NAME, PASSWORD as char[])])
        }
        _mongoClient
    }

    DB getDatabase() {
        if(USERNAME && PASSWORD) {

            mongoClient.getDB(DB_NAME).authenticateCommand(USERNAME, PASSWORD as char[])
        }
        mongoClient.getDB(DB_NAME)
    }

    DBCollection getCollection(String collectionName) {
        database.getCollection(collectionName)
    }
}
