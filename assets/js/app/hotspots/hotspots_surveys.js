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
            }).
            state("hotspotsEdit", {
                url: "/surveys/:survey_id/hotspots/:hotspot_survey_id/edit",
                templateUrl: "/surveys/hotspots/edit.html",
                controller: "HotspotSurveyEditController"
            });
    }
    
    ng.module("Hotspots", ["Hotspots.gateway", "Hotspots.list", "Hotspots.create", "Hotspots.edit"])
        .config(["$stateProvider", routes]);

}(angular));