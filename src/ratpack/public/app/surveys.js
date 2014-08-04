PasmoApp.apiUrls = {
	survey: {
		create: "/api/surveys",
		list: "/api/surveys"
	}
};

PasmoApp.isNumber = function(str) {
	return !_.isUndefined(str) && (!_.isEmpty(str.trim()) && _.isNumber(parseInt(str.trim())))
};

PasmoApp.isYear = function(num) {
	return PasmoApp.isNumber(num) && (parseInt(num) > 2010 && parseInt(num) < 2030)
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

PasmoApp.ListSurveyService = function($http) {
	var self = this;
	self.list = function() {
		return $http.get(PasmoApp.apiUrls.survey.list);
	};
};

PasmoApp.SurveysListController = function($scope, ListSurveyService) {
	console.log("Started List controller");
	ListSurveyService.list()
		.success( function(data) {
			$scope.surveys = data;
		});
};

PasmoApp.SurveysCreateController = function($scope, $state, CreateSurveyService) {
	var self = this;
	console.log("Started Create Controller");
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
				$state.transitionTo("surveys");
			})
			.error(function(data){
				$scope.errors = data.errors;
			});
		}
	};
};


angular
	.module("PasmoApp")
	.service("CreateSurveyService", PasmoApp.CreateSurveyService)
	.service("ListSurveyService", PasmoApp.ListSurveyService)
	.controller('SurveysListController', PasmoApp.SurveysListController)
	.controller('SurveysCreateController', PasmoApp.SurveysCreateController);
