package org.pasmo.gotitget.repositories

import com.mongodb.BasicDBObject
import com.mongodb.DBObject
import com.mongodb.Mongo
import com.mongodb.util.JSON


class UserMongoRepository extends AbstractMongoRepository {

    UserMongoRepository(Mongo mongo, String databaseName) {
        super(mongo, databaseName)
    }

    @Override
    String getCollectionName() {
        "pasmo_users"
    }

    BasicDBObject save(String json) {
        DBObject obj = JSON.parse(json) as BasicDBObject
        collection.insert(obj)
        obj
    }
}
