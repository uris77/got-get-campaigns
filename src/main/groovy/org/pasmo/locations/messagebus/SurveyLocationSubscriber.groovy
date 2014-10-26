package org.pasmo.locations.messagebus

import com.google.common.eventbus.AllowConcurrentEvents
import com.google.common.eventbus.AsyncEventBus
import com.google.common.eventbus.Subscribe
import org.pasmo.surveys.outlets.OutletSurveyCrud

class SurveyLocationSubscriber implements LocationMessageSubscriber {
    OutletSurveyCrud outletSurveyCrud

    public SurveyLocationSubscriber(AsyncEventBus eventBus, OutletSurveyCrud outletSurveyCrud) {
        this.outletSurveyCrud = outletSurveyCrud
        eventBus.register(this)
    }

    @Override
    @Subscribe
    @AllowConcurrentEvents
    void handleMessage(LocationTrackEvent locationTrackEvent) {
        switch(locationTrackEvent.action) {
            case LocationTrackEvent.ACTION.UPDATE:
                outletSurveyCrud.updateLocationInSurveys(locationTrackEvent.location)
                break
        }
    }
}
