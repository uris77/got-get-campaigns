( function (ng) {

    function validateLocationForm (params) {
        var errors = [];
        if(_.isUndefined(params.name) || _.isEmpty(params.name.trim())) {
            errors.push("Name: provide a name for the location.");
        }

        if(_.isUndefined(params.district)) {
            errors.push("District: select a district.");
        }

        if(_.isUndefined(params.locationType)) {
            errors.push("Type of location: select what type of outlet this location is.");
        }

        if(_.isUndefined(params.loc)) {
            errors.push("Latitude: specify the latitude.");
            errors.push("Longitude: specify the longitude.");
        } else {
            if(_.isUndefined(params.loc.lon) || !utils.isNumber(params.loc.lon)) {
                errors.push("Longitude: specify a valid longitude");
            }
            if(_.isUndefined(params.loc.lat) || !utils.isNumber(params.loc.lat)) {
                errors.push("Latitude: specify a valid latitude.");
            }
        }
        return errors;
    }

    function LocationUpdateService ($http) {
        var self = this;
        return {
            update: function(locationId, params) {
                return $http.update("/api/locations/" + locationId, params);
            },
            fetch: function(locationId) {
                return $http.get("/api/locations" + locationId);
            }
        };  
    }

    function LocationEditController ($scope, $state, urlUtils, LocationUpdateService) {
        $scope.districts = [
            {name: 'Corozal'}, {name: 'Orange Walk'}, {name: 'Belize'},
            {name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
        ];

        $scope.locationTypes = [
            {name: "Traditional"},
            {name: "Non-Traditional"},
            {name: "Hotspot"}
        ];
        LocationUpdateService.fetch($stateParams.locationId)
            .success(function(data) {
                $scope.location = data;
            })
            .error(function(error, status){
                console.error("Error fetching location: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.submit = function () {
            var params = {
                name: $scope.name,
                district: $scope.district ? $scope.district.name : undefined,
                locationType: $scope.locationType ? $scope.locationType.name : undefined,
                loc: {lon: $scope.longitude, lat: $scope.latitude}
            };
            var errors = validateLocationForm(params);
            if(errors.length > 0) {
                $scope.errors = errors;
            } else {
                LocationCreateService.create(params)
                .success(function() {
                    $state.transitionTo("locations.list")
                })
                .error(function(data, status) {
                    $scope.errors = data.errors;
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
            }   
        };

    }

    ng.module("location.edit", [])
        .factory("LocationUpdateService", ["$http", LocationUpdateService])
        .controller("LocationEditController", ["$scope", "$state", "urlUtils", "LocationUpdateService", LocationEditController]);
        

}(angular));