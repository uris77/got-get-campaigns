PasmoApp.apiUrls.locations = {
	create: "/api/locations",
	list: "/api/locations"
}

PasmoApp.LocationCreateService = function($http) {
	var self = this;
	self.create = function(params) {
		return $http.post(PasmoApp.apiUrls.locations.create, params);
	};
};

PasmoApp.LocationListService = function($http) {
	var self = this;
	self.list = function() {
		return $http.get(PasmoApp.apiUrls.locations.list);
	};
};

PasmoApp.LocationListController = function($scope, LocationListService) {
	LocationListService.list()
		.success(function (data) {
			$scope.locations = data;
		});
};

PasmoApp.LocationCreateController = function($scope, $state, LocationCreateService) {
	var self = this;
	$scope.districts = [
		{name: 'Corozal'}, {name: 'Orange Walk'}, {name: 'Belize'},
		{name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
	];

	$scope.typesOfOutlets = [
		{name: "Traditional"},
		{name: "Non-Traditional"},
		{name: "Hotspot"}
	];

	$scope.submit = function () {
		var params = {
			name: $scope.name,
			district: $scope.district.name,
			typeOfOutlet: $scope.typeOfOutlet.name,
			loc: {lon: $scope.longitude, lat: $scope.latitude}
		};
		LocationCreateService.create(params)
			.success(function() {
				$state.transitionTo("locations.list")
			})
			.error(function(data) {
				$scope.errors = data.errors;
			});
	};
};

angular
	.module("PasmoApp")
	.service("LocationCreateService", PasmoApp.LocationCreateService)
	.service("LocationListService", PasmoApp.LocationListService)
	.controller('LocationListController', PasmoApp.LocationListController)
	.controller('LocationCreateController', PasmoApp.LocationCreateController);
