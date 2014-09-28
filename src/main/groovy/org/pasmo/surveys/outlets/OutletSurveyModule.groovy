package org.pasmo.surveys.outlets

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class OutletSurveyModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(OutletSurveyCrud.class).in(Scopes.SINGLETON)
        bind(OutletSurveys.class).to(OutletSurveysMongoImpl.class).in(Scopes.SINGLETON)
    }
}
