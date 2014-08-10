package org.pasmo.gotitget.locations

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import ratpack.jackson.Jackson

class LocationHandlers extends GroovyHandler {
    private final LocationCrudService locationCrudService

    @Inject
    LocationHandlers(LocationCrudService locationCrudService) {
        this.locationCrudService = locationCrudService
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    context.byContent {
                        type("application/json") {
                            ObjectNode node = parse Jackson.jsonNode()
                            LocationEntity location = locationCrudService.create(node.toString())
                            render Jackson.json(location.toMap())
                        }
                    }
                }

                get {
                    context.byContent {
                        type("application/json") {
                            List<LocationEntity> locations = locationCrudService.findAll()
                            render Jackson.json(locations.collect{ LocationEntity location -> location.toMap()})
                        }
                    }
                }
            }
        }
    }
}
