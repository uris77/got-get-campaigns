package org.pasmo.locations

import com.mongodb.DBObject
import org.pasmo.entities.PersistentEntity

class LocationEntity implements PersistentEntity {
    String _id
    String name
    String district
    String locationType
    def loc

    String getId() {
        _id
    }

    Map toMap() {
        [
                id: id,
                name: name,
                district: district,
                locationType: locationType,
                loc: loc

        ]
    }

    static LocationEntity create(DBObject doc) {
        new LocationEntity(
                _id: doc.get("_id").toString(),
                name: doc.get("name"),
                district: doc.get("district"),
                locationType: doc.get("locationType"),
                loc: doc.get("loc")
        )
    }

    public void addError(String error) {
        errors << error
    }

    public boolean hasErrors(){
        errors.size() > 0
    }
}
