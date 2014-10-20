package org.pasmo.surveys.outlets

import com.google.inject.AbstractModule
import com.google.inject.Scopes
import org.pasmo.locations.messagebus.SurveyLocationSubscriber

class OutletSurveyModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(OutletSurveyCrud.class).to(OutletSurveyMongoCrud.class).in(Scopes.SINGLETON)
        bind(OutletSurveys.class).to(OutletSurveysMongoImpl.class).in(Scopes.SINGLETON)
        bind(SurveyLocationSubscriber.class).in(Scopes.SINGLETON)

    }
}
