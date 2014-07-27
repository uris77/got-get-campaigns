package org.pasmo.gotitget.repositories

import com.google.inject.AbstractModule
import com.mongodb.MongoClient
import groovy.transform.CompileStatic

@CompileStatic
class UserRepositoryModule extends AbstractModule {

    private static MongoClient _mongo
    private final static String DB_HOST = System.getProperty("USER_DB_HOST")
    private final static int DB_PORT = Integer.parseInt(System.getProperty("USER_DB_PORT"))

    @Override
    protected void configure() {
        bind(UserMongoRepository).toInstance(new UserMongoRepository(mongo, System.getProperty("USER_DB_NAME")))
    }

    private static MongoClient getMongo() {
        if(_mongo == null) {
            _mongo  = new MongoClient(DB_HOST, DB_PORT)
        }

        _mongo
    }

}