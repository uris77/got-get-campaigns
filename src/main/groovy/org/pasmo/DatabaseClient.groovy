package org.pasmo

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoClientConfiguration
import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.MongoDatabase
import com.allanbank.mongodb.MongoFactory


class DatabaseClient {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    private final int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))
    private final String DB_NAME = System.getProperty("USER_DB_NAME")

    MongoClient _mongoClient

    MongoClient getMongoClient() {
        MongoClientConfiguration config = new MongoClientConfiguration()
        config.addServer(DB_HOST)
        if(_mongoClient == null) {
            _mongoClient = MongoFactory.createClient(config)
        }
        _mongoClient
    }

    MongoDatabase getDatabase() {
        mongoClient.getDatabase(DB_NAME)
    }

    MongoCollection getCollection(String collectionName) {
        database.getCollection(collectionName)
    }

}
