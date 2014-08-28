package org.pasmo.surveys

import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyHandler
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyByIdHandler
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyHandler
import ratpack.groovy.handling.GroovyChainAction

class SurveyChainHandler extends GroovyChainAction {

    @Override
    protected void execute() throws Exception {
        handler(":surveyId/traditional_outlets", registry.get(TraditionalOutletSurveyHandler))
        handler(":surveyId/traditional_outlets/:traditionalOutletSurveyId", registry.get(TraditionalOutletSurveyByIdHandler))
        handler(":surveyId/non_traditional_outlets", registry.get(NonTraditionalOutletSurveyHandler))
        handler(":id", registry.get(SurveyByIdHandler))
        handler(registry.get(SurveyHandlers))

    }
}
