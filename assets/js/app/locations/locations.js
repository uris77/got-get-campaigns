(function (ng) {

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
            .state("locations.edit", {
                url: '/edit/:locationId',
                templateUrl: '/locations/edit.html',
                controller: "LocationEditController",
                controllerAs: "ctrl",
                resolve: {
                    outlet: ["$stateParams", "LocationUpdateService", function locationResolver($stateParams, LocationUpdateService){
                        return LocationUpdateService.fetch($stateParams.locationId)
                            .then(function fetchLocation(obj) {
                                var outlet =  obj.data.location;
                                outlet.loc.lat = outlet.loc.coordinates[1];
                                outlet.loc.lon = outlet.loc.coordinates[0];
                                return outlet;
                             });
                        }]
                    }               
            })
            .state("locations.summary", {
                url: "/:locationId/summary",
                templateUrl: "/locations/surveys_summary.html",
                controller: "LocationDetailsController"
            });
    }

    ng.module("PasmoLocation", ["location.create", "locations.list", "locations.details", "location.edit"])
        .config(["$stateProvider", router]);

}(angular)); 
