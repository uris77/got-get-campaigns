package org.pasmo.gotitget.surveys

import com.google.inject.Inject
import org.pasmo.gotitget.locations.LocationGateway
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import static ratpack.jackson.Jackson.json

class SurveyByIdHandler extends GroovyHandler {
    private final SurveyCrudService surveyCrudService
    private final LocationGateway locationGateway
    private final List<String> LOCATION_TYPES = ["Traditional", "Non-Traditional", "Hotspot"]

    @Inject
    SurveyByIdHandler(SurveyCrudService surveyCrudService, LocationGateway locationGateway) {
        this.surveyCrudService = surveyCrudService
        this.locationGateway = locationGateway
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get {
                    SurveyEntity survey = surveyCrudService.findById(pathTokens.id)
                    def locations = []
                    LOCATION_TYPES.each { String locationType ->
                        locations << [name: locationType, totalLocations: locationGateway.countByType(locationType), surveyed: 0]
                    }
                    render json([survey: survey.toMap(), locations: locations])
                }
            }
        }
    }
}
