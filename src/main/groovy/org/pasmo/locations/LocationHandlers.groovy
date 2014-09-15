package org.pasmo.locations

import com.fasterxml.jackson.databind.node.ObjectNode
import org.pasmo.auth.CurrentUser
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
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            locationGateway.findAllByType(pathTokens.locationType.capitalize())
                        } then { List<LocationEntity> locations ->
                            render Jackson.json(locations.collect{ LocationEntity location -> location.toMap() })
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }
            }
        }

        handler("search") {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            if(request.queryParams.locationName.trim().size() > 0 ) {
                                locationGateway.findByName(request.queryParams.locationName)
                            } else {
                                locationCrudService.findAll()
                            }
                        } then { List<LocationEntity> locations ->
                            render Jackson.json(locations)
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }
            }
        }

        handler(":locationId") {
            byMethod {
                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            locationGateway.findSurveys(pathTokens.locationId)
                        } then { List<LocationSurvey> surveys ->
                            LocationEntity location = locationGateway.findById(pathTokens.locationId)
                            render Jackson.json([location: location, surveys: surveys])
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }
            }
        }

        handler {
            byMethod {
                post { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            ObjectNode node = parse Jackson.jsonNode()
                            locationCrudService.create(node.toString(), currentUser.username)
                        } then { LocationEntity location ->
                            render Jackson.json(location.toMap())
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }

                get { CurrentUser currentUser ->
                    if(currentUser.isLoggedIn()) {
                        blocking {
                            locationCrudService.findAll()
                        } then { List<LocationEntity> locations ->
                            render Jackson.json(locations.collect{ LocationEntity location -> location.toMap()})
                        }
                    } else {
                        response.status(401)
                        render Jackson.json([status: "Unauthorized"])
                    }
                }
            }
        }
    }
}
