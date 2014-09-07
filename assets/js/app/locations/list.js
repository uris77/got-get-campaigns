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

    function LocationListController ($scope, urlUtils, LocationListService) {
        LocationListService.list()
            .success(function (data) {
                $scope.locations = data;
            })
            .error(function(data, status){
                console.error("ERROR: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.search = function(locationName) {
            LocationListService.search(locationName)
                .success(function (data) {
                    $scope.locations = data;
                })
                .error(function(error, status) {
                    console.error("Error executing search: ", error);
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
        };
    }

    ng.module("locations.list", [])
        .factory("LocationListService", ["$http", LocationListService])
        .controller("LocationListController", ["$scope", "urlUtils", "LocationListService", LocationListController]);

}(angular));