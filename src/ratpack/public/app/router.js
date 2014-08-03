PasmoApp.traditionalOutlets = {
    root: {
        url: 'traditional_outlets',
        templateUrl: "traditional_outlets/index.html"
    },
	list: {
		url: '/list',
		templateUrl: "traditional_outlets/list.html",
		controller: 'TraditionalOutletsListController'
	},
    create: {
        url: '/create',
        templateUrl: "traditional_outlets/create.html",
        controller: 'TraditionalOutletsCreateController'
    }
};

PasmoApp.surveysRoutes = {
    root: {
        url: 'surveys',
        templateUrl: 'surveys/index.html',
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
    }
};

PasmoApp.routes = function($stateProvider) {
    $stateProvider
        .state("traditional_outlets", PasmoApp.traditionalOutlets.root)
        .state("traditional_outlets.list", PasmoApp.traditionalOutlets.list)
        .state("traditional_outlets.create", PasmoApp.traditionalOutlets.create)
        .state("surveys", PasmoApp.surveysRoutes.root)
        .state("surveys.list", PasmoApp.surveysRoutes.list)
        .state("surveys.create", PasmoApp.surveysRoutes.create);
};

angular
	.module("PasmoApp")
	.config(PasmoApp.routes);	