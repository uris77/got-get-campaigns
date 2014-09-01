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

    static NonTraditionalOutletSurveyEntity create(DBObject doc) {
        new NonTraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                outletType: doc.get("outlet_type"),
                targetPopulations: doc.get("target_populations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                survey: [
                        id: doc.get("survey").id.toString(),
                        year: doc.get("survey").year.toString(),
                        month: doc.get("survey").month
                ],
                locationName: doc.get("location").name,
                district: doc.get("location").district
        )
    }
}
