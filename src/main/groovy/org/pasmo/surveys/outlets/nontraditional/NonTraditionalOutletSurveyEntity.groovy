package org.pasmo.surveys.outlets.nontraditional

import com.mongodb.DBObject
import groovy.transform.Immutable
import org.pasmo.surveys.SurveyEntity

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
    String notes

    static NonTraditionalOutletSurveyEntity create(DBObject doc) {
        new NonTraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                outletType: doc.get("outletType"),
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
