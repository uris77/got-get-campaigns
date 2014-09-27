package org.pasmo.persistence

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.MongoClient
import com.mongodb.MongoClientURI
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
            if(USERNAME && PASSWORD) {
                String connectionString = "mongodb://${USERNAME}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
                MongoClientURI uri = new MongoClientURI(connectionString)
                _mongoClient = new MongoClient(uri)
            } else {
                _mongoClient = new MongoClient(new ServerAddress(DB_HOST, DB_PORT))
            }
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
