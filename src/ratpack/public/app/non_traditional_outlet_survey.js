(function () {
	function GatewayService ($http) {
		return {
			fetchOutlets: function() {
				return $http.get("/api/locations/byType/non_traditional");
			},

			fetchSurveys: function(survey_id) {
				return $http.get("/api/surveys/" + survey_id + "/non_traditional_outlets");
			},

			createSurvey: function(survey_id, params) {
				return $http.post("/api/surveys/" + survey_id + "/non_traditional_outlets", params)
;			}
		};
	}

	function ListController ($scope, $state, $stateParams, GatewayService) {
		$scope.surveyId = $stateParams.id
		GatewayService.fetchSurveys($stateParams.id)
			.success(function(data){
				$scope.surveys = data;

				console.log("surveys: ", $scope.surveys);
			})
			.error(function(data) {
				console.error("Error retrieving surveys: ", data);
			});
	}

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

	function routes ($stateProvider) {
		$stateProvider
			.state("listNonTraditionalOutlets", {
				url: "/survyes/:id/non_traditional_outlet/list",
				templateUrl: "/surveys/non_traditional_outlets/list.html",
				controller: "ListController"
			})
			.state("createNonTraditionalOutlets", {
				url: "/surveys/:id/non_traditional_outlet/create",
				templateUrl: "/surveys/non_traditional_outlets/create_form.html",
				controller: "CreateController"
			});
	}

	angular
	.module("NonTraditionaOutletSurvey", ["ui.router"])
	.config(routes)
	.service("GatewayService", GatewayService)
	.controller("ListController", ListController)
	.controller("CreateController", CreateController);

}(angular))
