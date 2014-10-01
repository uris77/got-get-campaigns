( function (ng) {
    function OutletGatewayService ($http) {
        //Fetch all traditional outlets from server.
        return {
            fetchTraditionalOutlets: function() {
                return $http.get("/api/locations/byType/traditional");
            },
            createTraditonalOutlet: function(surveyId, params) {
                return $http.post("/api/outletSurveys/" + surveyId, params);
            },
            fetchTraditionalOutletsSurvey: function(surveyId) {
                return $http.get("/api/outletSurveys/" + surveyId + "/" + "traditional");
            },
            fetchSurvey: function(outletSurveyId) {
                return $http.get("/api/outletSurveys/" + outletSurveyId);
            },
            updateSurvey: function(outletSurveyId, params) {
                return $http.put("/api/outletSurveys/" + outletSurveyId, params);
            }
        };
        
    }

    ng.module("TraditionalOutletSurvey.gatewayService", [])
        .factory("TraditionalOutletGatewayService", ["$http", OutletGatewayService]);

}(angular));