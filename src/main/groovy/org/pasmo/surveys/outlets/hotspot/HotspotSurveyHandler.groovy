package org.pasmo.surveys.outlets.hotspot

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import static ratpack.jackson.Jackson.json

class HotspotSurveyHandler extends GroovyHandler {
    private final HotspotSurveyCrud hotspotSurveyCrud

    HotspotSurveyHandler(HotspotSurveyCrud hotspotSurveyCrud) {
        this.hotspotSurveyCrud = hotspotSurveyCrud
    }

    @Override
    protected void handle(GroovyContext context) {
        context.byMethod {
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
