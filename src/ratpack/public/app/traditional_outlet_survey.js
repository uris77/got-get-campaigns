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
				},
				fetchTraditionalOutletsSurvey: function(survey_id) {
					return $http.get("/api/surveys/" + survey_id + "/traditional_outlets");
				}
			};
			
		},
		CreateController: function($scope, $state, $stateParams, OutletGatewayService) {
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
				OutletGatewayService.createTraditonalOutlet(params, $stateParams.id)
					.success(function(data) {
						$state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
					});
			};

			$scope.cancel = function() {
				$state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
			};
		},
		routes: function($stateProvider) {
			$stateProvider
				.state("surveys.traditionalOutlet", {
					url: "/:id/traditional_outlet/create",
        			templateUrl: "/surveys/traditional_outlets/create_form.html",
        			controller: "TraditionalOutletCreateController"
				})
				.state("surveys.listTraditionalOutlets", {
					url: "/:id/traditional_outlet/list",
					templateUrl: "/surveys/traditional_outlets/list.html",
					controller: "TraditionalOutletListController"
				});
		},

		ListController: function($scope, $state, $stateParams, OutletGatewayService) {
			$scope.id = $stateParams.id;
			OutletGatewayService.fetchTraditionalOutletsSurvey($stateParams.id)
				.success(function(data) {
					$scope.surveys = data;
					console.log("Surveys: ", $scope.surveys);
				})
				.error(function(data) {
					console.error("ERROR: ", data);
				});
		}
	}
};



angular
	.module("TraditionaOutletSurvey", ["ui.router"])
	.config(PasmoApp.Surveys.TraditionalOutlet.routes)
	.factory("OutletGatewayService", PasmoApp.Surveys.TraditionalOutlet.OutletGatewayService)
	.controller("TraditionalOutletCreateController", PasmoApp.Surveys.TraditionalOutlet.CreateController)
	.controller("TraditionalOutletListController", PasmoApp.Surveys.TraditionalOutlet.ListController);
	