PasmoApp.locations = {
    root: {
        url: 'locations',
        templateUrl: "locations/index.html"
    },
	list: {
		url: '/list',
		templateUrl: "locations/list.html",
		controller: 'LocationListController'
	},
    create: {
        url: '/create',
        templateUrl: "locations/create.html",
        controller: 'LocationCreateController'
    }
};

PasmoApp.surveysRoutes = {
    root: {
        url: 'surveys',
        templateUrl: 'surveys/index.html'
    },
    list: {
        url: '/list',
        templateUrl: 'surveys/list.html',
        controller: 'SurveysListController'
    },
    create: {
        url: "/create",
        templateUrl: "surveys/create.html",
        controller: "SurveysCreateController"
    },
    show: {
        url: "/:id",
        templateUrl: "surveys/show.html",
        controller: "SurveyShowController"
    },
    traditionalOutlet: {
        url: "/:id/traditional_outlet/create",
        templateUrl: "surveys/forms/traditional_outlet.html",
        controller: "TraditionalOutletCreateController"
    }
};


PasmoApp.routes = function($stateProvider) {
    $stateProvider
        .state("locations", PasmoApp.locations.root)
        .state("locations.list", PasmoApp.locations.list)
        .state("locations.create", PasmoApp.locations.create)
        .state("surveys", PasmoApp.surveysRoutes.root)
        .state("surveys.list", PasmoApp.surveysRoutes.list)
        .state("surveys.create", PasmoApp.surveysRoutes.create)
        .state("surveys.show", PasmoApp.surveysRoutes.show)
        .state("surveys.traditionalOutlet", PasmoApp.surveysRoutes.traditionalOutlet);
};

angular
	.module("PasmoApp")
	.config(PasmoApp.routes);	
