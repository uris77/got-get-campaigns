package org.pasmo.surveys.outlets.traditional

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class TraditionalOutletSurveyModule extends AbstractModule  {

    @Override
    protected void configure() {
        bind(TraditionalOutletSurveyCrud.class).in(Scopes.SINGLETON)
    }

}
