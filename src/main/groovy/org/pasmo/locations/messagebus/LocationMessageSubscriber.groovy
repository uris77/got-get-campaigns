package org.pasmo.locations.messagebus


public interface LocationMessageSubscriber {
    public void handleMessage(LocationTrackEvent locationTrackEvent)
}