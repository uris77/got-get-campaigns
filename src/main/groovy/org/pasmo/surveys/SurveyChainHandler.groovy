package org.pasmo.surveys

import org.pasmo.surveys.outlets.hotspot.HotspotSurveyHandler
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyChainHandler
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyCrud
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyHandler
import ratpack.groovy.handling.GroovyChainAction

class SurveyChainHandler extends GroovyChainAction {
    private final NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud

    SurveyChainHandler(NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud) {
        this.nonTraditionalOutletSurveyCrud = nonTraditionalOutletSurveyCrud
    }

    @Override
    protected void execute() throws Exception {
        prefix(":surveyId/traditional_outlets") {
            handler(chain(registry.get(TraditionalOutletSurveyHandler)))
        }
        prefix(":surveyId/non_traditional_outlets") {
            handler(chain(registry.get(NonTraditionalOutletSurveyChainHandler)))
        }
        prefix(":surveyId/hotspots") {
            handler(chain(registry.get(HotspotSurveyHandler)))
        }
        handler(":id", registry.get(SurveyByIdHandler))

        handler(registry.get(SurveyHandlers))
    }
}
