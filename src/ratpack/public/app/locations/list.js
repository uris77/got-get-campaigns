( function (ng) {

    var apiUrls = {
        locations: {
            list: "/api/locations"
        }
    
    };

    function LocationListService ($http) {
        return {
            list: function() {
                return $http.get(apiUrls.locations.list);
            },
            search: function(locationName) {
                return $http.get(apiUrls.locations.list + "/search?locationName="+locationName);
            }
        };
    }

    function LocationListController ($scope, LocationListService) {
        LocationListService.list()
            .success(function (data) {
                $scope.locations = data;
            });

        $scope.search = function(locationName) {
            console.log("Search for location: ", locationName);
            LocationListService.search(locationName)
                .success(function (data) {
                    console.log("got data: ", data);
                    $scope.locations = data;
                })
                .error(function(error) {
                    console.error("Error executing search: ", error);
                });
        }
    }

    ng.module("locations.list", [])
        .factory("LocationListService", LocationListService)
        .controller("LocationListController", LocationListController);


}(angular));