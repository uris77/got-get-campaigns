package org.pasmo.gotitget.surveys

import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectIdElement
import org.bson.types.ObjectId
import org.pasmo.gotitget.entities.PersistentEntity

class SurveyEntity implements PersistentEntity {

    ObjectId _id
    String month
    Integer year
    private List<String> errors = []

    SurveyEntity() {
        this
    }

    SurveyEntity(Document doc) {
        ObjectIdElement objectId = doc.get("_id")
        _id = new ObjectId(objectId.getId().toHexString())
        month = doc.get("month")
        year = doc.get("year").getValueAsString().toInteger()
        this
    }

    String getId() {
        _id.toString()
    }

    Map toMap() {
        [
                id: _id.toString(),
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
