(function () {
	
	function routes ($stateProvider) {
		$stateProvider
			.state("listNonTraditionalOutlets", {
				url: "/survyes/:id/non_traditional_outlet/list",
				templateUrl: "/surveys/non_traditional_outlets/list.html",
				controller: "ListController"
			})
			.state("createNonTraditionalOutlets", {
				url: "/surveys/:id/non_traditional_outlet/create",
				templateUrl: "/surveys/non_traditional_outlets/create_form.html",
				controller: "CreateController"
			});
	}

	angular
	.module("NonTraditionaOutletSurvey",
		["NonTraditionalOutletSurvey.gatewayService", "NonTraditionalOutletSurvey.list", "NonTraditionalOutletSurvey.create"])
	.config(routes);
	
}(angular))
