( function (ng) {

    function CreateController ($scope, $state, $stateParams, GatewayService) {
        GatewayService.fetchOutlets()
            .success(function(data) {
                $scope.locations = data;
                if($scope.locations.length == 0) {
                    $scope.noLocatons = true;
                }
            })
            .error(function(data) {
                console.error("Error retreiving outlets: ", data);
            });

        $scope.cancel = function() {
            $state.transitionTo("hotspotsList", {id: $stateParams.id});
        };

        $scope.submit = function() {
            $scope.errors = [];
            if(!$scope.location) {
                $scope.errors = ["Please chose a location!"];
            }

            if($scope.errors.length == 0) {
                var params = {
                    outreach: $scope.outreach,
                    targetPopulations: $scope.target_populations,
                    condomsAvailable: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                    lubesAvailable: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
                    gigi: _.isBoolean($scope.gigi) ? $scope.gigi : false,
                    location: {
                        id: $scope.location.id,
                        name: $scope.location.name,
                        district: $scope.location.district,
                        loc: $scope.location.loc
                    }
                };
                GatewayService.createSurvey($stateParams.id, params)
                    .success( function(data){
                        $state.transitionTo("hotspotsList", {id: $stateParams.id});
                    })
                    .error( function(error) {
                        console.error("ERROR: ", error);
                        alert("An error occurred!");
                    });
            }
        };
    }

    ng.module("Hotspots.create", [])
        .controller("CreateController", CreateController);

}(angular));