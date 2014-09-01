package org.pasmo.surveys.outlets.traditional

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
                get {
                    blocking {
                        surveyOutletCrud.findById(pathTokens.traditionalOutletSurveyId)
                    } then { TraditionalOutletSurveyEntity outlet ->
                        render json(outlet)
                    }
                }

                put {
                    blocking {
                        def params = parse Map
                        surveyOutletCrud.update(params, pathTokens.traditionalOutletSurveyId)
                    } then { TraditionalOutletSurveyEntity outlet ->
                        render json(outlet)
                    }
                }
            }
        }

        handler {
            byMethod {
                post {
                    blocking {
                        def params = parse Map
                        params.surveyId = pathTokens.surveyId
                        surveyOutletCrud.create(params)
                    }  then { TraditionalOutletSurveyEntity outletSurveyEntity ->
                        render json(outletSurveyEntity)
                    }
                }

                get {
                    blocking {
                        surveyOutletCrud.listAll(pathTokens.surveyId)
                    } then { List<TraditionalOutletSurveyEntity> surveys ->
                        render json(surveys)
                    }
                }
            }
        }
    }
}


//
//class TraditionalOutletSurveyHandler extends GroovyHandler {
//    private final TraditionalOutletSurveyCrud surveyOutletCrudService
//
//    @Inject
//    TraditionalOutletSurveyHandler(TraditionalOutletSurveyCrud surveyOutletCrudService) {
//        this.surveyOutletCrudService = surveyOutletCrudService
//    }
//
//    @Override
//    protected void handle(GroovyContext context) {
//        context.with {
//            byMethod {
//                post {
//                    blocking {
//                        def params = parse Map
//                        params.surveyId = pathTokens.surveyId
//                        surveyOutletCrudService.create(params)
//                    }  then { TraditionalOutletSurveyEntity outletSurveyEntity ->
//                        render json(outletSurveyEntity)
//                    }
//                }
//
//                get {
//                    blocking {
//                        surveyOutletCrudService.listAll(pathTokens.surveyId)
//                    } then { List<TraditionalOutletSurveyEntity> surveys ->
//                        render json(surveys)
//                    }
//                }
//            }
//        }
//    }
//}
