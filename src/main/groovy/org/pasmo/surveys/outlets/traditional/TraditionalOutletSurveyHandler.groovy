package org.pasmo.surveys.outlets.traditional

import org.pasmo.auth.CurrentUser
import ratpack.groovy.handling.GroovyChainAction
import javax.inject.Inject
import static ratpack.jackson.Jackson.json

class TraditionalOutletSurveyHandler extends GroovyChainAction {
    private final TraditionalOutletSurveyCrud surveyOutletCrud

    @Inject
    TraditionalOutletSurveyHandler(TraditionalOutletSurveyCrud surveyOutletCrud) {
        this.surveyOutletCrud = surveyOutletCrud
    }

    @Override
    protected void execute() throws Exception {
        handler(":traditionalOutletSurveyId") {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyOutletCrud.findById(pathTokens.traditionalOutletSurveyId)
                        } then { TraditionalOutletSurveyEntity outlet ->
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
                            def params = parse Map
                            surveyOutletCrud.update(params, pathTokens.traditionalOutletSurveyId)
                        } then { TraditionalOutletSurveyEntity outlet ->
                            render json(outlet)
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
                            params.surveyId = pathTokens.surveyId
                            surveyOutletCrud.create(params)
                        }  then { TraditionalOutletSurveyEntity outletSurveyEntity ->
                            render json(outletSurveyEntity)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }

                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            surveyOutletCrud.listAll(pathTokens.surveyId)
                        } then { List<TraditionalOutletSurveyEntity> surveys ->
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
