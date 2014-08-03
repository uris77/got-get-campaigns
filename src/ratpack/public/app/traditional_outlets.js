PasmoApp.TraditionalOutletsListController = function($scope) {
	console.log("Started controller");
};

PasmoApp.TraditionalOutletsCreateController = function($scope) {
	console.log("Started Create Controller");
};

angular
	.module("PasmoApp")
	.controller('TraditionalOutletsListController', PasmoApp.TraditionalOutletsListController)
	.controller('TraditionalOutletsCreateController', PasmoApp.TraditionalOutletsCreateController);