package org.pasmo.surveys.outlets.hotspot

import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
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
        createHotspotEntity(obj, survey)
    }

    List<HotspotEntity> listAll(String surveyId) {
        List<HotspotEntity> hotspots = []
        SurveyEntity survey  = surveyGateway.findById(surveyId)
        DBCursor cursor = mongoCollection.find(new BasicDBObject("survey_id", new ObjectId(surveyId)))
        try {
            while(cursor.hasNext()) {
                hotspots << createHotspotEntity(cursor.next(), survey)
            }
        } finally {
            cursor.close()
        }
        hotspots
    }

    private createHotspotEntity(DBObject doc, SurveyEntity survey) {
        new HotspotEntity(
                id: doc.get("_id").toString(),
                targetPopulations: doc.get("target_populations"),
                outreach: doc.get("outreach"),
                condomsAvailable: doc.get("condoms_available"),
                lubesAvailable: doc.get("lubes_available"),
                gigi: doc.get("gigi"),
                survey: [
                        year: survey.year.toString(),
                        month: survey.month
                ],
                locationName: doc.get("location").name,
                district: doc.get("location").district
        )
    }
}
