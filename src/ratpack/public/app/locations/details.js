( function(ng) {

    function LocationSurveysGateway($http) {
        var baseUrl = "/api/locations/";
        return {
            fetchDetails: function(locationId) {
                return $http.get(baseUrl + locationId);
            }
        }
    }

    function LocationDetailsController($scope, $stateParams, urlUtils, LocationSurveysGateway) {
        $scope.summary = true;
        $scope.locationId = $stateParams.locationId;
        LocationSurveysGateway.fetchDetails($scope.locationId)
            .success( function(data) {
                $scope.surveys = data.surveys;
                $scope.location = data.location;
            })
            .error(function (error, status) {
                if(status == 401) {
                    urlUtils.redirectHome();
                } else {
                    alert("An error occurred fetching the data from the server!");
                    console.error("ERROR fetching data: ", error);
                }
            });

        $scope.showMore = function(survey) {
            $scope.summary = false;
            $scope.survey = survey;
        };

        $scope.showLess = function() {
            $scope.summary = true;
        };
    }

    ng.module("locations.details", [])
        .factory("LocationSurveysGateway", LocationSurveysGateway)
        .controller("LocationDetailsController", LocationDetailsController);

}(angular));