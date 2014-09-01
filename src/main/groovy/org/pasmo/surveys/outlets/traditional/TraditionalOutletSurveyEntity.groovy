package org.pasmo.surveys.outlets.traditional

import com.mongodb.DBObject
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

    static TraditionalOutletSurveyEntity create(DBObject doc) {
        new TraditionalOutletSurveyEntity(
                id: doc.get("_id").toString(),
                condomsAvailable: doc.get("condoms_available").asBoolean(),
                lubesAvailable: doc.get("lubes_available").asBoolean(),
                gigi: doc.get("gigi").asBoolean(),
                locationId: doc.get("location").id.toString(),
                locationName: doc.get("location").name,
                locationDistrict: doc.get("location").district,
                survey: [
                        id: doc.get("survey").id.toString(),
                        month: doc.get("survey").month,
                        year: doc.get("survey").year.toString()
                ]
        )
    }

}
