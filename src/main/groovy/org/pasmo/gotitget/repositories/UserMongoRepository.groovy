package org.pasmo.gotitget.repositories

import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import static com.allanbank.mongodb.builder.QueryBuilder.where
import com.mongodb.BasicDBObject
import com.mongodb.DBCursor
import com.mongodb.DBObject
import com.mongodb.Mongo
import com.mongodb.util.JSON
import groovy.stream.Stream
import org.bson.types.ObjectId
import org.pasmo.gotitget.repositories.entities.UserEntity



class UserMongoRepository extends AbstractMongoRepository {

    private MongoCollection mongoCollection

    UserMongoRepository(Mongo mongo, String databaseName) {
        super(mongo, databaseName)
        mongoCollection = mongoDatabase.getCollection(collectionName)
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

    UserEntity findByEmail(String email) {
        BasicDBObject query = [email: email]  as BasicDBObject
        BasicDBObject obj = collection.findOne(query)
        new UserEntity(obj)
    }

    List<UserEntity> findAll() {
        DBCursor cursor = collection.find()
        Stream stream = Stream.from(cursor).map{ item ->
            new UserEntity(item)
        }
        stream.collect()
    }

    UserEntity findById(String id) {
        DBObject obj = [_id: new ObjectId(id)]  as BasicDBObject
        new UserEntity(collection.findOne(obj))
    }

    UserEntity update(String id, Map params) {
        println "updating doc with params: ${params}"
//        DBObject searchQuery = new BasicDBObject().append("_id", new ObjectId(id))
//        BasicDBObject updateDoc = new BasicDBObject()
//        params.each{key, value ->
//            if(value != null) {
//                println("key: ${key} => " + ["enabled", "admin"].contains(key.toString()))
//                if(["enabled", "admin"].contains(key.toString()) == true) {
//                    updateDoc.append(key, value)
//                } else {
//                    updateDoc.append(key, value.toString())
//                }
//            }
//        }
//        BasicDBObject update = new BasicDBObject('$set', updateDoc)
//        collection.update(searchQuery, update)
        DocumentBuilder update = BuilderFactory.start().push('$set')
        params.each{key, value ->
            if(key == "enabled" || key == "admin") {
                println "key: ${key}"
                update.add(key, value)
            } else {
                update.addString(key, value.toString())
            }

        }
        println "Update: ${update}"
        println "ID: ${id}"
        mongoCollection.update(where("_id").equals(id).asDocument(), update)
        findById(id)
    }

    public void remove(String id) {
        update(id, [enabled: false])
    }
}
