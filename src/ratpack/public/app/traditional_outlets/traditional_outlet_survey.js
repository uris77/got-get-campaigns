( function(ng) {
	function routes($stateProvider) {
		$stateProvider
			.state("surveys.traditionalOutlet", {
				url: "/:id/traditional_outlet/create",
    			templateUrl: "/surveys/traditional_outlets/create_form.html",
    			controller: "TraditionalOutletSurveyCreateController"
			})
			.state("surveys.listTraditionalOutlets", {
				url: "/:id/traditional_outlet/list",
				templateUrl: "/surveys/traditional_outlets/list.html",
				controller: "TraditionalOutletSurveyListController"
			});
	}


	ng.module("TraditionaOutletSurvey", 
		["TraditionalOutletSurvey.gatewayService", "TraditionalOutletSurvey.list", "TraditionalOutletSurvey.create"])
		.config(routes);
	
}(angular));
	