package org.pasmo.surveys.outlets.traditional

import groovy.transform.Immutable

@Immutable
class OutletSurveyEntity {

    String id
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationName
    Map<String, String> survey

}
