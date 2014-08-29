package org.pasmo.surveys

import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyChainHandler
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyCrud
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyByIdHandler
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyHandler
import ratpack.groovy.handling.GroovyChainAction

class SurveyChainHandler extends GroovyChainAction {
    private final NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud

    SurveyChainHandler(NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud) {
        this.nonTraditionalOutletSurveyCrud = nonTraditionalOutletSurveyCrud
    }

    @Override
    protected void execute() throws Exception {
        handler(":surveyId/traditional_outlets", registry.get(TraditionalOutletSurveyHandler))
        handler(":surveyId/traditional_outlets/:traditionalOutletSurveyId", registry.get(TraditionalOutletSurveyByIdHandler))
        handler(":id", registry.get(SurveyByIdHandler))
        prefix(":surveyId/non_traditional_outlets") {
            handler(chain(registry.get(NonTraditionalOutletSurveyChainHandler)))
        }
        handler(registry.get(SurveyHandlers))

    }
}
