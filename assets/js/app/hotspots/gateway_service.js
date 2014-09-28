( function (ng) {
    
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/hotspot");
            },

            fetchSurveys: function(survey_id) {
                //return $http.get("/api/surveys/" + survey_id + "/hotspots");
                return $http.get("/api/outletSurveys/" + survey_id + "/" + "hotspot");
            },

            createSurvey: function(surveyId, params) {
                //return $http.post("/api/surveys/" + survey_id + "/hotspots", params);
                return $http.post("/api/outletSurveys/" + surveyId, params);
            },

            fetchHotspotSurvey: function(survey_id, hotspot_survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/hotspots/" + hotspot_survey_id);
            },

            editHotspotSurvey: function(survey_id, hotspot_survey_id, params) {
                return $http.put("/api/surveys/" + survey_id + "/hotspots/" + hotspot_survey_id, params);
            }    
        };
    }

    ng.module("Hotspots.gateway", [])
        .factory("GatewayService", ["$http", GatewayService]);

}(angular));