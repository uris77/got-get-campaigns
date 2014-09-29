var PasmoApp = { apiUrls: {} };

angular.module("PasmoApp",
	[
        "ui.router", "url_utils", "OutletSurveyService",
        "surveys", "PasmoLocation","TraditionaOutletSurvey",
        "NonTraditionalOutletSurvey", "Hotspots"
    ])
	.run(["$rootScope", "$http", "$state", function($rootScope, $http, $state){
		console.info("Starting Pasmo App......");
	}]);