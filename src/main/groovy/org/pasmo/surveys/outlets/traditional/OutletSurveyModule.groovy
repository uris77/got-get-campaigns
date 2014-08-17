package org.pasmo.surveys.outlets.traditional

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class OutletSurveyModule extends AbstractModule  {
    //private final MongoDBClient mongoDBClient
    private final String DB_NAME = System.getProperty("USER_DB_NAME")

//    OutletSurveyModule(MongoDBClient mongoDBClient) {
//        this.mongoDBClient = mongoDBClient
//    }

    @Override
    protected void configure() {
        bind(SurveyOutletCrudService.class).in(Scopes.SINGLETON)
    }

}
