package org.pasmo.gotitget.repositories.entities

import com.mongodb.DBObject
import groovy.transform.ToString
import org.bson.types.ObjectId

/**
 * The user entity.
 */

@ToString
class UserEntity {

    ObjectId id
    String username
    String email
    Boolean admin   = Boolean.FALSE
    Boolean enabled = Boolean.TRUE

    UserEntity(DBObject obj) {
        id = obj.get('_id')
        username = obj.get("username")
        email = obj.get("email")
        admin = obj.get("admin") ?: this.admin
        enabled = obj.get("enabled") ?: this.enabled
        this
    }
}
