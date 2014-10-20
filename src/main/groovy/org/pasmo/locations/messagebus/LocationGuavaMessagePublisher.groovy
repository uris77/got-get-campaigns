package org.pasmo.locations.messagebus

import com.google.common.eventbus.AsyncEventBus

import javax.inject.Inject

class LocationGuavaMessagePublisher implements LocationMessagePublisher {
    private final AsyncEventBus eventBus

    @Inject
    public LocationGuavaMessagePublisher(AsyncEventBus eventBus) {
        this.eventBus = eventBus
    }

    @Override
    void notifyChange(LocationTrackEvent locationEntity) {
        eventBus.post(locationEntity)
    }

}
