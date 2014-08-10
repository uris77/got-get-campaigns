PasmoApp.apiUrls.locations = {
	create: "/api/locations",
	list: "/api/locations"
};

PasmoApp.validateLocationForm = function(params) {
	var errors = [];
	if(_.isUndefined(params.name) || _.isEmpty(params.name.trim())) {
		errors.push("Name: provide a name for the location.");
	}

	if(_.isUndefined(params.district)) {
		errors.push("District: select a district.");
	}

	if(_.isUndefined(params.locationType)) {
		errors.push("Type of location: select what type of outlet this location is.");
	}

	if(_.isUndefined(params.loc)) {
		errors.push("Latitude: specify the latitude.");
		errors.push("Longitude: specify the longitude.");
	} else {
		if(_.isUndefined(params.loc.lon) || !PasmoApp.utils.isNumber(params.loc.lon)) {
			errors.push("Longitude: specify a valid longitude");
		}
		if(_.isUndefined(params.loc.lat) || !PasmoApp.utils.isNumber(params.loc.lat)) {
			errors.push("Latitude: specify a valid latitude.");
		}
	}
	return errors;
};

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

	$scope.locationTypes = [
		{name: "Traditional"},
		{name: "Non-Traditional"},
		{name: "Hotspot"}
	];

	$scope.submit = function () {
		var params = {
			name: $scope.name,
			district: $scope.district ? $scope.district.name : undefined,
			locationType: $scope.locationType ? $scope.locationType.name : undefined,
			loc: {lon: $scope.longitude, lat: $scope.latitude}
		};
		var errors = PasmoApp.validateLocationForm(params);
		if(errors.length > 0) {
			$scope.errors = errors;
		} else {
			LocationCreateService.create(params)
			.success(function() {
				$state.transitionTo("locations.list")
			})
			.error(function(data) {
				$scope.errors = data.errors;
			});
		}	
	};
};

angular
	.module("PasmoApp")
	.service("LocationCreateService", PasmoApp.LocationCreateService)
	.service("LocationListService", PasmoApp.LocationListService)
	.controller('LocationListController', PasmoApp.LocationListController)
	.controller('LocationCreateController', PasmoApp.LocationCreateController);
