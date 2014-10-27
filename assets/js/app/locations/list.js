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
            },
            remove: function(locationId) {
                return $http.delete(apiUrls.locations.list + "/" + locationId);
            }
        };
    }


    function LocationListController ($scope, urlUtils, LocationListService) {
        $scope.getList = function () {
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
        };

        $scope.getList();

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

        $scope.remove = function(location) {
            if(confirm("You are about to delete " + location.name + "! Do you want to continue?")) {
                LocationListService.remove(location.id);
                $scope.locations = _.filter($scope.locations, function(it) { return it.id != location.id; });
            }
        };
    }

    ng.module("locations.list", [])
        .factory("LocationListService", ["$http", LocationListService])
        .controller("LocationListController", ["$scope", "urlUtils", "LocationListService", LocationListController]);

}(angular));