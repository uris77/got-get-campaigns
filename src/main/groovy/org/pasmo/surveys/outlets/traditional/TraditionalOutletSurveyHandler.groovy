package org.pasmo.surveys.outlets.traditional

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class TraditionalOutletSurveyHandler extends GroovyHandler {
    private final TraditionalOutletSurveyCrud surveyOutletCrudService

    @Inject
    TraditionalOutletSurveyHandler(TraditionalOutletSurveyCrud surveyOutletCrudService) {
        this.surveyOutletCrudService = surveyOutletCrudService
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    blocking {
                        def params = parse Map
                        params.surveyId = pathTokens.surveyId
                        surveyOutletCrudService.create(params)
                    }  then { TraditionalOutletSurveyEntity outletSurveyEntity ->
                        render json(outletSurveyEntity)
                    }
                }

                get {
                    blocking {
                        surveyOutletCrudService.listAll(pathTokens.surveyId)
                    } then { List<TraditionalOutletSurveyEntity> surveys ->
                        render json(surveys)
                    }
                }
            }
        }
    }
}
