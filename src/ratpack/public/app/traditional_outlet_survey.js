PasmoApp.Surveys = {
	TraditionalOutlet: {
		OutletGatewayService: function($http) {
			//Fetch all traditional outlets from server.
			return {
				fetchTraditionalOutlets: function() {
					return $http.get("/api/locations/byType/traditional");
				},
				createTraditonalOutlet: function(params, survey_id) {
					return $http.post("/api/surveys/" + survey_id + "/traditional_outlets", params);
				}
			};
			
		},
		CreateController: function($scope, $state, $stateParams, OutletGatewayService) {
			$scope.condoms_available = false;
			$scope.lube_available = false;
			$scope.gigi = false;
			OutletGatewayService
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
					condoms: $scope.condoms_available,
					lube: $scope.lube_available,
					gigi: $scope.gigi,
					location: {
						id: $scope.location.id,
						name: $scope.location.name,
						district: $scope.location.district,
						loc: $scope.location.loc
					}
				}
				OutletGatewayService.createTraditonalOutlet(params, $stateParams.id)
					.success(function(data) {
						$state.transitionTo("surveys.show", {id: $stateParams.id});
					});
			};

			$scope.cancel = function() {
				$state.transitionTo("surveys.show", {id: $stateParams.id});
			};
		},
		routes: function($stateProvider) {
			$stateProvider
				.state("surveys.traditionalOutlet", {
					url: "/:id/traditional_outlet/create",
        			templateUrl: "/surveys/traditional_outlets/create_form.html",
        			controller: "TraditionalOutletCreateController"
				});
		}
	}
};



angular
	.module("TraditionaOutletSurvey", ["ui.router"])
	.config(PasmoApp.Surveys.TraditionalOutlet.routes)
	.factory("OutletGatewayService", PasmoApp.Surveys.TraditionalOutlet.OutletGatewayService)
	.controller("TraditionalOutletCreateController", PasmoApp.Surveys.TraditionalOutlet.CreateController);
	