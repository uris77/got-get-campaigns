package org.pasmo.gotitget

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoClientConfiguration
import com.allanbank.mongodb.MongoFactory

trait MongoClientTrait {
    private final String DB_HOST = System.getProperty("USER_DB_HOST")
    private final int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))

    MongoClient mongoClient

    MongoClient getMongoClient() {
        MongoClientConfiguration config = new MongoClientConfiguration()
        config.addServer(DB_HOST)
        if(mongoClient == null) {
            mongoClient = MongoFactory.createClient(config)
        }
        mongoClient
    }

}
