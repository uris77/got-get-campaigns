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

        if(_.isUndefined(params.longitude) || !utils.isNumber(params.longitude)) {
            errors.push("Longitude: specify a valid longitude");
        }

        if(_.isUndefined(params.latitude) || !utils.isNumber(params.latitude)) {
            errors.push("Latitude: specify a valid latitude.");
        }

        return errors;
    }

    function LocationUpdateService ($http) {
        var self = this;
        return {
            update: function(locationId, params) {
                return $http.put("/api/locations/" + locationId, params);
            },
            fetch: function(locationId) {
                return $http.get("/api/locations/" + locationId);
            }
        };  
    }

    

    function LocationEditController ($scope, $stateParams, $state, urlUtils, LocationUpdateService, outlet) {
        var ctrl = this;

        var districts = [
            {name: 'Corozal'}, {name: 'Orange Walk'}, {name: 'Belize'},
            {name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
        ];

        var locationTypes = [
            {name: "Traditional"},
            {name: "Non-Traditional"},
            {name: "Hotspot"}
        ];
        var locationType = _.findWhere(locationTypes, {name: outlet.locationType});
        var district = _.findWhere(districts, {name: outlet.district});

        function submit() {
            var params = {
                name: ctrl.name,
                district: ctrl.district ? ctrl.district.name : undefined,
                locationType: ctrl.locationType ? ctrl.locationType.name : undefined,
                loc: {lon: ctrl.longitude, lat: ctrl.latitude}
            };
            var errors = validateLocationForm(ctrl);
            console.log("ERRORS: ", errors);
            if(errors.length > 0) {
                ctrl.errors = errors;
            } else {
                LocationUpdateService.update(outlet.id, params)
                    .success(function() {
                        $state.transitionTo("locations.list");
                    })
                    .error(function(data, status) {
                        $scope.errors = data.errors;
                        if(status == 401) {
                            urlUtils.redirectHome();
                        }
                    });
            }
        }
        
        _.extend(ctrl, {
            districts: districts,
            locationTypes: locationTypes,
            district: district,
            locationType: locationType,
            outlet: outlet,
            name: outlet.name,
            longitude: "" + outlet.loc.lon,
            latitude: "" + outlet.loc.lat,
            submit: submit
        });
    }

    ng.module("location.edit", [])
        .factory("LocationUpdateService", ["$http", LocationUpdateService])
        .controller("LocationEditController", ["$scope", "$stateParams", "$state", "urlUtils", "LocationUpdateService", "outlet", LocationEditController]);
        

}(angular));
