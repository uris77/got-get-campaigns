package org.pasmo.surveys

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class SurveyCrudModule extends AbstractModule{

    @Override
    protected void configure(){
        bind(SurveyCrudService.class).in(Scopes.SINGLETON)
    }
}
