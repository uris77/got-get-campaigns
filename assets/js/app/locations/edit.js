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
                return $http.update("/api/locations/" + locationId, params);
            },
            fetch: function(locationId) {
                return $http.get("/api/locations/" + locationId);
            }
        };  
    }

    function submit() {
        console.log("Submitting: ", this);
        var params = {
            name: this.outlet.name,
            district: this.district ? this.district.name : undefined,
            locationType: this.locationType ? this.locationType.name : undefined,
            loc: {lon: this.longitude, lat: this.latitude}
        };
        var errors = validateLocationForm(this);
        console.log("ERRORS: ", errors);
        if(errors.length > 0) {
            this.errors = errors;
        } else {
            console.log("UPDATE location with params: ", params);
        }
    }

    function LocationEditController ($scope, $stateParams, urlUtils, LocationUpdateService, outlet) {
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

        // $scope.submit = function () {
        //     var params = {
        //         name: $scope.name,
        //         district: $scope.district ? $scope.district.name : undefined,
        //         locationType: $scope.locationType ? $scope.locationType.name : undefined,
        //         loc: {lon: $scope.longitude, lat: $scope.latitude}
        //     };
        //     var errors = validateLocationForm(params);
        //     if(errors.length > 0) {
        //         $scope.errors = errors;
        //     } else {
        //         LocationCreateService.create(params)
        //         .success(function() {
        //             $state.transitionTo("locations.list")
        //         })
        //         .error(function(data, status) {
        //             $scope.errors = data.errors;
        //             if(status == 401) {
        //                 urlUtils.redirectHome();
        //             }
        //         });
        //     }   
        // };
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
        console.log("Controller: ", ctrl);


    }

    ng.module("location.edit", [])
        .factory("LocationUpdateService", ["$http", LocationUpdateService])
        .controller("LocationEditController", ["$scope", "$stateParams", "urlUtils", "LocationUpdateService", "outlet", LocationEditController]);
        

}(angular));