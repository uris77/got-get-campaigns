import com.fasterxml.jackson.databind.node.ObjectNode
import org.pasmo.gotitget.auth.AuthPathAuthorizer
import org.pasmo.gotitget.auth.CurrentUser
import org.pac4j.oauth.client.Google2Client
import org.pasmo.gotitget.repositories.UserMongoRepository
import org.pasmo.gotitget.repositories.UserRepositoryModule
import org.pasmo.gotitget.repositories.entities.UserEntity
import org.pasmo.gotitget.restapi.users.UsersHandler
import ratpack.jackson.JacksonModule
import ratpack.pac4j.Pac4jModule
import ratpack.pac4j.internal.Pac4jCallbackHandler
import ratpack.session.SessionModule
import ratpack.session.store.MapSessionsModule
import ratpack.session.store.SessionStorage

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.pac4j.internal.SessionConstants.USER_PROFILE

import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode

ratpack {
    bindings {
        add new SessionModule()
        add new MapSessionsModule(10, 5)
        add new JacksonModule()
        bind Pac4jCallbackHandler
        Google2Client google2Client = new Google2Client(System.getProperty("GOOGLE_ID"), System.getProperty("GOOGLE_SECRET"))
        add new Pac4jModule<>(google2Client, new AuthPathAuthorizer())

        add new UserRepositoryModule()
    }

    handlers {
        get {
            render groovyTemplate("index.html")
        }
        prefix("admin") {
            handler{SessionStorage  sessionStorage ->
                CurrentUser currentUser = new CurrentUser()
                currentUser.setSessionStorage(sessionStorage)
                request.register(currentUser)
                println "currentUser: ${currentUser.getUsername()}"
                next()
            }

            get("secured") {CurrentUser currentUser ->
                println "user in secured: ${currentUser}"
                render groovyTemplate([userName: currentUser.getUsername()], "secured.html")
            }

            get("logout"){
                SessionStorage sessionStorage = request.get(SessionStorage)
                sessionStorage.remove(sessionStorage.get(USER_PROFILE))
                redirect("/")
            }

            post("setup") { UserMongoRepository repository ->
                blocking {
                    String setupUser = System.getProperty("USER_SETUP_NAME")
                    String setupEmail = System.getProperty("USER_SETUP_EMAIL")
                    repository.create("{'username': '${setupUser}', 'email': '${setupEmail}', 'admin': true}")
                } then {UserEntity user ->
                    render json(user.toMap())
                }

            }

        }

        prefix("api") {
            handler {SessionStorage  sessionStorage ->
                CurrentUser currentUser = new CurrentUser()
                currentUser.setSessionStorage(sessionStorage)
                next()
            }

            get("my_details") { UserMongoRepository repository ->
                String email = context.get(CurrentUser).getEmail()
                blocking {
                    repository.findByEmail(email)
                } then {UserEntity user ->
                    render json(user.toMap())
                }
            }

//            post("users") { UserMongoRepository repository ->
//                context.byContent {
//                    type("application/json") {
//                        ObjectNode node =  parse jsonNode()
//                        repository.create(node.toString())
//                        render json([:])
//                    }
//                }
//            }
            handler("users", registry.get(UsersHandler))
        }

        assets "public"
    }
}
