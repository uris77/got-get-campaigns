PasmoApp.locations = {
    root: {
        url: 'locations',
        templateUrl: "/locations/index.html"
    },
	list: {
		url: '/list',
		templateUrl: "/locations/list.html",
		controller: 'LocationListController'
	},
    create: {
        url: '/create',
        templateUrl: "/locations/create.html",
        controller: 'LocationCreateController'
    }
};



PasmoApp.routes = function($stateProvider) {
    $stateProvider
        .state("locations", PasmoApp.locations.root)
        .state("locations.list", PasmoApp.locations.list)
        .state("locations.create", PasmoApp.locations.create);
};

angular
	.module("PasmoApp")
	.config(PasmoApp.routes);	
