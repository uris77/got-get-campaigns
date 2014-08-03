package org.pasmo.gotitget.surveys

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import org.pasmo.gotitget.entities.PersistentEntity
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import ratpack.jackson.Jackson


class SurveyHandlers extends GroovyHandler {
    private final SurveyCrudService crudService

    @Inject
    SurveyHandlers(SurveyCrudService crudService) {
        this.crudService = crudService
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
            }
        }
    }
}
