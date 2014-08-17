package org.pasmo.surveys

import com.google.inject.AbstractModule
import com.google.inject.Provides
import org.pasmo.DatabaseClient

class SurveyGatewayModule extends AbstractModule {
    private final DatabaseClient databaseClient

    SurveyGatewayModule(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient
    }

    @Override
    protected void configure() {
        //bind(SurveyGateway.class).toInstance(new SurveyGateway(mongoClient, DB_NAME))
        //bind(SurveyGateway).in(Scopes.SINGLETON)
    }

    @Provides
    SurveyGateway provideSurveyGateway() {
        new SurveyGateway(databaseClient)
    }
}
