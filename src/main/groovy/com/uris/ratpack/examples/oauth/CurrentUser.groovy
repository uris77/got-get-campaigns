package com.uris.ratpack.examples.oauth

import org.pac4j.core.profile.UserProfile
import ratpack.session.store.SessionStorage
import static ratpack.pac4j.internal.SessionConstants.USER_PROFILE


class CurrentUser {
    UserProfile userProfile

    public CurrentUser(SessionStorage sessionStorage){
        userProfile = sessionStorage.get(USER_PROFILE)
    }

    public String getUsername(){
        userProfile.getAttribute("name")
    }
}
