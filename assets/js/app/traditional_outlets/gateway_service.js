( function (ng) {
    function OutletGatewayService ($http) {
        //Fetch all traditional outlets from server.
        return {
            fetchTraditionalOutlets: function() {
                return $http.get("/api/locations/byType/traditional");
            },
            createTraditonalOutlet: function(params, survey_id) {
                //return $http.post("/api/surveys/" + survey_id + "/traditional_outlets", params);
                return $http.post("/api/outletSurveys/" + surveyId, params);
            },
            fetchTraditionalOutletsSurvey: function(survey_id) {
                //return $http.get("/api/surveys/" + survey_id + "/traditional_outlets");
                return $http.get("/api/outletSurveys/" + survey_id + "/" + "traditional");
            },
            fetchSurvey: function(survey_id, outlet_survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/traditional_outlets/" + outlet_survey_id);
            },
            updateSurvey: function(params, survey_id, outletSurveyId) {
                //return $http.put("/api/surveys/" + survey_id + "/traditional_outlets/" + outlet_survey_id, params);
                return $http.put("/api/outletSurveys/" + outletSurveyId, params);
            }
        };
        
    }

    ng.module("TraditionalOutletSurvey.gatewayService", [])
        .factory("TraditionalOutletGatewayService", ["$http", OutletGatewayService]);

}(angular));