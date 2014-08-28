package org.pasmo.surveys.outlets.traditional

import groovy.transform.Immutable

@Immutable
class TraditionalOutletSurveyEntity {

    String id
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationId
    String locationName
    String locationDistrict
    Map<String, String> survey

}
