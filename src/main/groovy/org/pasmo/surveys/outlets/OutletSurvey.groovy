package org.pasmo.surveys.outlets

import com.mongodb.DBObject
import org.pasmo.locations.LocationEntity
import org.pasmo.surveys.SurveyEntity

class OutletSurvey {
    LocationEntity location
    SurveyEntity survey
    boolean condomsAvailable
    boolean lubesAvailable
    boolean gigi
    Map<String, Boolean> targetPopulations
    Map<String, Boolean> outreach

    static OutletSurvey create(DBObject doc) {
        new OutletSurvey(
                location: LocationEntity.create(doc.get('location') as Map),
                survey: SurveyEntity.create(doc.get('survey') as Map),
                condomsAvailable: doc.get('condomsAvailable') as Boolean,
                lubesAvailable: doc.get("lubesAvailable") as Boolean,
                gigi: doc.get("gigi") as Boolean,
                targetPopulations: doc.get("targetPopulations") as Map,
                outreach: doc.get("outreach") as Map
        )
    }
}
