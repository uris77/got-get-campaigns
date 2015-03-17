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
			}).
			state("editTraditionalOutlet", {
				url: "/:survey_id/traditional_outlet/:traditional_outlet_survey_id/edit",
				templateUrl: "/surveys/traditional_outlets/edit.html",
				controller: "TraditionalOutletSurveyEditController"
			});
	}


	ng.module("TraditionaOutletSurvey", 
		["TraditionalOutletSurvey.gatewayService", "TraditionalOutletSurvey.list", "TraditionalOutletSurvey.create",
		"TraditionalOutletSurvey.edit"])
		.config(["$stateProvider", routes]);
	
}(angular));
	
