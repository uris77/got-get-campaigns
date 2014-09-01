package org.pasmo.locations

import groovy.transform.Immutable

@Immutable
class LocationSurvey {
    String id
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationName
    String district
    Map<String, String> survey
}