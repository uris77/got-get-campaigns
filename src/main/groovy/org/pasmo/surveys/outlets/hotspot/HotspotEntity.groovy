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

    static HotspotEntity create(DBObject doc, SurveyEntity survey) {
        new HotspotEntity(
                id: doc.get("_id").toString(),
                targetPopulations: doc.get("target_populations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                survey: [
                        year: survey.year.toString(),
                        month: survey.month
                ],
                locationName: doc.get("location").name,
                district: doc.get("location").district
        )
    }
}
