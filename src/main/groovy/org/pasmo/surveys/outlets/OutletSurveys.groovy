package org.pasmo.surveys.outlets

interface OutletSurveys {
    List<OutletSurvey> listAll(String outletType, String surveyId)
    OutletSurvey findById(String id)
}
