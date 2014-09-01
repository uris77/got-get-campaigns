package org.pasmo.locations

import com.fasterxml.jackson.databind.node.ObjectNode
import ratpack.groovy.handling.GroovyChainAction
import ratpack.jackson.Jackson

import javax.inject.Inject

class LocationHandlers extends GroovyChainAction {
    private final LocationCrudService locationCrudService
    private final LocationGateway locationGateway

    @Inject
    LocationHandlers(LocationCrudService locationCrudService, LocationGateway locationGateway) {
        this.locationCrudService = locationCrudService
        this.locationGateway = locationGateway
    }

    @Override
    protected void execute() throws Exception {
        handler("byType/:locationType") {
            byMethod {
                get {
                    blocking {
                        locationGateway.findAllByType(pathTokens.locationType.capitalize())
                    } then { List<LocationEntity> locations ->
                        render Jackson.json(locations.collect{ LocationEntity location -> location.toMap() })
                    }
                }
            }
        }

        handler(":locationId") {
            byMethod {
                get {
                    blocking {
                        locationGateway.findSurveys(pathTokens.locationId)
                    } then { List<LocationSurvey> surveys ->
                        LocationEntity location = locationGateway.findById(pathTokens.locationId)
                        render Jackson.json([location: location, surveys: surveys])
                    }
                }
            }
        }

        handler {
            byMethod {
                post {
                    blocking {
                        ObjectNode node = parse Jackson.jsonNode()
                        locationCrudService.create(node.toString())
                    } then { LocationEntity location ->
                        render Jackson.json(location.toMap())
                    }
                }

                get {
                    blocking {
                        locationCrudService.findAll()
                    } then { List<LocationEntity> locations ->
                        render Jackson.json(locations.collect{ LocationEntity location -> location.toMap()})
                    }
                }
            }
        }
    }
}
