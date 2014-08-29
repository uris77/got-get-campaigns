package org.pasmo.surveys.outlets.nontraditional

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
                get {
                    blocking {
                        surveyCrud.findById(pathTokens.outletSurveyId)
                    } then { NonTraditionalOutletSurveyEntity outlet ->
                        render json(outlet)
                    }
                }

                put {
                    blocking {
                        surveyCrud.update(parse(Map), pathTokens.outletSurveyId)
                    } then { NonTraditionalOutletSurveyEntity outletSurvey ->
                        render json(outletSurvey)
                    }
                }
            }
        }

        handler {
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
