package org.pasmo.surveys

import com.google.inject.AbstractModule
import com.google.inject.Scopes
import org.pasmo.MongoClientTrait
import org.pasmo.locations.LocationMongoGateway
import org.pasmo.locations.LocationGateway

class SurveyCrudModule extends AbstractModule implements MongoClientTrait {

    @Override
    protected void configure(){
        bind(SurveyCrudService.class).in(Scopes.SINGLETON)
        bind(LocationGateway.class).toInstance(new LocationMongoGateway(mongoClient, System.getProperty("USER_DB_NAME")))
    }

}
