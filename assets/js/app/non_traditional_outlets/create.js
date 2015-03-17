( function (ng) {

    function CreateController ($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.outlet_types = [
            {name: "Restaurant"}, {name: "Barber Shop"}, {name: "Other"}
        ];

        NonTraditionalSurveyGatewayService.fetchOutlets()
            .success(function(data) {
                $scope.locations = data;
                if($scope.locations.length == 0) {
                    $scope.noLocatons = true;
                }
            })
            .error(function(data, status) {
                console.error("Error retreiving outlets: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
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
                    outletType: "non-traditional",
                    locationType: $scope.outlet_type.name,
                    targetPopulations: $scope.target_populations,
                    condomsAvailable: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                    lubesAvailable: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
                    gigi: _.isBoolean($scope.gigi) ? $scope.gigi : false,
                    location: {
                        id: $scope.location.id,
                        name: $scope.location.name,
                        district: $scope.location.district,
                        loc: $scope.location.loc
                    },
                    notes: $scope.notes
                };
                NonTraditionalSurveyGatewayService.createSurvey($stateParams.id, params)
                    .success( function(data){
                        $state.transitionTo("listNonTraditionalOutlets", {id: $stateParams.id});
                    })
                    .error( function(error, status) {
                        if(status == 401) {
                            urlUtils.redirectHome();
                        } else {
                            console.error("ERROR: ", error);
                            alert("An error occurred!");
                        }
                    });
            }
        };
    }

    ng.module("NonTraditionalOutletSurvey.create", [])
        .controller("NonTraditionalOutletSurveyCreateController", ["$scope", "$state", "$stateParams", "urlUtils", "NonTraditionalSurveyGatewayService", CreateController]);

}(angular));
