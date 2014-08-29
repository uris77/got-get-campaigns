(function () {
	
	function routes ($stateProvider) {
		$stateProvider
			.state("listNonTraditionalOutlets", {
				url: "/surveys/:id/non_traditional_outlet/list",
				templateUrl: "/surveys/non_traditional_outlets/list.html",
				controller: "NonTraditionalOutletSurveyListController"
			})
			.state("createNonTraditionalOutlets", {
				url: "/surveys/:id/non_traditional_outlet/create",
				templateUrl: "/surveys/non_traditional_outlets/create_form.html",
				controller: "NonTraditionalOutletSurveyCreateController"
			});
	}

	angular
	.module("NonTraditionalOutletSurvey",
		["NonTraditionalOutletSurvey.gatewayService", "NonTraditionalOutletSurvey.list",
		"NonTraditionalOutletSurvey.create", "NonTraditionalOutletSurvey.edit"])
	.config(routes);
	
}(angular))
