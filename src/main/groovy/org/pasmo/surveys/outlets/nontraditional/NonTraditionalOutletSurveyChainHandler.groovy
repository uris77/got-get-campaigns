package org.pasmo.surveys.outlets.nontraditional

import org.pasmo.auth.CurrentUser
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class NonTraditionalOutletSurveyChainHandler extends GroovyChainAction{
    private final NonTraditionalOutletSurveyCrud surveyCrud

    @Inject
    NonTraditionalOutletSurveyChainHandler(NonTraditionalOutletSurveyCrud surveyCrud) {
        this.surveyCrud = surveyCrud
    }

    @Override
    protected void execute() throws Exception {

        handler(":outletSurveyId") {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyCrud.findById(pathTokens.outletSurveyId)
                        } then { NonTraditionalOutletSurveyEntity outlet ->
                            render json(outlet)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }

                put { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyCrud.update(parse(Map), pathTokens.outletSurveyId, currentUser.username)
                        } then { NonTraditionalOutletSurveyEntity outletSurvey ->
                            render json(outletSurvey)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }
            }
        }

        handler {
            byMethod {
                post { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            def params = parse Map
                            params.surveyId =  pathTokens.surveyId
                            surveyCrud.create(params, currentUser.username)
                        } then { NonTraditionalOutletSurveyEntity survey ->
                            render json(survey)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }

                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyCrud.listAll(pathTokens.surveyId)
                        } then { List<NonTraditionalOutletSurveyEntity> surveys ->
                            render json(surveys)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }
            }
        }
    }
}
