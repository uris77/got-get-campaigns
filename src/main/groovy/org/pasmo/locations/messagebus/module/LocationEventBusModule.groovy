package org.pasmo.locations.messagebus.module

import com.google.common.eventbus.AsyncEventBus
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Scopes
import org.pasmo.locations.messagebus.LocationGuavaMessagePublisher
import org.pasmo.locations.messagebus.LocationMessagePublisher

import java.util.concurrent.Executors
import javax.inject.Singleton

class LocationEventBusModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(LocationMessagePublisher.class).to(LocationGuavaMessagePublisher.class).in(Scopes.SINGLETON)
    }

    @Provides
    @Singleton
    AsyncEventBus provideEventBus() {
        new AsyncEventBus(Executors.newCachedThreadPool())
    }
}
