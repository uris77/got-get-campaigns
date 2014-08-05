package org.pasmo.gotitget.locations

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.allanbank.mongodb.builder.Aggregate
import com.allanbank.mongodb.builder.QueryBuilder
import com.allanbank.mongodb.builder.Sort
import com.mongodb.util.JSON
import org.pasmo.gotitget.repositories.AbstractMongoRepository


class LocationCrudService extends AbstractMongoRepository {
    private MongoCollection mongoCollection

    LocationCrudService(MongoClient mongo, String databaseName) {
        super(mongo, databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
    }

    @Override
    String getCollectionName() {
        "pasmo_locations"
    }

    LocationEntity create(String json) {
        def params = JSON.parse(json)
        DocumentBuilder doc = BuilderFactory.start()
        params.each{ key, value ->
            if(key == 'loc') {
                def loc = [lon: Double.parseDouble(value.lon), lat: Double.parseDouble(value.lat)]
                doc.add(key, loc)
            } else {
                doc.add(key, value)
            }
        }
        mongoCollection.insert(doc)
        new LocationEntity(findByName(params.name))
    }

    Document findByName(String locationName) {
        mongoCollection.findOne(QueryBuilder.where("name").equals(locationName))
    }

    List<LocationEntity> findAll() {
        List<LocationEntity> locations = []
        Aggregate.Builder builder = new Aggregate.Builder()
        builder.sort(Sort.asc("name"))
        mongoCollection.aggregate(builder).each { doc ->
            locations << new LocationEntity(doc)
        }
        locations
    }
}
