import com.uris.ratpack.examples.oauth.AuthPathAuthorizer
import org.pac4j.core.profile.UserProfile
import org.pac4j.oauth.client.Google2Client
import org.pasmo.gotitget.repositories.UserMongoRepository
import org.pasmo.gotitget.repositories.UserRepositoryModule
import ratpack.pac4j.Pac4jModule
import ratpack.pac4j.internal.Pac4jCallbackHandler
import ratpack.session.SessionModule
import ratpack.session.store.MapSessionsModule
import ratpack.session.store.SessionStorage

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.pac4j.internal.SessionConstants.USER_PROFILE


ratpack {
    bindings {
        add new SessionModule()
        add new MapSessionsModule(10, 5)
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
            get("secured"){
                SessionStorage sessionStorage = request.get(SessionStorage)
                UserProfile profile = sessionStorage.get(USER_PROFILE)
                render groovyTemplate([userName: profile.getAttribute('name')], "secured.html")
            }
            get("logout"){
                //request.get(SessionStorage).clear()
                SessionStorage sessionStorage = request.get(SessionStorage)
                sessionStorage.remove(sessionStorage.get(USER_PROFILE))
                redirect("/")
            }

            post("setup") { UserMongoRepository repository ->
                repository.save("{'name': 'roberto'}")
                render "OK"
            }
        }


        assets "public"
    }
}
