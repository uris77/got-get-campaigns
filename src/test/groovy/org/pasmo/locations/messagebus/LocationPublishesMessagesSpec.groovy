package org.pasmo.locations.messagebus

import com.google.common.eventbus.AsyncEventBus
import org.pasmo.locations.LocationEntity
import spock.lang.Specification

class LocationPublishesMessagesSpec extends Specification {

    def "publishes message to event bus"() {
        given:
        def eventBus = Mock(AsyncEventBus)
        LocationMessagePublisher publisher = new LocationGuavaMessagePublisher(eventBus)

        and:
        def trackEvent = new LocationTrackEvent(new LocationEntity(name: "Here"), LocationTrackEvent.ACTION.CREATE)

        when:
        publisher.notifyChange(trackEvent)

        then:
        1 * eventBus.post(_)
    }
}