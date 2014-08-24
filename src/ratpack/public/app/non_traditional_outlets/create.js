( function (ng) {

    function CreateController ($scope, $state, $stateParams, GatewayService) {
        $scope.outlet_types = [
            {name: "Restaurant"}, {name: "Pharmacy"}
        ];

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
            $state.transitionTo("listNonTraditionalOutlets", {id: $stateParams.id})
        };

        $scope.submit = function() {
            $scope.errors = [];
            if(!$scope.location) {
                $scope.errors = ["Please chose a location!"];
            }

            if(!$scope.outlet_type) {
                $scope.errors.push("Please select an outlet type!");
            }

            if($scope.errors.length == 0) {
                var params = {
                    outreach: $scope.outreach,
                    outlet_type: $scope.outlet_type,
                    target_populations: $scope.target_populations,
                    condoms_available: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                    lubes_available: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
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
                        $state.transitionTo("listNonTraditionalOutlets", {id: $stateParams.id});
                    })
                    .error( function(error) {
                        console.error("ERROR: ", error);
                        alert("An error occurred!");
                    });
            }
        };
    }

    ng.module("NonTraditionalOutletSurvey.create", [])
        .controller("CreateController", CreateController);

}(angular));