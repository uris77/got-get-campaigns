package org.pasmo.surveys.outlets.hotspot

import org.pasmo.auth.CurrentUser
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class HotspotSurveyHandler extends GroovyChainAction {
    private final HotspotSurveyCrud hotspotSurveyCrud

    @Inject
    HotspotSurveyHandler(HotspotSurveyCrud hotspotSurveyCrud) {
        this.hotspotSurveyCrud = hotspotSurveyCrud
    }

    @Override
    protected void execute() throws Exception {

        handler(":hotspotSurveyId") {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        HotspotEntity hotspot = hotspotSurveyCrud.findById(pathTokens.hotspotSurveyId)
                        render json(hotspot)
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }

                put { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            hotspotSurveyCrud.update(parse(Map), pathTokens.hotspotSurveyId, currentUser.username)
                        } then { HotspotEntity hotspot ->
                            render json(hotspot)
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
                            hotspotSurveyCrud.create(params, currentUser.username)
                        } then { HotspotEntity hotspot ->
                            render json(hotspot)
                        }
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }

                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            hotspotSurveyCrud.listAll(pathTokens.surveyId)
                        } then { List<HotspotEntity> hotspots ->
                            render json(hotspots)
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