package org.pasmo.gotitget.surveys.outlets

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
