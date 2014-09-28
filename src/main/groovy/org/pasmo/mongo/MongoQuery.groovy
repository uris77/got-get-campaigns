package org.pasmo.mongo

import com.mongodb.DBCollection

interface MongoQuery {

    public void find(DBCollection collection, Map query, Closure cls)
}
