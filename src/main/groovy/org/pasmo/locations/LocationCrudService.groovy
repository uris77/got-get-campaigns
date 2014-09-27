package org.pasmo.locations

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import com.mongodb.util.JSON
import org.pasmo.persistence.MongoDBClient

import javax.inject.Inject

class LocationCrudService {
    private final String COLLECTION_NAME = "pasmo_locations"
    private final MongoDBClient mongoDBClient
    private final DBCollection mongoCollection

    @Inject
    LocationCrudService(MongoDBClient mongoDBClient) {
        this.mongoDBClient = mongoDBClient
        this.mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
    }

    LocationEntity create(String json, String userName) {
        def params = JSON.parse(json)
        BasicDBObject doc = new BasicDBObject()
        params.each { key, value ->
            if(key == "loc") {
                def loc = [type: "Point", coordinates: [Double.parseDouble(value.lon), Double.parseDouble(value.lat)]]
                doc.append(key, loc)
            } else {
                doc.append(key, value)
            }
        }
        doc.append("createdBy", userName)
        doc.append("dateCreated", new Date())
        doc.append("deleted", false)
        mongoCollection.insert(doc)
        LocationEntity.create(doc)
    }

    LocationEntity findByName(String locationName) {
        LocationEntity.create(mongoCollection.findOne(new BasicDBObject("name", locationName)))
    }

    List<LocationEntity> findAll() {
        List<LocationEntity> locations = []
        DBCursor cursor = mongoCollection.find()
        try {
            while(cursor.hasNext()) {
                DBObject doc = cursor.next()
                locations << LocationEntity.create(doc)
            }
        }  finally {
            cursor.close()
        }
        locations
    }
}
