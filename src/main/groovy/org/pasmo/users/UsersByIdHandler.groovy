package org.pasmo.users

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import org.pasmo.repositories.UserRepository
import org.pasmo.repositories.entities.UserEntity
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode


class UsersByIdHandler extends GroovyHandler {

    private final UserRepository userRepository

    @Inject
    UsersByIdHandler(UserRepository userRepository) {
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

                put {
                    context.byContent {
                        type("application/json") {
                            blocking {
                                ObjectNode node = parse jsonNode()
                                def username = node.get("username").asText()
                                def email = node.get("email").asText()
                                def enabled = node.get("enabled").asBoolean() ? Boolean.TRUE : Boolean.FALSE
                                def admin = node.get("admin").asBoolean() ?  Boolean.TRUE : Boolean.FALSE
                                userRepository.update(pathTokens.id, [
                                        username: username,
                                        email: email,
                                        enabled: enabled,
                                        admin: admin
                                ])
                            } then { UserEntity user ->
                                render json(user.toMap())
                            }
                        }
                    }
                }

                delete {
                    println "Removing user with id: ${pathTokens.id}"
                    userRepository.remove(pathTokens.id)
                    render json(["message": "removed user"])
                }
            }
        }
    }

}
