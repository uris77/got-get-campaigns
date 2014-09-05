package org.pasmo.surveys

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import org.pasmo.auth.CurrentUser
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
                post { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
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
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }

                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyGateway.list()
                        } then { List<SurveyEntity> surveys ->
                            render Jackson.json(surveys.collect{ SurveyEntity survey -> survey.toMap() })
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }
            }
        }
    }
}
