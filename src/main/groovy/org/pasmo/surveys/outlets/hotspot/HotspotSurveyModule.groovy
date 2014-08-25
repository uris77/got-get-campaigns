package org.pasmo.surveys.outlets.hotspot

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class HotspotSurveyModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(HotspotSurveyCrud).in(Scopes.SINGLETON)
    }
}
