( function (ng) {

    function ListController ($scope, $state, $stateParams, NonTraditionalSurveyGatewayService) {
        $scope.surveyId = $stateParams.id
        NonTraditionalSurveyGatewayService.fetchSurveys($stateParams.id)
            .success(function(data){
                $scope.surveys = data;
            })
            .error(function(data) {
                console.error("Error retrieving surveys: ", data);
            });
    }

    ng.module("NonTraditionalOutletSurvey.list", [])
        .controller("NonTraditionalOutletSurveyListController", ListController);
        
}(angular));