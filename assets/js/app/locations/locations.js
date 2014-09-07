( function (ng) {

    function router($stateProvider) {
        $stateProvider
            .state("locations", {
                url: 'locations',
                templateUrl: "/locations/index.html"
            })
            .state("locations.list", {
                url: "/list",
                templateUrl: "/locations/list.html",
                controller: "LocationListController"
            })
            .state("locations.create", {
                url: '/create',
                templateUrl: "/locations/create.html",
                controller: 'LocationCreateController'
            })
            .state("locations.summary", {
                url: "/:locationId/summary",
                templateUrl: "/locations/surveys_summary.html",
                controller: "LocationDetailsController"
            });
    }

    ng.module("PasmoLocation", ["location.create", "locations.list", "locations.details"])
        .config(["$stateProvider", router]);

}(angular)); 
