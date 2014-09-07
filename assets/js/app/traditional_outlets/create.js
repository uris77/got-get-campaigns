( function (ng) {
    function CreateController($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
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
            .error(function(err, status) {
                console.error("ERROR: ", err);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.submit = function() {
            var params = {
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
            TraditionalOutletGatewayService.createTraditonalOutlet(params, $stateParams.id)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
                })
                .error(function(data, status) {
                    if(status == 401) {
                        urlUtils.redirectHome();
                    } else {
                        console.error("ERROR: ", data);
                    }
                })
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
        };
    }

    ng.module("TraditionalOutletSurvey.create", [])
        .controller("TraditionalOutletSurveyCreateController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", CreateController]);
        
}(angular));