var PasmoApp = { apiUrls: {} };

angular.module("PasmoApp", 
	["ui.router", "PasmoApp.surveys", "PasmoLocation",
    "TraditionaOutletSurvey","NonTraditionaOutletSurvey", "Hotspots"])
	.run(function($rootScope, $http, $state){
		console.info("Starting Pasmo App......");
	});