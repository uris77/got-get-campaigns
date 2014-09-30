( function (ng) {

    function ListController($scope, $state, $stateParams, urlUtils, OutletSurveyService) {
        $scope.surveyId = $stateParams.id;
        OutletSurveyService.fetchSurveys($stateParams.id)
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
        .controller("ListController", ["$scope", "$state", "$stateParams", "urlUtils", "OutletSurveyService", ListController]);

}(angular));