package org.pasmo.surveys.outlets.hotspot

import groovy.transform.Immutable

@Immutable
class HotspotEntity {
    String id
    Map<String, Boolean> targetPopulations
    Map<String, Boolean> outreach
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationName
    String district
    Map<String, String> survey
}
