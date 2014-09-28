package org.pasmo.mongo

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor

class MongoQueryImpl implements MongoQuery {
    public static final int ASC = 1
    public static final int DSC = -1

    public void find(DBCollection collection, Map query, Closure cls) {
        DBCursor cursor = collection.find(queryDoc(query))
        sort(cursor, query)
        try {
            while(cursor.hasNext()) {
                cls(cursor.next())
            }
        } finally {
            cursor.close()
        }
    }

    private BasicDBObject queryDoc(Map query) {
        BasicDBObject queryDoc = new BasicDBObject()
        Map _query = query.findAll{ it ->
            it.getKey().toString() != "sort"
        }
        _query.each{key, value ->
            queryDoc.append(key, value)
        }
        queryDoc
    }

    private void sort(DBCursor cursor, Map query) {
        if(query.containsKey("sort")) {
            BasicDBObject orderBy = new BasicDBObject()
            query.sort.each{key,value ->
                orderBy.append(key, value)
            }
            cursor.sort(orderBy)
        }
    }

}
