package org.pasmo.mongo

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject

class MongoQueryImpl implements MongoQuery {

    public void find(DBCollection collection, Map query, Closure cls) {
        Map _sort = [:]
        Map _query = query
        if(query.containsKey("sort")) {
            _sort = query.sort
            _query = query.findAll{ item ->
                item.getKey().toString() != 'sort'
            }
        }
        DBCursor cursor = collection.find(_query)
        if(query.containsKey('sort')) {
            DBObject sort = new BasicDBObject()
            String sortBy = _sort.keySet().first().toString()
            sort.put(sortBy, _sort['sortBy'])
            cursor.sort((DBObject) (new BasicDBObject(sortBy, query.sort['sortBy'])))
        }
        try {
            while(cursor.hasNext()) {
                cls(cursor.next())
            }
        } finally {
            cursor.close()
        }
    }

}
