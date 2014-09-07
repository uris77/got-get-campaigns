(function (ng) {
	var surveys = {
		apiUrls: {
			create: "/api/surveys",
			list: "/api/surveys",
			getById: function(id) { return "/api/surveys/" + id; }
		}
	};

	surveys.isYear = function(num) {
		return utils.isNumber(num) && (parseInt(num) > 2010 && parseInt(num) < 2030)
	};

	surveys.validateSurveyForm = function(month, year) {
		var errors = [];
		if(!surveys.isYear(year)) {
			errors.push("Year: Provide a valid year! (E.g. 2014)");
		}
		if(_.isUndefined(month)) {
			errors.push("Month: Select a month.");
		}
		return errors;
	};

	function CreateSurveyService($http) {
		return {
			create: function(params) {
				return $http.post(surveys.apiUrls.create, params);
			}
		}
	}

	function SurveysCreateController($scope, $state, urlUtils, CreateSurveyService) {
		$scope.months = [
			{name: "January"}, {name: "February"}, {name: "March"}, {name: "April"},
			{name: "May"}, {name: "June"}, {name: "July"}, {name: "August"},
			{name: "September"}, {name: "October"}, {name: "November"}, {name: "December"}
		];

		$scope.submit = function() {
			var errors = surveys.validateSurveyForm($scope.month, $scope.year);
			if(errors.length > 0){
				$scope.errors = errors;
			}else{
				CreateSurveyService.create({month: $scope.month.name, year: $scope.year})
				.success(function() {
					$state.transitionTo("surveys.list");
				})
				.error(function(data, status){
					$scope.errors = data.errors;
					if(status == 401) {
						urlUtils.redirectHome();
					}
				});
			}
		};
	}

	function routes($stateProvider) {
		$stateProvider
			.state("surveysCreate", {
        		url: "/surveys/create",
		        templateUrl: "/surveys/create.html",
		        controller: "SurveysCreateController"
    		});
	}

	ng.module("surveys.create", [])
		.config(["$stateProvider", routes])
		.factory("CreateSurveyService", ["$http", CreateSurveyService])
		.controller("SurveysCreateController", ["$scope", "$state", "urlUtils", "CreateSurveyService", SurveysCreateController]);

}(angular));