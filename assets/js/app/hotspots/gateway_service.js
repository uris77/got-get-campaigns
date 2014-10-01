( function (ng) {
    
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/hotspot");
            },

            fetchSurveys: function(survey_id) {
                return $http.get("/api/outletSurveys/" + survey_id + "/" + "hotspot");
            },

            createSurvey: function(surveyId, params) {
                return $http.post("/api/outletSurveys/" + surveyId, params);
            },

            fetchHotspotSurvey: function(surveyId, outletSurveyId) {
                return $http.get("/api/outletSurveys/" + outletSurveyId)
            },

            editHotspotSurvey: function(surveyId, hotspotSurveyId, params) {
                return $http.put("/api/outletSurveys/" + hotspotSurveyId, params);
            }    
        };
    }

    ng.module("Hotspots.gateway", [])
        .factory("GatewayService", ["$http", GatewayService]);

}(angular));