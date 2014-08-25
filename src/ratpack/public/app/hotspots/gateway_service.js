( function (ng) {
    
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/hotspot");
            },

            fetchSurveys: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/hotspots");
            },

            createSurvey: function(survey_id, params) {
                return $http.post("/api/surveys/" + survey_id + "/hotspots", params);
           }
        };
    }

    ng.module("Hotspots.gateway", [])
        .factory("GatewayService", GatewayService);

}(angular));