( function (ng) {

    function router($stateProvider) {
        $stateProvider
            .state("locations", {
                url: 'locations',
                templateUrl: "/locations/index.html"
            })
            .state("locations.list", {
                url: "locations.list",
                templateUrl: "/locations/list.html",
                controller: "LocationListController"
            })
            .state("locations.create", {
                url: '/create',
                templateUrl: "/locations/create.html",
                controller: 'LocationCreateController'
            });
    }

    ng.module("PasmoLocation", ["location.create", "locations.list"])
        .config(router);

}(angular)); 
