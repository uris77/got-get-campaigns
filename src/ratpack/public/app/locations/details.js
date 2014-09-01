( function(ng) {

    function LocationSurveysGateway($http) {
        var baseUrl = "/api/locations/";
        return {
            fetchDetails: function(locationId) {
                return $http.get(baseUrl + locationId);
            }
        }
    }

    function LocationDetailsController($scope, $stateParams, LocationSurveysGateway) {
        $scope.locationId = $stateParams.locationId;
        LocationSurveysGateway.fetchDetails($scope.locationId)
            .success( function(data) {
                $scope.surveys = data.surveys;
                $scope.location = data.location;
            })
            .error(function (error) {
                alert("An error occurred fetching the data from the server!");
                console.error("ERROR fetching data: ", error);
            });
    }

    ng.module("locations.details", [])
        .factory("LocationSurveysGateway", LocationSurveysGateway)
        .controller("LocationDetailsController", LocationDetailsController);

}(angular));