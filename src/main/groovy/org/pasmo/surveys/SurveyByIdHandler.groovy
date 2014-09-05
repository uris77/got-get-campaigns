package org.pasmo.surveys

import com.google.inject.Inject
import org.pasmo.auth.CurrentUser
import org.pasmo.locations.LocationGateway
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import static ratpack.jackson.Jackson.json

class SurveyByIdHandler extends GroovyHandler {
    private final SurveyCrudService surveyCrudService
    private final LocationGateway locationGateway
    private final SurveyGateway surveyGateway
    private final List<String> LOCATION_TYPES = ["Traditional", "Non-Traditional", "Hotspot"]

    @Inject
    SurveyByIdHandler(SurveyCrudService surveyCrudService, LocationGateway locationGateway, SurveyGateway surveyGateway) {
        this.surveyCrudService = surveyCrudService
        this.locationGateway = locationGateway
        this.surveyGateway = surveyGateway
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        SurveyEntity survey = surveyGateway.findById(pathTokens.id)
                        def locations = []
                        LOCATION_TYPES.each { String locationType ->
                            def surveyed = surveyGateway.countBySurveyAndLocationType(survey, locationType)
                            locations << [name: locationType, totalLocations: locationGateway.countByType(locationType), surveyed: surveyed]
                        }
                        render json([survey: survey.toMap(), locations: locations])
                    } else {
                        response.status(401)
                        render json([status: "Unauthorized"])
                    }
                }
            }
        }
    }
}
