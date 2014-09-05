( function (ng) {

    function ListController ($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.surveyId = $stateParams.id
        NonTraditionalSurveyGatewayService.fetchSurveys($stateParams.id)
            .success(function(data){
                $scope.surveys = data;
            })
            .error(function(data, status) {
                console.error("Error retrieving surveys: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("NonTraditionalOutletSurvey.list", [])
        .controller("NonTraditionalOutletSurveyListController", ListController);
        
}(angular));