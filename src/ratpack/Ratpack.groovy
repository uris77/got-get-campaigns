import com.google.common.eventbus.AsyncEventBus
import org.pasmo.DatabaseClientModule
import org.pasmo.auth.AuthPathAuthorizer
import org.pasmo.auth.CurrentUser
import org.pac4j.oauth.client.Google2Client
import org.pasmo.locations.LocationCrudModule
import org.pasmo.locations.LocationHandlers
import org.pasmo.locations.messagebus.SurveyLocationSubscriber
import org.pasmo.locations.messagebus.module.LocationEventBusModule
import org.pasmo.persistence.MongoDBClientModule
import org.pasmo.repositories.UserRepository
import org.pasmo.repositories.entities.UserEntity
import org.pasmo.surveys.SurveyChainHandler
import org.pasmo.surveys.outlets.OutletSurveyCrud
import org.pasmo.surveys.outlets.OutletSurveyModule
import org.pasmo.surveys.outlets.OutletSurveysHandler
import org.pasmo.surveys.SurveyCrudModule
import org.pasmo.surveys.SurveyGatewayModule
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
        add new LocationEventBusModule()
        add new SurveyGatewayModule()
        add new SurveyCrudModule()
        add new LocationCrudModule()
        add new OutletSurveyModule()

        init {AsyncEventBus eventBus, OutletSurveyCrud outletSurveyCrud ->
            new SurveyLocationSubscriber(eventBus, outletSurveyCrud)
        }

    }

    handlers {
        handler{SessionStorage  sessionStorage ->
            CurrentUser currentUser = new CurrentUser()
            currentUser.setSessionStorage(sessionStorage)
            request.register(currentUser)
            next()
        }

        prefix("admin") {
            handler { CurrentUser currentUser ->
                if(currentUser.isLoggedIn()) {
                    next()
                } else {
                    redirect(401, "unauthorized")
                }
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

            get("app") { CurrentUser currentUser ->
                render groovyTemplate("app.html")
            }

            get("surveys") {
                render groovyTemplate("surveys.html")
            }
        }

        prefix("api") {
            handler { CurrentUser currentUser ->
                if(currentUser.isLoggedIn()) {
                    next()
                } else {
                    redirect(401, "unauthorized")
                }
            }

            get("my_details") { CurrentUser currentUser, UserRepository repository ->
                String email = currentUser.getEmail()
                blocking {
                    repository.findByEmail(email)
                } then {UserEntity user ->
                    render json(user.toMap())
                }
            }

            prefix("surveys") {
                handler chain(registry.get(SurveyChainHandler))
            }
            prefix("locations") {
                handler chain(registry.get(LocationHandlers))
            }
            prefix("outletSurveys") {
                handler chain(registry.get(OutletSurveysHandler))
            }
        }

        get("unauthorized") {
            render json([status: "Unauthorized"])
        }

        get { SessionStorage sessionStorage ->
            if(sessionStorage.get(USER_PROFILE)) {
                redirect("admin/app")
            } else {
                render groovyTemplate("index.html")
            }
        }

        assets "public"
        assets "public/app/templates"
    }
}
