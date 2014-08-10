package org.pasmo.gotitget.locations

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler
import ratpack.jackson.Jackson

import javax.inject.Inject

class LocationByTypeHandler extends GroovyHandler {
    private final LocationGateway locationGateway

    @Inject
    LocationByTypeHandler(LocationGateway locationGateway) {
        this.locationGateway = locationGateway
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get {
                    List<LocationEntity> locations = locationGateway.findAllByType(pathTokens.locationType.capitalize())
                    render Jackson.json(locations.collect{ LocationEntity location -> location.toMap() })
                }
            }

        }
    }
}
