package org.pasmo.surveys.outlets.nontraditional

import groovy.transform.Immutable

@Immutable
class NonTraditionalOutletSurveyEntity {
    String id
    String outletType
    Map<String, Boolean> targetPopulations
    Map<String, Boolean> outreach
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationName
    String district
    Map<String, String> survey
}
