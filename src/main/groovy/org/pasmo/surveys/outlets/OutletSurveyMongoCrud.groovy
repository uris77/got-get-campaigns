package org.pasmo.surveys.outlets

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import org.bson.types.ObjectId
import org.pasmo.locations.LocationEntity
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway

import javax.inject.Inject

class OutletSurveyMongoCrud implements OutletSurveyCrud {
    private final MongoDBClient mongoDBClient
    private final DBCollection mongoCollection
    private final SurveyGateway surveyGateway
    private final String COLLECTION_NAME = "outlet_surveys"

    @Inject
    OutletSurveyMongoCrud(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        this.mongoDBClient = mongoDBClient
        mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    OutletSurvey create(Map params, String username) {
        BasicDBObject doc = new BasicDBObject()
        params.each{ key, value ->
            if(key == "surveyId") {
                SurveyEntity survey = surveyGateway.findById(value.toString())
                doc.append("survey", [id: new ObjectId(survey.id), year: survey.year, month: survey.month])
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                doc.append(key, value)
            } else {
                doc.append(key, value)
            }
        }
        doc.append("createdBy", username)
        doc.append("dateCreated", new Date())
        mongoCollection.insert(doc)
        OutletSurvey.create(doc)
    }

    OutletSurvey update(Map params, String outletSurveyId, String userName) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject("gigi", params.gigi)
        params.each{ key, val ->
            updateDoc.append(key, val)
        }
        updateDoc.append("updatedBy", userName)
        updateDoc.append("dateUpdated", new Date())
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(outletSurveyId)), doc)
        OutletSurvey.create(mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(outletSurveyId))))
    }

    public void updateLocation(String locationId, BasicDBObject updateDoc) {
        DBCursor surveysWithLocationCursor = findSurveysWithLocation(locationId)
        try {
            while(surveysWithLocationCursor.hasNext()) {
                BasicDBObject doc = new BasicDBObject('$set', updateDoc)
                mongoCollection.update(surveysWithLocationCursor.next(), doc)
            }
        } finally {
            surveysWithLocationCursor.close()
        }
    }

    public void updateLocationInSurveys(LocationEntity locationEntity) {
        BasicDBObject updateDoc = new BasicDBObject()
        updateDoc.append("location.name", locationEntity.name)
            .append("location.district", locationEntity.district)
            .append("location.locationType", locationEntity.locationType)
            .append("location.loc", locationEntity.loc)
        updateLocation(locationEntity._id, updateDoc)
    }

    private DBCursor findSurveysWithLocation(String locationId) {
        BasicDBObject queryDoc = new BasicDBObject("location.id", new ObjectId(locationId))
        mongoCollection.find(queryDoc, new BasicDBObject("_id", 1))
    }
}
