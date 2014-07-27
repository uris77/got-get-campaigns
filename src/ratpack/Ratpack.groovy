import org.pasmo.gotitget.auth.AuthPathAuthorizer
import org.pasmo.gotitget.auth.CurrentUser
import org.pac4j.oauth.client.Google2Client
import org.pasmo.gotitget.repositories.UserMongoRepository
import org.pasmo.gotitget.repositories.UserRepositoryModule
import org.pasmo.gotitget.repositories.entities.UserEntity
import ratpack.jackson.JacksonModule
import ratpack.pac4j.Pac4jModule
import ratpack.pac4j.internal.Pac4jCallbackHandler
import ratpack.registry.Registries
import ratpack.session.SessionModule
import ratpack.session.store.MapSessionsModule
import ratpack.session.store.SessionStorage

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.pac4j.internal.SessionConstants.USER_PROFILE

import static ratpack.jackson.Jackson.json

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
            register(Registries.just(new CurrentUser())) {
                handler {
                    SessionStorage sessionStorage = request.get(SessionStorage)
                    CurrentUser currentUser = context.get(CurrentUser.class).setSessionStorage(sessionStorage)
                    context.next(Registries.just(currentUser))
                }
                get("secured"){
                    CurrentUser currentUser = context.get(CurrentUser)
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
        }

        prefix("api") {
            register(Registries.just(new CurrentUser())) {
                handler {
                    SessionStorage sessionStorage = request.get(SessionStorage)
                    CurrentUser currentUser = context.get(CurrentUser.class).setSessionStorage(sessionStorage)
                    context.next(Registries.just(currentUser))
                }
                get("my_details") { UserMongoRepository repository ->
                    String email = context.get(CurrentUser).getEmail()
                    blocking {
                        repository.findByEmail(email)
                    } then {UserEntity user ->
                        render json(user.toMap())
                    }
                }
            }

        }


        assets "public"
    }
}
