package org.pasmo.surveys.outlets

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import org.bson.types.ObjectId
import org.pasmo.mongo.MongoQuery
import org.pasmo.persistence.MongoDBClient

import javax.inject.Inject

class OutletSurveysMongoImpl implements OutletSurveys {
    private final MongoDBClient mongoDBClient
    private final MongoQuery mongoQuery
    private final DBCollection mongoCollection
    private final String COLLECTION_NAME = "outlet_surveys"

    @Inject
    OutletSurveysMongoImpl(MongoDBClient mongoDBClient, MongoQuery mongoQuery) {
        this.mongoDBClient = mongoDBClient
        this.mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.mongoQuery = mongoQuery
    }

    @Override
    List<OutletSurvey> listAll(String outletType, String surveyId) {
        List<OutletSurvey> surveys = []
//        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey.id", new ObjectId(surveyId)))
//        try {
//            while(cursor.hasNext()) {
//                surveys << OutletSurvey.create(cursor.next())
//            }
//        } finally {
//            cursor.close()
//        }
        mongoQuery.find(mongoCollection, ["survey.id": surveyId, "outletType": outletType]){DBObject doc ->
            surveys << OutletSurvey.create(doc)
        }
        surveys
    }
}
