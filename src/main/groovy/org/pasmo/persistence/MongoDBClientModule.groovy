package org.pasmo.persistence

import com.google.inject.AbstractModule
import com.google.inject.Scopes
import org.pasmo.mongo.MongoQuery
import org.pasmo.mongo.MongoQueryImpl

class MongoDBClientModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(MongoDBClient.class).in(Scopes.SINGLETON)
        bind(MongoQuery.class).to(MongoQueryImpl.class).in(Scopes.SINGLETON)
    }
}
