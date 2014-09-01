package org.pasmo.locations

import com.mongodb.BasicDBObject
import groovy.transform.Immutable
import org.pasmo.surveys.SurveyEntity

@Immutable
class LocationSurvey {
    String id
    Boolean condomsAvailable
    Boolean lubesAvailable
    Boolean gigi
    String locationName
    String district
    Map<String, String> survey

    static LocationEntity create(BasicDBObject doc, SurveyEntity survey) {
        new LocationSurvey(
                id: doc.get("_id").toString(),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                locationName: doc.get("location_name"),
                district: doc.get("district"),
                survey: [year: survey.year, month: survey.month, id: survey.id]
        )
    }
}