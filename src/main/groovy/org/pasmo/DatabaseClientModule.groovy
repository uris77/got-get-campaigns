package org.pasmo

import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton

class DatabaseClientModule extends AbstractModule {

    @Override
    protected void configure() {}

    @Provides
    @Singleton
    DatabaseClient provideMongoClient() {
        new DatabaseClient()
    }

}
