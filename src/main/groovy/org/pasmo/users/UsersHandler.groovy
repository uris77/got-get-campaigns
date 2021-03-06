package org.pasmo.users

import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.inject.Inject
import org.pasmo.repositories.UserRepository
import org.pasmo.repositories.entities.UserEntity
import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

import static ratpack.jackson.Jackson.jsonNode
import static ratpack.jackson.Jackson.json

class UsersHandler extends GroovyHandler{
    private final UserRepository userRepository

    @Inject
    UsersHandler(UserRepository repository) {
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

                get {
                    context.byContent {
                        type("application/json") {
                            blocking {
                                userRepository.findAll()
                            } then { List<UserEntity> users ->
                                render json(users.collect {UserEntity user -> user.toMap() })
                            }
                        }
                    }
                }
            }


        }
    }
}
