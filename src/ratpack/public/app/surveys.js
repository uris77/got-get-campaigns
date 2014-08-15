var surveys = {
	apiUrls: {
		create: "/api/surveys",
		list: "/api/surveys",
		getById: function(id) { return "/api/surveys/" + id; }
	}
};

surveys.isYear = function(num) {
	return surveys.utils.isNumber(num) && (parseInt(num) > 2010 && parseInt(num) < 2030)
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


surveys.SurveyRepositoryService = function($http) {
	return {
		list: function() {
			return $http.get(surveys.apiUrls.list);
		},
		fetch: function(surveyId) {
			return $http.get(surveys.apiUrls.getById(surveyId));
		}
	}
};

surveys.SurveysListController = function($scope, SurveyRepositoryService) {
	SurveyRepositoryService.list()
		.success( function(data) {
			$scope.surveys = data;
		});
};

surveys.SurveyShowController = function($scope, $stateParams, SurveyRepositoryService) {
	$scope.locations = [
		{name: "Traditional", total: "21", surveyed: "0"},
		{name: "Non-Traditional", total: "10", surveyed: "0"},
		{name: "Hotspot", total: "11", surveyed: "0"}
	];

	SurveyRepositoryService.fetch($stateParams.id)
		.success( function(data) {
			$scope.survey = data.survey;
		})
		.error( function(data) {
			console.error("ERROR: ", data);
		});
};


angular.module("surveys.list", [])
	.factory("SurveyRepositoryService", surveys.SurveyRepositoryService)
	.controller("SurveysListController", surveys.SurveysListController)
	.controller("SurveyShowController", surveys.SurveyShowController);


surveys.CreateSurveyService = function($http) {
	return {
		create: function(params) {
			return $http.post(surveys.apiUrls.survey.create, params);
		}
	}
};


surveys.SurveysCreateController = function($scope, $state, CreateSurveyService) {
	var self = this;
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
			.error(function(data){
				$scope.errors = data.errors;
			});
		}
	};
};

angular.module("surveys.create", [])
	.factory("SurveysCreateController", surveys.SurveysCreateController)
	.controller("CreateSurveyService", surveys.CreateSurveyService);


angular.module("PasmoApp.surveys", ["surveys.list", "surveys.create"]);

