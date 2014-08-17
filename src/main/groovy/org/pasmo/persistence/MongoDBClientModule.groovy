package org.pasmo.persistence

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class MongoDBClientModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(MongoDBClient.class).in(Scopes.SINGLETON)
    }
}
