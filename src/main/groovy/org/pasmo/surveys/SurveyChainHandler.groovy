package org.pasmo.surveys

import ratpack.groovy.handling.GroovyChainAction

class SurveyChainHandler extends GroovyChainAction {

    @Override
    protected void execute() throws Exception {
        handler(":id", registry.get(SurveyByIdHandler))
        handler(registry.get(SurveyHandlers))
    }
}
