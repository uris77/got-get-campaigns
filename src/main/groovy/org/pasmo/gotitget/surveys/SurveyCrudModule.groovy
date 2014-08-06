package org.pasmo.gotitget.surveys

import com.google.inject.AbstractModule
import org.pasmo.gotitget.MongoClientTrait

class SurveyCrudModule extends AbstractModule implements MongoClientTrait {

    @Override
    protected void configure(){
        bind(SurveyCrudService.class).toInstance(new SurveyCrudService(mongoClient, System.getProperty("USER_DB_NAME")))
    }

}
