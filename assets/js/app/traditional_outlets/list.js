( function (ng) {
    function ListController ($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
        $scope.id = $stateParams.id;
        TraditionalOutletGatewayService.fetchTraditionalOutletsSurvey($stateParams.id)
            .success(function(data) {
                $scope.surveys = data;
            })
            .error(function(data, status) {
                console.error("ERROR: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("TraditionalOutletSurvey.list", [])
        .controller("TraditionalOutletSurveyListController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", ListController]);

}(angular));