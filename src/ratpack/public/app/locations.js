PasmoLocation = {
	apiUrls: {
		locations: {
			create: "/api/locations",
			list: "/api/locations"
		}
	}
};

PasmoLocation.validateLocationForm = function(params) {
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

PasmoLocation.LocationCreateService = function($http) {
	var self = this;
	return {
		create: function(params) {
			return $http.post(PasmoLocation.apiUrls.locations.create, params);
		}
	};	
};


PasmoLocation.LocationCreateController = function($scope, $state, LocationCreateService) {
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
		var errors = PasmoLocation.validateLocationForm(params);
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

angular.module("PasmoLocation.create", [])
	.controller("LocationCreateController", PasmoLocation.LocationCreateController)
	.factory("LocationCreateService", PasmoLocation.LocationCreateService);


PasmoLocation.LocationListService = function($http) {
	return {
		list: function() {
			return $http.get(PasmoLocation.apiUrls.locations.list);
		}
	};
};

PasmoLocation.LocationListController = function($scope, LocationListService) {
	LocationListService.list()
		.success(function (data) {
			$scope.locations = data;
		});
};

angular.module("PasmoLocation.list", [])
	.factory("LocationListService", PasmoLocation.LocationListService)
	.controller("LocationListController", PasmoLocation.LocationListController);


angular
	.module("PasmoLocation", ["PasmoLocation.create", "PasmoLocation.list"]);
