package org.pasmo.gotitget.repositories

import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.Mongo

abstract class AbstractMongoRepository {
    abstract String getCollectionName()

    DBCollection collection

    public AbstractMongoRepository(Mongo mongo, String databaseName) {
        DB db = mongo.getDB(databaseName)
        collection = db.getCollection(getCollectionName())
    }
}
