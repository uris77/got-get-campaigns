( function(ng) {

    function EditController($scope, $state, $stateParams, TraditionalOutletGatewayService) {
        TraditionalOutletGatewayService.fetchSurvey($stateParams.survey_id, $stateParams.traditional_outlet_survey_id)
            .success(function(data) {
                $scope.survey = data;
            })
            .error(function(error){
                alert("Could not retrieve survey from server!");
                console.log("Error retrieving traditonal outlet from server: ", error);
            });

         $scope.submit = function() {
            var params = {
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            TraditionalOutletGatewayService.updateSurvey(params, $stateParams.survey_id, $stateParams.traditional_outlet_survey_id)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
                });
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
        };
    }

    ng.module("TraditionalOutletSurvey.edit", [])
        .controller("TraditionalOutletSurveyEditController", EditController);

}(angular));