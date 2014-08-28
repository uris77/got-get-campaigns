( function (ng) {
    function OutletGatewayService ($http) {
        //Fetch all traditional outlets from server.
        return {
            fetchTraditionalOutlets: function() {
                return $http.get("/api/locations/byType/traditional");
            },
            createTraditonalOutlet: function(params, survey_id) {
                return $http.post("/api/surveys/" + survey_id + "/traditional_outlets", params);
            },
            fetchTraditionalOutletsSurvey: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/traditional_outlets");
            }
        };
        
    }

    ng.module("TraditionalOutletSurvey.gatewayService", [])
        .factory("TraditionalOutletGatewayService", OutletGatewayService);

}(angular));