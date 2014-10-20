package org.pasmo.surveys.outlets

import org.pasmo.auth.CurrentUser

import static ratpack.jackson.Jackson.json

import ratpack.groovy.handling.GroovyChainAction
import javax.inject.Inject

class OutletSurveysHandler extends GroovyChainAction {
    private final OutletSurveys outletSurveys
    private final OutletSurveyMongoCrud outletSurveyCrud

    @Inject
    OutletSurveysHandler(OutletSurveys outletSurveys, OutletSurveyMongoCrud outletSurveyCrud) {
        this.outletSurveys = outletSurveys
        this.outletSurveyCrud = outletSurveyCrud
    }

    @Override
    protected void execute() throws Exception {
        handler(":surveyId/:outletType") {
            byMethod {
                get {
                    blocking {
                        outletSurveys.listAll(pathTokens.outletType, pathTokens.surveyId)
                    } then { List<OutletSurvey> surveys ->
                        render json(surveys)
                    }
                }
            }
        }

        handler(":surveyId") {
            byMethod {
                post { CurrentUser currentUser ->
                    Map params = parse Map
                    params.surveyId = pathTokens.surveyId
                    blocking {
                        outletSurveyCrud.create(params, currentUser.username)
                    } then { OutletSurvey outletSurvey ->
                        render json(outletSurvey)
                    }
                }

                put { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            outletSurveyCrud.update(parse(Map), pathTokens.surveyId, currentUser.username)
                        } then { OutletSurvey outletSurvey ->
                            render json(outletSurvey)
                        }
                    }
                }

                get {
                    blocking {
                        outletSurveys.findById(pathTokens.surveyId)
                    } then { OutletSurvey outletSurvey ->
                        render json(outletSurvey)
                    }
                }
            }
        }
    }
}
