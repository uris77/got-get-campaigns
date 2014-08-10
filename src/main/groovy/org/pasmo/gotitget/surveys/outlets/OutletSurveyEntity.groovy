package org.pasmo.gotitget.surveys.outlets

import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectIdElement

class OutletSurveyEntity {

    String id
    Boolean condomsAvailable
    Boolean lubesAvailable
    String locationName

    OutletSurveyEntity(Document doc) {
        ObjectIdElement _id = doc.get("_id")
        id = _id.getId().toHexString()
        condomsAvailable = doc.get("condoms_available").asBoolean()
        lubesAvailable = doc.get("lubees_available").asBoolean()
    }
}
