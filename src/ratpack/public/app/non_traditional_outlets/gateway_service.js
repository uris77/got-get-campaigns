( function (ng) {
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/non_traditional");
            },

            fetchSurveys: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/non_traditional_outlets");
            },

            createSurvey: function(survey_id, params) {
                return $http.post("/api/surveys/" + survey_id + "/non_traditional_outlets", params)
;           }
        };
    }

    ng.module("NonTraditionalOutletSurvey.gatewayService", [])
        .factory("NonTraditionalSurveyGatewayService", GatewayService);

}(angular));