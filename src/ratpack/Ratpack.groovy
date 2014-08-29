import org.pasmo.DatabaseClientModule
import org.pasmo.auth.AuthPathAuthorizer
import org.pasmo.auth.CurrentUser
import org.pac4j.oauth.client.Google2Client
import org.pasmo.locations.LocationByTypeHandler
import org.pasmo.locations.LocationCrudModule
import org.pasmo.locations.LocationHandlers
import org.pasmo.persistence.MongoDBClientModule
import org.pasmo.repositories.UserRepository
import org.pasmo.repositories.UserRepositoryModule
import org.pasmo.repositories.entities.UserEntity
import org.pasmo.surveys.SurveyChainHandler
import org.pasmo.surveys.outlets.hotspot.HotspotSurveyModule
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyCrud
import org.pasmo.surveys.outlets.nontraditional.NonTraditionalOutletSurveyModule
import org.pasmo.users.UsersByIdHandler
import org.pasmo.users.UsersHandler
import org.pasmo.surveys.SurveyCrudModule
import org.pasmo.surveys.SurveyGatewayModule
import org.pasmo.surveys.outlets.traditional.TraditionalOutletSurveyModule
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
        add new MongoDBClientModule()
        bind Pac4jCallbackHandler
        Google2Client google2Client = new Google2Client(System.getProperty("GOOGLE_ID"), System.getProperty("GOOGLE_SECRET"))
        add new Pac4jModule<>(google2Client, new AuthPathAuthorizer())

        add new DatabaseClientModule()
        add new SurveyGatewayModule()
        add new UserRepositoryModule()
        add new SurveyCrudModule()
        add new LocationCrudModule()
        add new TraditionalOutletSurveyModule()
        add new NonTraditionalOutletSurveyModule()
        add new HotspotSurveyModule()
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

            get("app") {
                render groovyTemplate("app.html")
            }

            get("surveys") {
                render groovyTemplate("surveys.html")
            }
        }

        prefix("api") { NonTraditionalOutletSurveyCrud nonTraditionalOutletSurveyCrud ->
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
            prefix("surveys") {
                handler chain(new SurveyChainHandler(nonTraditionalOutletSurveyCrud))
            }
            handler("locations", registry.get(LocationHandlers))
            handler("locations/byType/:locationType", registry.get(LocationByTypeHandler))

        }

        assets "public"
        assets "public/app/templates"
    }
}
