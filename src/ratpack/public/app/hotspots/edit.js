( function(ng) {

    function EditController($scope, $state, $stateParams, GatewayService) {
        $scope.surveyId = $stateParams.survey_id;
        $scope.hotspotSurveyId = $stateParams.hotspot_survey_id;
        GatewayService.fetchHotspotSurvey($scope.surveyId, $scope.hotspotSurveyId)
            .success(function (data){
                $scope.survey = data;
            })
            .error(function(error){
                console.error("Error fetching hotspot survey: ", error);
            });

        $scope.cancel = function() {
            $state.transitionTo("hotspotsList", {id: $scope.surveyId});
        };

        $scope.submit = function() {
            var params = {
                outreach: $scope.survey.outreach,
                targetPopulations: $scope.survey.targetPopulations,
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            GatewayService.editHotspotSurvey($scope.surveyId, $scope.hotspotSurveyId, params)
                .success( function(data){
                    $scope.cancel();
                })
                .error( function(error) {
                    console.error("ERROR: ", error);
                    alert("An error occurred!");
                });
        
        };

    }

    ng.module("Hotspots.edit", [])
        .controller("HotspotSurveyEditController", EditController);
}(angular));