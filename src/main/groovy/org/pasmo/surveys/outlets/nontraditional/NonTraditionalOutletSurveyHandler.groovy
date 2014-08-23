package org.pasmo.surveys.outlets.nontraditional

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import static ratpack.jackson.Jackson.json

import javax.inject.Inject

class NonTraditionalOutletSurveyHandler extends GroovyHandler {
    private final NonTraditionalOutletSurveyCrud surveyCrud

    @Inject
    NonTraditionalOutletSurveyHandler(NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud) {
        surveyCrud = nonTraditionalOutletSurveyCrud
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    blocking {
                        def params = parse Map
                        params.surveyId =  pathTokens.surveyId
                        surveyCrud.create(params)
                    } then { NonTraditionalOutletSurveyEntity survey ->
                        render json(survey)
                    }
                }

                get {
                    blocking {
                        surveyCrud.listAll(pathTokens.surveyId)
                    } then { List<NonTraditionalOutletSurveyEntity> surveys ->
                        render json(surveys)
                    }
                }
            }
        }
    }
}
