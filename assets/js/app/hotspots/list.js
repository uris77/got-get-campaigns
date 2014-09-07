( function (ng) {

    function ListController($scope, $state, $stateParams, urlUtils, GatewayService) {
        $scope.surveyId = $stateParams.id;
        GatewayService.fetchSurveys($stateParams.id)
            .success(function (data) {
                $scope.surveys = data;
            })
            .error(function (error, status) {
                console.error("Error retrieving surveys: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("Hotspots.list", [])
        .controller("ListController", ["$scope", "$state", "$stateParams", "urlUtils", "GatewayService", ListController]);

}(angular));