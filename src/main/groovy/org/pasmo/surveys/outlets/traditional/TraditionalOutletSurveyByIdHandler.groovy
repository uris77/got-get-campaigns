package org.pasmo.surveys.outlets.traditional

import org.pasmo.surveys.SurveyGateway
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class TraditionalOutletSurveyByIdHandler extends GroovyHandler {
    private final TraditionalOutletSurveyCrud traditionalOutletSurveyCrud
    private final SurveyGateway surveyGateway

    @Inject
    TraditionalOutletSurveyByIdHandler(TraditionalOutletSurveyCrud traditionalOutletSurveyCrud, SurveyGateway surveyGateway) {
        this.surveyGateway = surveyGateway
        this.traditionalOutletSurveyCrud = traditionalOutletSurveyCrud
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get {
                    blocking {
                        traditionalOutletSurveyCrud.findById(pathTokens.traditionalOutletSurveyId, pathTokens.surveyId)
                    } then { TraditionalOutletSurveyEntity outlet ->
                        render json(outlet)
                    }
                }

                put {
                    blocking {
                        def params = parse Map
                        traditionalOutletSurveyCrud.update(params, pathTokens.traditionalOutletSurveyId, pathTokens.surveyId)
                    } then { TraditionalOutletSurveyEntity outlet ->
                        render json(outlet)
                    }
                }
            }
        }
    }
}
