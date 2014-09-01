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
    Map<String, Boolean> targetPopulations
    Map<String, Boolean> outreach
    String outletType

    static LocationSurvey create(BasicDBObject doc) {
        LocationSurvey locationSurvey = new LocationSurvey(
                id: doc.get("_id").toString(),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                locationName: doc.get("location").name,
                district: doc.get("location").district,
                survey: [id: doc.get("survey").id.toString(), year: doc.get("survey").year.toString(), month: doc.get("survey").month],
                targetPopulations: doc.get("target_populations"),
                outreach: doc.get("outreach"),
                outletType: doc.get("outlet_type")?.name
        )

        locationSurvey
    }
}