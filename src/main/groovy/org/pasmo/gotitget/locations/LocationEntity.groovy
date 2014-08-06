package org.pasmo.gotitget.locations

import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectId
import com.allanbank.mongodb.bson.element.ObjectIdElement
import org.pasmo.gotitget.entities.PersistentEntity

class LocationEntity implements PersistentEntity {
    ObjectId _id
    String name
    String district
    String typeOfOutlet
    def loc

    LocationEntity() {
        this
    }

    LocationEntity(Document  doc) {
        ObjectIdElement objectId = doc.get("_id")
        _id = new ObjectId(objectId.getId().toHexString())
        name =  doc.get("name").getValueAsString()
        district = doc.get("district").getValueAsString()
        typeOfOutlet = doc.get("typeOfOutlet").getValueAsString()
        loc = doc.get("loc").getValueAsObject()
        this
    }

    String getId() {
        _id.toString()
    }

    Map toMap() {
        [
                id: id,
                name: name,
                district: district,
                typeOfOutlet: typeOfOutlet,
                loc: [lon: loc.getElements().first().valueAsString, lat: loc.getElements().last().valueAsString]

        ]
    }

    public void addError(String error) {
        errors << error
    }

    public boolean hasErrors(){
        errors.size() > 0
    }
}
