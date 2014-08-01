package org.pasmo.gotitget.repositories

import com.allanbank.mongodb.MongoClient
import com.allanbank.mongodb.MongoCollection
import com.allanbank.mongodb.bson.builder.BuilderFactory
import com.allanbank.mongodb.bson.builder.DocumentBuilder
import com.allanbank.mongodb.bson.Document
import com.allanbank.mongodb.builder.Find
import com.allanbank.mongodb.bson.element.ObjectId
import static com.allanbank.mongodb.builder.QueryBuilder.where
import com.mongodb.util.JSON
import groovy.stream.Stream
import org.pasmo.gotitget.repositories.entities.UserEntity



class UserMongoRepository extends AbstractMongoRepository {

    private MongoCollection mongoCollection

    UserMongoRepository(MongoClient mongo, String databaseName) {
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

    Document save(String json) {
        DocumentBuilder document = BuilderFactory.start()
        def obj = JSON.parse(json)
        obj.each{ key, value ->
            document.add(key, value)
        }
        mongoCollection.insert(document)
        mongoCollection.findOne(where("email").equals(obj.email))
    }

    UserEntity findByEmail(String email) {
        Document userDoc = mongoCollection.findOne(where("email").equals(email))
        new UserEntity(userDoc)
    }

    List<UserEntity> findAll() {
        Stream stream = Stream.from(mongoCollection.find(Find.ALL)).map{ Document item ->
            new UserEntity(item)
        }
        stream.collect()
    }

    UserEntity findById(String id) {
        Document userDoc = mongoCollection.findOne(where("_id").equals(new ObjectId(id)))
        new UserEntity(userDoc)
    }

    UserEntity update(String id, Map params) {
        DocumentBuilder update = BuilderFactory.start().push('$set')
        params.each{key, value ->
            update.add(key, value)
        }
        Document queryDocument = where("_id").equals(new ObjectId(id)).asDocument()
        mongoCollection.update(queryDocument, update)
        findById(id)
    }

    public void remove(String id) {
        mongoCollection.delete(where("_id").equals(new ObjectId(id)))
    }
}
