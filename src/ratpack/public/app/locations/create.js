( function (ng) {

    var apiUrls = {
        locations: {
            create: "/api/locations"
        }
    };

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

    function LocationCreateService ($http) {
        var self = this;
        return {
            create: function(params) {
                return $http.post(apiUrls.locations.create, params);
            }
        };  
    }

    function LocationCreateController ($scope, $state, LocationCreateService) {
        $scope.districts = [
            {name: 'Corozal'}, {name: 'Orange Walk'}, {name: 'Belize'},
            {name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
        ];

        $scope.locationTypes = [
            {name: "Traditional"},
            {name: "Non-Traditional"},
            {name: "Hotspot"}
        ];

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
                .error(function(data) {
                    $scope.errors = data.errors;
                });
            }   
        };
    }

    ng.module("location.create", [])
        .factory("LocationCreateService", LocationCreateService)
        .controller("LocationCreateController", LocationCreateController);
        
}(angular));