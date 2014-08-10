import org.pasmo.gotitget.DatabaseClient
import org.pasmo.gotitget.DatabaseClientModule
import org.pasmo.gotitget.auth.AuthPathAuthorizer
import org.pasmo.gotitget.auth.CurrentUser
import org.pac4j.oauth.client.Google2Client
import org.pasmo.gotitget.locations.LocationByTypeHandler
import org.pasmo.gotitget.locations.LocationCrudModule
import org.pasmo.gotitget.locations.LocationHandlers
import org.pasmo.gotitget.repositories.UserRepository
import org.pasmo.gotitget.repositories.UserRepositoryModule
import org.pasmo.gotitget.repositories.entities.UserEntity
import org.pasmo.gotitget.restapi.users.UsersByIdHandler
import org.pasmo.gotitget.restapi.users.UsersHandler
import org.pasmo.gotitget.surveys.SurveyByIdHandler
import org.pasmo.gotitget.surveys.SurveyCrudModule
import org.pasmo.gotitget.surveys.SurveyGatewayModule
import org.pasmo.gotitget.surveys.SurveyHandlers
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

ratpack {
    bindings {
        add new SessionModule()
        add new MapSessionsModule(10, 5)
        add new JacksonModule()
        bind Pac4jCallbackHandler
        Google2Client google2Client = new Google2Client(System.getProperty("GOOGLE_ID"), System.getProperty("GOOGLE_SECRET"))
        add new Pac4jModule<>(google2Client, new AuthPathAuthorizer())

        add new DatabaseClientModule()
        add new SurveyGatewayModule(new DatabaseClient())
        add new UserRepositoryModule()
        add new SurveyCrudModule()
        add new LocationCrudModule()
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
                next()
            }

            get("secured") {CurrentUser currentUser ->
                render groovyTemplate([userName: currentUser.getUsername()], "secured.html")
            }

            get("logout"){
                SessionStorage sessionStorage = request.get(SessionStorage)
                sessionStorage.remove(sessionStorage.get(USER_PROFILE))
                redirect("/")
            }

            post("setup") { UserRepository repository ->
                //TODO: try async interface
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
                request.register(currentUser)
                next()
            }

            get("my_details") { CurrentUser currentUser, UserRepository repository ->
                String email = currentUser.getEmail()
                blocking {
                    repository.findByEmail(email)
                } then {UserEntity user ->
                    render json(user.toMap())
                }
            }

            handler("users", registry.get(UsersHandler))
            handler("users/:id", registry.get(UsersByIdHandler))
            handler("surveys", registry.get(SurveyHandlers))
            handler("surveys/:id", registry.get(SurveyByIdHandler))
            handler("locations", registry.get(LocationHandlers))
            handler("locations/byType/:locationType", registry.get(LocationByTypeHandler))
        }

        get("app") {
            render groovyTemplate("app.html")
        }

        get("surveys") {
            render groovyTemplate("surveys.html")
        }

        assets "public"
        assets "public/app/templates"
    }
}
