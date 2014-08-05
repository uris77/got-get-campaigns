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

PasmoApp.TraditionalOutletsListController = function($scope, LocationListService) {
	console.log("Started controller");
	LocationListService.list()
		.success(function (data) {
			$scope.locations = data;
			console.log("locations: ", $scope.locations);
		});
};

PasmoApp.TraditionalOutletsCreateController = function($scope, $state, LocationCreateService) {
	console.log("Started Create Controller");
	var self = this;
	$scope.districts = [
		{name: 'Corozal'}, {name: 'Orangew Walk'}, {name: 'Belize'},
		{name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
	];

	$scope.submit = function () {
		var params = {
			name: $scope.name,
			district: $scope.district.name,
			loc: {lon: $scope.longitude, lat: $scope.latitude}
		};
		console.log("Params: ", params);
		LocationCreateService.create(params)
			.success(function() {
				$state.transitionTo("traditional_outlets.list")
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
	.controller('TraditionalOutletsListController', PasmoApp.TraditionalOutletsListController)
	.controller('TraditionalOutletsCreateController', PasmoApp.TraditionalOutletsCreateController);
