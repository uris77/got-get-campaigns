( function (ng) {

    function ListController($scope, $state, $stateParams, GatewayService) {
        $scope.surveyId = $stateParams.id;
        GatewayService.fetchSurveys($stateParams.id)
            .success(function (data) {
                $scope.surveys = data;
            })
            .error(function (error) {
                console.error("Error retrieving surveys: ", error);
            });
    }

    ng.module("Hotspots.list", [])
        .controller("ListController", ListController);

}(angular));