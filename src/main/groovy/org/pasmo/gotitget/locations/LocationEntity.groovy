package org.pasmo.gotitget.locations

import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectId
import com.allanbank.mongodb.bson.element.ObjectIdElement
import org.pasmo.gotitget.entities.PersistentEntity

class LocationEntity implements PersistentEntity {
    String _id
    String name
    String district
    String locationType
    def loc

    LocationEntity() {
        this
    }

    LocationEntity(Document  doc) {
        ObjectIdElement objectId = doc.get("_id")
        _id = objectId.getId().toHexString()
        name =  doc.get("name").getValueAsString()
        district = doc.get("district").getValueAsString()
        locationType = doc.get("locationType").getValueAsString()
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
                locationType: locationType,
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
