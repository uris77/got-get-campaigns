package org.pasmo.locations.messagebus

import org.pasmo.locations.LocationEntity

class LocationTrackEvent {
    private final LocationEntity location
    private final ACTION action


    public LocationTrackEvent(LocationEntity location, LocationTrackEvent.ACTION action) {
        this.location = location
        this.action = action
    }

    LocationEntity getLocation() {
        location
    }

    ACTION getAction() {
        action
    }

    enum ACTION {
        CREATE, UPDATE, DELETE
    }
}


