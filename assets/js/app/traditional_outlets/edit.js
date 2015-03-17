( function(ng) {

    function EditController($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
        $scope.surveyId = $stateParams.survey_id;
        console.log("In Edit Controller::: ", $stateParams);
        TraditionalOutletGatewayService.fetchSurvey($stateParams.traditional_outlet_survey_id)
            .success(function(data) {
                $scope.survey = data;
                console.log("survey: ", $scope.survey);
            })
            .error(function(error, status){
                if(status == 401) {
                    urlUtils.redirectHome();
                } else {
                    alert("Could not retrieve survey from server!");
                    console.log("Error retrieving traditonal outlet from server: ", error);
                }
            });

         $scope.submit = function() {
            var params = {
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false,
                notes: $scope.survey.notes
            };
            TraditionalOutletGatewayService.updateSurvey($stateParams.traditional_outlet_survey_id, params)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
                })
                .error(function(error, status) {
                    console.error("ERROR: ", error);
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
        };
    }

    ng.module("TraditionalOutletSurvey.edit", [])
        .controller("TraditionalOutletSurveyEditController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", EditController]);

}(angular));
