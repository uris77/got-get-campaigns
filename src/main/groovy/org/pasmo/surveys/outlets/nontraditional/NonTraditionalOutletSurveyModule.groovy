package org.pasmo.surveys.outlets.nontraditional

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class NonTraditionalOutletSurveyModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(NonTraditionalOutletSurveyCrud.class).in(Scopes.SINGLETON)
    }
}
