package org.pasmo.gotitget.repositories.entities

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
