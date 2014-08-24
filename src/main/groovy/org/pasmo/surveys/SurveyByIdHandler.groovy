package org.pasmo.surveys

import com.google.inject.Inject
import org.pasmo.locations.LocationGateway
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyCrud
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import static ratpack.jackson.Jackson.json

class SurveyByIdHandler extends GroovyHandler {
    private final SurveyCrudService surveyCrudService
    private final LocationGateway locationGateway
    private final SurveyGateway surveyGateway
    private final NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud
    private final List<String> LOCATION_TYPES = ["Traditional", "Non-Traditional", "Hotspot"]

    @Inject
    SurveyByIdHandler(SurveyCrudService surveyCrudService, LocationGateway locationGateway, SurveyGateway surveyGateway, NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud) {
        this.surveyCrudService = surveyCrudService
        this.locationGateway = locationGateway
        this.surveyGateway = surveyGateway
        this.nonTraditionalOutletSurveyCrud = nonTraditionalOutletSurveyCrud
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get {
                    SurveyEntity survey = surveyGateway.findById(pathTokens.id)
                    def locations = []
                    LOCATION_TYPES.each { String locationType ->
                        def surveyed = 0
                        switch(locationType) {
                            case "Non-Traditional":
                                surveyed = nonTraditionalOutletSurveyCrud.countBySurvey(survey)
                                break
                            case "Traditional":
                                break
                        }
                        locations << [name: locationType, totalLocations: locationGateway.countByType(locationType), surveyed: surveyed]
                    }
                    render json([survey: survey.toMap(), locations: locations])
                }
            }
        }
    }
}
