package org.pasmo.surveys.outlets.hotspot

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
                get {
                    HotspotEntity hotspot = hotspotSurveyCrud.findById(pathTokens.hotspotSurveyId)
                    render json(hotspot)
                }

                put {
                    blocking {
                        hotspotSurveyCrud.update(parse(Map), pathTokens.hotspotSurveyId)
                    } then { HotspotEntity hotspot ->
                        render json(hotspot)
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
                        hotspotSurveyCrud.create(params)
                    } then { HotspotEntity hotspot ->
                        render json(hotspot)
                    }
                }

                get {
                    blocking {
                        hotspotSurveyCrud.listAll(pathTokens.surveyId)
                    } then { List<HotspotEntity> hotspots ->
                        render json(hotspots)
                    }
                }
            }
        }
    }
}