package org.pasmo.locations.messagebus

interface LocationMessagePublisher {
    public void notifyChange(LocationTrackEvent locationTrackEvent)
}
