package org.pasmo.surveys

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class SurveyGatewayModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(SurveyGateway).in(Scopes.SINGLETON)
    }

}
