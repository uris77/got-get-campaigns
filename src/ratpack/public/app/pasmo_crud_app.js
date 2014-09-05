var PasmoApp = { apiUrls: {} };

angular.module("PasmoApp", 
	["ui.router", "url_utils", "PasmoApp.surveys", "PasmoLocation",
    "TraditionaOutletSurvey","NonTraditionalOutletSurvey", "Hotspots"])
	.run(function($rootScope, $http, $state){
		console.info("Starting Pasmo App......");
	});