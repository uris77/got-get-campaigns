( function (ng) {
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/non_traditional");
            },

            fetchSurveys: function(surveyId) {
                return $http.get("/api/outletSurveys/" + surveyId + "/non-traditional");
            },

            createSurvey: function(surveyId, params) {
                return $http.post("/api/outletSurveys/" + surveyId, params)
;           },

            fetchSurvey: function(surveyId, outletSurveyId) {
                return $http.get("/api/outletSurveys/" + outletSurveyId);
            },
            editSurvey: function(surveyId, outletSurveyId, params) {
                return $http.put("/api/outletSurveys/" + outletSurveyId, params);
            }
        };
    }

    ng.module("NonTraditionalOutletSurvey.gatewayService", [])
        .factory("NonTraditionalSurveyGatewayService", ["$http", GatewayService]);

}(angular));