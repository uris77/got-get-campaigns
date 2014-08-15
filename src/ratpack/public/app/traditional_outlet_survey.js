PasmoApp.Surveys = {
	TraditionalOutlet: {
		OutletGatewayService: function($http) {
			//Fetch all traditional outlets from server.
			return {
				fetchTraditionalOutlets: function() {
					return $http.get("/api/locations/byType/traditional");
				};
			};
			
		},
		CreateController: function($scope, OutletGatewayService) {
			$scope.condoms_available = false;
			$scope.lube_available = false;
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
				console.log("Condoms? ", $scope.condoms_available);
				console.log("Lube? ", $scope.lube_available);
			}
		}
	}
};




angular
	.module("PasmoApp")
	.factory("OutletGatewayService", PasmoApp.Surveys.TraditionalOutlet.OutletGatewayService)
	.controller("TraditionalOutletCreateController", PasmoApp.Surveys.TraditionalOutlet.CreateController);
	