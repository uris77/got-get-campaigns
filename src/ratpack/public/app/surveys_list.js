( function (ng) {
	var surveys = {
		apiUrls: {
			create: "/api/surveys",
			list: "/api/surveys",
			getById: function(id) { return "/api/surveys/" + id; }
		}
	};

	function SurveyRepositoryService ($http) {
		return {
			list: function() {
				return $http.get(surveys.apiUrls.list);
			},
			fetch: function(surveyId) {
				return $http.get(surveys.apiUrls.getById(surveyId));
			}
		}
	}

	function SurveysListController ($scope, SurveyRepositoryService) {
		SurveyRepositoryService.list()
			.success( function(data) {
				$scope.surveys = data;
			});
	}

	function SurveyShowController ($scope, $stateParams, SurveyRepositoryService) {
		$scope.locations = [
			{name: "Traditional", total: "21", surveyed: "0"},
			{name: "Non-Traditional", total: "10", surveyed: "0"},
			{name: "Hotspot", total: "11", surveyed: "0"}
		];

		SurveyRepositoryService.fetch($stateParams.id)
			.success( function(data) {
				$scope.survey = data.survey;
				$scope.locations = data.locations;
			})
			.error( function(data) {
				console.error("ERROR: ", data);
			});
	}

	function routes($stateProvider) {
		$stateProvider
			.state("surveys", {
				url: 'surveys',
				templateUrl: '/surveys/index.html'
			})
			.state("surveys.list", {
		        url: '/list',
		        templateUrl: '/surveys/list.html',
		        controller: 'SurveysListController'
    		})
    		.state("surveys.show", {
		        url: "/:id",
		        templateUrl: "/surveys/show.html",
		        controller: "SurveyShowController"
		    })
	}


	ng.module("surveys.list", ["ui.router"])
		.config(routes)
		.factory("SurveyRepositoryService", SurveyRepositoryService)
		.controller("SurveysListController", SurveysListController)
		.controller("SurveyShowController", SurveyShowController);

}(angular));