package org.pasmo.surveys.outlets.hotspot

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import org.bson.types.ObjectId
import org.pasmo.persistence.MongoDBClient
import org.pasmo.surveys.SurveyEntity
import org.pasmo.surveys.SurveyGateway

import javax.inject.Inject

class HotspotSurveyCrud {
    private final String COLLECTION_NAME = "hotspot_surveys"
    private SurveyGateway surveyGateway
    private DBCollection mongoCollection

    @Inject
    HotspotSurveyCrud(MongoDBClient mongoDBClient, SurveyGateway surveyGateway) {
        this.mongoCollection = mongoDBClient.getCollection(COLLECTION_NAME)
        this.surveyGateway = surveyGateway
    }

    HotspotEntity create(Map params, String userName) {
        BasicDBObject obj = new BasicDBObject()
        params.each{ key, value ->
            if(key == "surveyId") {
                SurveyEntity survey = surveyGateway.findById(value.toString())
                obj.append("survey", [id: new ObjectId(survey.id), year: survey.year, month: survey.month])
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                obj.append(key, value)
            } else {
                obj.append(key, value)
            }
        }
        obj.append("createdBy", userName)
        obj.append("dateCreated", new Date())
        mongoCollection.insert(obj)
        HotspotEntity.create(obj)
    }

    List<HotspotEntity> listAll(String surveyId) {
        List<HotspotEntity> hotspots = []
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey.id", new ObjectId(surveyId)))
        try {
            while(cursor.hasNext()) {
                hotspots << HotspotEntity.create(cursor.next())
            }
        } finally {
            cursor.close()
        }
        hotspots
    }

    HotspotEntity update(Map params, String surveyId, String userName) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject("gigi", params.gigi)
        updateDoc.append("condomsAvailable", params.condomsAvailable)
        updateDoc.append("lubesAvailable", params.lubesAvailable)
        updateDoc.append("targetAopulations", params.targetPopulations)
        updateDoc.append("outreach", params.outreach)
        updateDoc.append("updatedBy", userName)
        updateDoc.append("dateUpdated", new Date())
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(surveyId)), doc)
        findById(surveyId)
    }

    HotspotEntity findById(String outletSruveyId) {
        BasicDBObject doc = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(outletSruveyId)))
        HotspotEntity.create(doc)
    }
}
