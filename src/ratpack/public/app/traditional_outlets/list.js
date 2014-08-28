( function (ng) {
    function ListController ($scope, $state, $stateParams, TraditionalOutletGatewayService) {
        $scope.id = $stateParams.id;
        TraditionalOutletGatewayService.fetchTraditionalOutletsSurvey($stateParams.id)
            .success(function(data) {
                $scope.surveys = data;
            })
            .error(function(data) {
                console.error("ERROR: ", data);
            });
    }

    ng.module("TraditionalOutletSurvey.list", [])
        .controller("TraditionalOutletSurveyListController", ListController);

}(angular));