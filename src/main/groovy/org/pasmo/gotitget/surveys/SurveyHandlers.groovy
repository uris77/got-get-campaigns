package org.pasmo.gotitget.surveys

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import ratpack.jackson.Jackson


class SurveyHandlers extends GroovyHandler {
    private final SurveyCrudService crudService
    private final SurveyGateway surveyGateway

    @Inject
    SurveyHandlers(SurveyCrudService crudService, SurveyGateway surveyGateway) {
        this.crudService = crudService
        this.surveyGateway = surveyGateway
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    context.byContent {
                        type("application/json") {
                            blocking {
                                ObjectNode node = parse Jackson.jsonNode()
                                crudService.create(node.toString())
                            } then { SurveyEntity survey ->
                                if(survey.hasErrors()) {
                                    response.status(500)
                                    render Jackson.json(survey.errors)
                                } else {
                                    render Jackson.json(survey.toMap())
                                }
                            }
                        }
                    }
                }

                get {
                    context.byContent {
                        type("application/json") {
                            List<SurveyEntity>  surveys = surveyGateway.list()
                            render Jackson.json(surveys.collect{ SurveyEntity survey -> survey.toMap()})
                        }
                    }
                }
            }
        }
    }
}
