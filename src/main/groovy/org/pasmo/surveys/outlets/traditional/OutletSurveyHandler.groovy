package org.pasmo.surveys.outlets.traditional

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class OutletSurveyHandler extends GroovyHandler {
    private final SurveyOutletCrudService surveyOutletCrudService

    @Inject
    OutletSurveyHandler(SurveyOutletCrudService surveyOutletCrudService) {
        this.surveyOutletCrudService = surveyOutletCrudService
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    blocking {
                        def params = parse Map
                        surveyOutletCrudService.create(params)
                    }  then { OutletSurveyEntity outletSurveyEntity ->
                        render json(outletSurveyEntity)
                    }
                }
            }
        }
    }
}
