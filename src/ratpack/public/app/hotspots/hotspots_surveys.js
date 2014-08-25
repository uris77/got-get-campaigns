( function (ng) {

    function routes($stateProvider) {
        $stateProvider
            .state("hotspotsList", {
                url: "/surveys/:id/hotspots/list",
                templateUrl: "/surveys/hotspots/list.html",
                controller: "ListController"
            })
            .state("hotspotsCreate", {
                url: "/surveys/:id/hotspots/create",
                templateUrl: "/surveys/hotspots/create_form.html",
                controller: "CreateController"
            });
    }
    
    ng.module("Hotspots", ["Hotspots.gateway", "Hotspots.list", "Hotspots.create"])
        .config(routes);

}(angular));