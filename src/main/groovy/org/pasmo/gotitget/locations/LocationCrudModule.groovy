package org.pasmo.gotitget.locations

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoClientConfiguration
import com.allanbank.mongodb.MongoFactory
import com.google.inject.AbstractModule

class LocationCrudModule extends AbstractModule {

    private static MongoClient _mongo
    private final static String DB_HOST = System.getProperty("USER_DB_HOST")
    private final static int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))

    @Override
    protected void configure() {
        bind(LocationCrudService).toInstance(new LocationCrudService(mongo, System.getProperty("USER_DB_NAME")))
    }

    private static MongoClient getMongo() {
        MongoClientConfiguration config = new MongoClientConfiguration()
        config.addServer(DB_HOST)
        if(_mongo == null) {
            _mongo = MongoFactory.createClient(config)
        }
        _mongo
    }
}
