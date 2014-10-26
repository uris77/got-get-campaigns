package org.pasmo.locations

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import com.mongodb.util.JSON
import org.bson.types.ObjectId
import org.pasmo.locations.messagebus.LocationMessagePublisher
import org.pasmo.locations.messagebus.LocationTrackEvent
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.outlets.OutletSurveyMongoCrud

import javax.inject.Inject

class LocationCrudService {
    private final String COLLECTION_NAME = "pasmo_locations"
    private final MongoDBClient mongoDBClient
    private final DBCollection mongoCollection
    private final LocationMessagePublisher publisher

    @Inject
    LocationCrudService(MongoDBClient mongoDBClient, LocationMessagePublisher publisher) {
        this.mongoDBClient = mongoDBClient
        this.mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.publisher = publisher
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

    LocationEntity update(String locationId, Map params) {
        BasicDBObject queryDoc = new BasicDBObject("_id", new ObjectId(locationId))
        BasicDBObject updateDoc = new BasicDBObject()
        params.each { key, value ->
            if(key == "loc") {
                def loc = [type: "Point", coordinates: [Double.parseDouble(value.lon), Double.parseDouble(value.lat)]]
                updateDoc.append(key, loc)
            } else {
                updateDoc.append(key, value)
            }
        }
        mongoCollection.update(queryDoc, new BasicDBObject(new BasicDBObject('$set',updateDoc)))
        LocationEntity locationEntity = findById(locationId)
        LocationTrackEvent locationTrackEvent = new LocationTrackEvent(locationEntity, LocationTrackEvent.ACTION.UPDATE)
        publisher.notifyChange(locationTrackEvent)
        locationEntity
    }

    LocationEntity findById(String id) {
        BasicDBObject queryDoc = new BasicDBObject("_id", new ObjectId(id))
        LocationEntity.create(mongoCollection.findOne(queryDoc))
    }

    List<LocationEntity> findAll() {
        List<LocationEntity> locations = []
        DBCursor cursor = mongoCollection.find(new BasicDBObject("deleted", false))
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

    public void delete(String locationId) {
        mongoCollection.remove(new BasicDBObject("_id", new ObjectId(locationId)))
    }
}
