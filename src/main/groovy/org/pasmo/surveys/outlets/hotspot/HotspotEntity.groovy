package org.pasmo.surveys.outlets.hotspot

import com.mongodb.DBObject
import groovy.transform.Immutable
import org.pasmo.surveys.SurveyEntity

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
    String notes

    static HotspotEntity create(DBObject doc) {
        new HotspotEntity(
                id: doc.get("_id").toString(),
                targetPopulations: doc.get("targetPopulations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condomsAvailable"),
                lubesAvailable: doc.get("lubesAvailable"),
                gigi: doc.get("gigi"),
                survey: [
                        id: doc.get("survey").id.toString(),
                        year: doc.get("survey").year.toString(),
                        month: doc.get("survey").month
                ],
                locationName: doc.get("location").name,
                district: doc.get("location").district,
                notes: doc.get("notes") ?: ""
        )
    }
}
