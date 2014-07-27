package org.pasmo.gotitget.auth

import ratpack.handling.Context
import ratpack.pac4j.AbstractAuthorizer

class AuthPathAuthorizer extends AbstractAuthorizer{
    boolean isAuthenticationRequired(Context context) {
        return context.request.path.startsWith("admin")
    }
}

