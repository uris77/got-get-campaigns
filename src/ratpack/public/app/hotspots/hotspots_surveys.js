( function (ng) {

    function routes($stateProvider) {
        $stateProvider
            .state("hotspotsList", {
                url: "/surveys/:id/hotspots/list",
                templateUrl: "/surveys/hotspots/list.html",
                controller: "ListController"
            });
    }
    
    ng.module("Hotspots", ["Hotspots.gateway", "Hotspots.list"])
        .config(routes);

}(angular));