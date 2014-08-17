package org.pasmo.locations

import com.google.inject.AbstractModule
import org.pasmo.MongoClientTrait

class LocationCrudModule extends AbstractModule implements MongoClientTrait {

    @Override
    protected void configure() {
        bind(LocationCrudService).toInstance(new LocationCrudService(mongoClient, System.getProperty("USER_DB_NAME")))
    }

}
