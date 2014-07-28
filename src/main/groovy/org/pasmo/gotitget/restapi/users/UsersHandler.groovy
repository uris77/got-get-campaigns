package org.pasmo.gotitget.restapi.users

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import org.pasmo.gotitget.repositories.UserMongoRepository
import org.pasmo.gotitget.repositories.entities.UserEntity
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import static ratpack.jackson.Jackson.jsonNode
import static ratpack.jackson.Jackson.json

class UsersHandler extends GroovyHandler{
    private final UserMongoRepository userRepository

    @Inject
    UsersHandler(UserMongoRepository repository) {
        userRepository = repository
    }

    @Override
    protected void handle(GroovyContext context) {
        context.with {
            byMethod {
                post {
                    context.byContent {
                        type("application/json") {
                            blocking {
                                ObjectNode node = parse jsonNode()
                                userRepository.create node.toString()
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
