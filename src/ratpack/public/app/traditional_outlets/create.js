( function (ng) {
    function CreateController($scope, $state, $stateParams, TraditionalOutletGatewayService) {
        TraditionalOutletGatewayService
            .fetchTraditionalOutlets()
            .success(function(data) {
                console.log("Got traditional outlets: ", data);
                $scope.locations = data;
                if(data.length == 0) {
                    $scope.noLocations = true;
                    console.log("No Locations: ", $scope.noLocations);
                }
            })
            .error(function(err) {
                console.error("ERROR: ", err);
            });

        $scope.submit = function() {
            var params = {
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
            TraditionalOutletGatewayService.createTraditonalOutlet(params, $stateParams.id)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
                });
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
        };
    }

    ng.module("TraditionalOutletSurvey.create", [])
        .controller("TraditionalOutletSurveyCreateController", CreateController);
        
}(angular));