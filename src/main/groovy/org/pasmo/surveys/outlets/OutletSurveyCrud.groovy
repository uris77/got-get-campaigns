package org.pasmo.surveys.outlets

import org.pasmo.locations.LocationEntity

public interface OutletSurveyCrud {
    public void updateLocationInSurveys(LocationEntity locationEntity)
    OutletSurvey create(Map params, String username)
    OutletSurvey update(Map params, String outletSurveyId, String userName)

}