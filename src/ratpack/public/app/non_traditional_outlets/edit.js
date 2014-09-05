( function(ng) {

    function EditController($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.survey_id = $stateParams.survey_id;
        $scope.outlet_survey_id = $stateParams.outlet_survey_id;
        NonTraditionalSurveyGatewayService.fetchSurvey($scope.survey_id, $scope.outlet_survey_id)
            .success(function(data) {
                $scope.survey = data;
                $scope.survey.outletType = JSON.parse(data.outletType).name;
            })
            .error(function(error) {
                console.error("Error fetching survey data: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.cancel = function() {
            $state.transitionTo("listNonTraditionalOutlets", {id: $scope.survey_id});
        };

        $scope.submit = function() {
            var params = {
                outreach: $scope.survey.outreach,
                targetPopulations: $scope.survey.targetPopulations,
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            NonTraditionalSurveyGatewayService.editSurvey($scope.survey_id, $scope.outlet_survey_id, params)
                .success( function(data){
                    $scope.cancel();
                })
                .error( function(error, status) {
                    if(status == 401) { 
                        urlUtils.redirectHome();
                    } else {
                        console.error("ERROR: ", error);
                        alert("An error occurred!");
                    }
                });
            
        };

    }

    ng.module("NonTraditionalOutletSurvey.edit", [])
        .controller("NonTraditionalOutletSurveyEditController", EditController);
        
}(angular));