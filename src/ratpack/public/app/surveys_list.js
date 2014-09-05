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

	function SurveysListController ($scope, urlUtils, SurveyRepositoryService) {
		SurveyRepositoryService.list()
			.success( function(data) {
				$scope.surveys = data;
			})
			.error( function(error, status, headers) {
				if(status == 401) {
					urlUtils.redirectHome();	
				}
				console.error("ERROR: ", error);
			});
	}

	function SurveyShowController ($scope, $stateParams, urlUtils, SurveyRepositoryService) {
		SurveyRepositoryService.fetch($stateParams.id)
			.success( function(data) {
				$scope.survey = data.survey;
				$scope.locations = data.locations;
			})
			.error( function(data, status, headers) {
				console.error("ERROR: ", data);
				if(status == 401) {
					urlUtils.redirectHome();
				}
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


	ng.module("surveys.list", [])
		.config(routes)
		.factory("SurveyRepositoryService", SurveyRepositoryService)
		.controller("SurveysListController", SurveysListController)
		.controller("SurveyShowController", SurveyShowController);

}(angular));