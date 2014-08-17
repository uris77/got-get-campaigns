package org.pasmo.repositories.entities

import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.element.ObjectIdElement
import com.mongodb.DBObject
import groovy.transform.ToString
import org.bson.types.ObjectId

/**
 * The user entity.
 */

@ToString(excludes="_id")
class UserEntity {

    ObjectId _id
    String username
    String email
    Boolean admin   = Boolean.FALSE
    Boolean enabled = Boolean.TRUE

    UserEntity(DBObject obj) {
        _id = obj.get('_id')
        username = obj.get("username")
        email = obj.get("email")
        admin = obj.get("admin") ?: this.admin
        enabled = obj.get("enabled") ?: this.enabled
        this
    }

    UserEntity(Document doc) {
        ObjectIdElement _objectId_ = doc.get("_id")
        def __id__ = _objectId_.getId().toHexString()
        _id = new ObjectId(__id__)
        username = doc.get("username").getValueAsString()
        email = doc.get("email").getValueAsString()
        admin = doc.get("admin") ?: this.admin
        enabled = doc.get("enabled") ?: this.enabled
        this
    }

    String getId() {
        this._id.toString()
    }

    Map toMap() {
        [
                id: id,
                username: username,
                email: email,
                admin: admin,
                enabled: enabled
        ]
    }
}
