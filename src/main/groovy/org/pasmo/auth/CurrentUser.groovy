package org.pasmo.auth

import org.pac4j.core.profile.UserProfile
import ratpack.session.store.SessionStorage
import static ratpack.pac4j.internal.SessionConstants.USER_PROFILE


class CurrentUser {
    private SessionStorage _sessionStorage

    public CurrentUser setSessionStorage(SessionStorage sessionStorage) {
        this._sessionStorage = sessionStorage
        this
    }

    public SessionStorage getSessionStorage() {
        _sessionStorage
    }

    public Boolean isLoggedIn() {
        if(userProfile) {
            return Boolean.TRUE
        }
        Boolean.FALSE
    }

    private  UserProfile getUserProfile() {
        getSessionStorage().get(USER_PROFILE)
    }

    public String getUsername(){
        getUserProfile().getAttribute("name")
    }

    public String getEmail() {
        getUserProfile().getAttribute("email")
    }
}
