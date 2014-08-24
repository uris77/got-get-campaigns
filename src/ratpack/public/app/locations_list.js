( function (ng) {

	var apiUrls = {
		locations: {
			list: "/api/locations"
		}
	
	};

	function LocationListService ($http) {
		return {
			list: function() {
				return $http.get(apiUrls.locations.list);
			}
		};
	}

	function LocationListController ($scope, LocationListService) {
		LocationListService.list()
			.success(function (data) {
				$scope.locations = data;
			});
	}

	ng.module("locations.list", [])
		.factory("LocationListService", LocationListService)
		.controller("LocationListController", LocationListController);


}(angular));