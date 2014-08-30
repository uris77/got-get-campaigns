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

    HotspotEntity create(Map params) {
        BasicDBObject obj = new BasicDBObject()
        params.each{ key, value ->
            if(key == "surveyId") {
                obj.append("survey_id", new ObjectId(value))
            } else if(key == "location") {
                value.id = new ObjectId(value.id)
                obj.append(key, value)
            } else {
                obj.append(key, value)
            }
        }
        SurveyEntity survey = surveyGateway.findById(obj.survey_id.toString())
        mongoCollection.insert(obj)
        HotspotEntity.create(obj, survey)
    }

    List<HotspotEntity> listAll(String surveyId) {
        List<HotspotEntity> hotspots = []
        SurveyEntity survey  = surveyGateway.findById(surveyId)
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey_id", new ObjectId(surveyId)))
        try {
            while(cursor.hasNext()) {
                hotspots << HotspotEntity.create(cursor.next(), survey)
            }
        } finally {
            cursor.close()
        }
        hotspots
    }

    HotspotEntity update(Map params, String surveyId) {
        BasicDBObject doc = new BasicDBObject()
        BasicDBObject updateDoc = new BasicDBObject("gigi", params.gigi)
        updateDoc.append("condoms_available", params.condomsAvailable)
        updateDoc.append("lubes_available", params.lubesAvailable)
        updateDoc.append("target_populations", params.targetPopulations)
        updateDoc.append("outreach", params.outreach)
        doc.append('$set', updateDoc)
        mongoCollection.update(new BasicDBObject("_id", new ObjectId(surveyId)), doc)
        findById(surveyId)
    }

    HotspotEntity findById(String outletSruveyId) {
        BasicDBObject doc = mongoCollection.findOne(new BasicDBObject("_id", new ObjectId(outletSruveyId)))
        SurveyEntity survey = surveyGateway.findById(doc.get("survey_id").toString())
        HotspotEntity.create(doc, survey)
    }
}
