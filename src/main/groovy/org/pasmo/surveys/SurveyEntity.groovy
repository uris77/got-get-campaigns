package org.pasmo.surveys

import org.pasmo.entities.PersistentEntity

class SurveyEntity implements PersistentEntity {

    String id
    String month
    Integer year
    private List<String> errors = []

    SurveyEntity() {
        this
    }

    Map toMap() {
        [
                id: id,
                month: month,
                year: year
        ]
    }

    public void addError(String error) {
        errors << error
    }

    public boolean hasErrors(){
        errors.size() > 0
    }
}
