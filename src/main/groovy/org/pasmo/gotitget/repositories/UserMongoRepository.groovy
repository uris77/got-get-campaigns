package org.pasmo.gotitget.repositories

import com.mongodb.BasicDBObject
import com.mongodb.DBObject
import com.mongodb.Mongo
import com.mongodb.util.JSON
import org.pasmo.gotitget.repositories.entities.UserEntity


class UserMongoRepository extends AbstractMongoRepository {

    UserMongoRepository(Mongo mongo, String databaseName) {
        super(mongo, databaseName)
    }

    @Override
    String getCollectionName() {
        "pasmo_users"
    }

    UserEntity create(String json) {
        new UserEntity(save(json))
    }

    BasicDBObject save(String json) {
        DBObject obj = JSON.parse(json) as BasicDBObject
        if (obj.get("admin") == null) obj.append("admin", Boolean.FALSE)
        if (obj.get("enabled") == null) obj.append("enabled", Boolean.TRUE)
        collection.insert(obj)
        obj
    }


}
