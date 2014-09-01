package org.pasmo.locations

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class LocationCrudModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(LocationCrudService).in(Scopes.SINGLETON)
        bind(LocationGateway.class).to(LocationMongoGateway.class).in(Scopes.SINGLETON)
    }

}
