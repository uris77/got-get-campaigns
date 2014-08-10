PasmoApp.apiUrls.survey = {
		create: "/api/surveys",
		list: "/api/surveys",
		getById: function(id) { return "/api/surveys/" + id; }
};

PasmoApp.isYear = function(num) {
	return PasmoApp.utils.isNumber(num) && (parseInt(num) > 2010 && parseInt(num) < 2030)
};

PasmoApp.validateSurveyForm = function(month, year) {
	var errors = [];
	if(!PasmoApp.isYear(year)) {
		errors.push("Year: Provide a valid year! (E.g. 2014)");
	}
	if(_.isUndefined(month)) {
		errors.push("Month: Select a month.");
	}
	return errors;
};

PasmoApp.CreateSurveyService = function($http) {
	var self = this;
	self.create = function(params) {
		return $http.post(PasmoApp.apiUrls.survey.create, params);
	};
};

PasmoApp.SurveyRepositoryService = function($http) {
	var self = this;
	self.list = function() {
		return $http.get(PasmoApp.apiUrls.survey.list);
	};

	self.fetch = function(surveyId) {
		return $http.get(PasmoApp.apiUrls.survey.getById(surveyId));
	};
};

PasmoApp.SurveysListController = function($scope, SurveyRepositoryService) {
	SurveyRepositoryService.list()
		.success( function(data) {
			$scope.surveys = data;
		});
};

PasmoApp.SurveysCreateController = function($scope, $state, CreateSurveyService) {
	var self = this;
	$scope.months = [
		{name: "January"}, {name: "February"}, {name: "March"}, {name: "April"},
		{name: "May"}, {name: "June"}, {name: "July"}, {name: "August"},
		{name: "September"}, {name: "October"}, {name: "November"}, {name: "December"}
	];

	$scope.submit = function() {
		var errors = PasmoApp.validateSurveyForm($scope.month, $scope.year);
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

PasmoApp.SurveyShowController = function($scope, $stateParams, SurveyRepositoryService) {
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


angular
	.module("PasmoApp")
	.service("CreateSurveyService", PasmoApp.CreateSurveyService)
	.service("SurveyRepositoryService", PasmoApp.SurveyRepositoryService)
	.controller('SurveysListController', PasmoApp.SurveysListController)
	.controller('SurveysCreateController', PasmoApp.SurveysCreateController)
	.controller("SurveyShowController", PasmoApp.SurveyShowController);
