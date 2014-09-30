( function (ng) {

    function OutletSurveyService($http) {
        return {
            fetchSurveys: function(survey_id) {
                return $http.get("/api/outletSurveys/" + survey_id + "/" + "hotspot");
            },

            createSurvey: function(surveyId, params) {
                return $http.post("/api/outletSurveys/" + surveyId, params);
            }
        }
    }

    ng.module("OutletSurveyService", [])
        .factory("OutletSurveyService", ["$http", OutletSurveyService])

}(angular));