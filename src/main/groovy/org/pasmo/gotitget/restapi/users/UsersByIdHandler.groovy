package org.pasmo.gotitget.restapi.users

import com.google.inject.Inject
import org.pasmo.gotitget.repositories.UserMongoRepository
import org.pasmo.gotitget.repositories.entities.UserEntity
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import static ratpack.jackson.Jackson.json


class UsersByIdHandler extends GroovyHandler {

    private final UserMongoRepository userRepository

    @Inject
    UsersByIdHandler(UserMongoRepository userRepository) {
        this.userRepository = userRepository
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                get {
                    context.byContent {
                        type("application/json") {
                            blocking {
                                userRepository.findById(pathTokens.id)
                            } then { UserEntity user ->
                                render json(user.toMap())
                            }
                        }
                    }
                }
            }
        }
    }

}
