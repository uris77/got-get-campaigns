( function (ng) {

    function ListController ($scope, $state, $stateParams, GatewayService) {
        $scope.surveyId = $stateParams.id
        GatewayService.fetchSurveys($stateParams.id)
            .success(function(data){
                $scope.surveys = data;
            })
            .error(function(data) {
                console.error("Error retrieving surveys: ", data);
            });
    }

    ng.module("NonTraditionalOutletSurvey.list", [])
        .controller("ListController", ListController);
        
}(angular));