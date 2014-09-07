( function(ng) {
    function urlUtils($window, $location) {
        return {
            redirectHome: function() {
                        $window.location.href = "http://" + $location.host()  + ":" + $location.port();
            }
        };
    }

    ng.module("url_utils", [])
        .factory("urlUtils", ["$window", "$location", urlUtils]);

}(angular));
utils = {
	isNumber: function(str) {
		var parsedInt = parseInt(str.trim());
		return !_.isUndefined(str) && (!_.isEmpty(str.trim())) && ((parsedInt > 0) || (parsedInt < 0)) && _.isNumber(parsedInt);
	}
};
( function (ng) {
	var surveys = {
		apiUrls: {
			create: "/api/surveys",
			list: "/api/surveys",
			getById: function(id) { return "/api/surveys/" + id; }
		}
	};

	function SurveyRepositoryService ($http) {
		return {
			list: function() {
				return $http.get(surveys.apiUrls.list);
			},
			fetch: function(surveyId) {
				return $http.get(surveys.apiUrls.getById(surveyId));
			}
		}
	}

	function SurveysListController ($scope, urlUtils, SurveyRepositoryService) {
		SurveyRepositoryService.list()
			.success( function(data) {
				$scope.surveys = data;
			})
			.error( function(error, status, headers) {
				if(status == 401) {
					urlUtils.redirectHome();	
				}
				console.error("ERROR: ", error);
			});
	}

	function SurveyShowController ($scope, $stateParams, urlUtils, SurveyRepositoryService) {
		SurveyRepositoryService.fetch($stateParams.id)
			.success( function(data) {
				$scope.survey = data.survey;
				$scope.locations = data.locations;
			})
			.error( function(data, status, headers) {
				console.error("ERROR: ", data);
				if(status == 401) {
					urlUtils.redirectHome();
				}
			});
	}

	function routes($stateProvider) {
		$stateProvider
			.state("surveys", {
				url: 'surveys',
				templateUrl: '/surveys/index.html'
			})
			.state("surveys.list", {
		        url: '/list',
		        templateUrl: '/surveys/list.html',
		        controller: 'SurveysListController'
    		})
    		.state("surveys.show", {
		        url: "/:id",
		        templateUrl: "/surveys/show.html",
		        controller: "SurveyShowController"
		    })
	}


	ng.module("surveys.list", [])
		.config(["$stateProvider", routes])
		.factory("SurveyRepositoryService", ["$http", SurveyRepositoryService])
		.controller("SurveysListController", ["$scope", "urlUtils", "SurveyRepositoryService", SurveysListController])
		.controller("SurveyShowController", ["$scope", "$stateParams", "urlUtils", "SurveyRepositoryService", SurveyShowController]);

}(angular));
(function (ng) {
	var surveys = {
		apiUrls: {
			create: "/api/surveys",
			list: "/api/surveys",
			getById: function(id) { return "/api/surveys/" + id; }
		}
	};

	surveys.isYear = function(num) {
		return utils.isNumber(num) && (parseInt(num) > 2010 && parseInt(num) < 2030)
	};

	surveys.validateSurveyForm = function(month, year) {
		var errors = [];
		if(!surveys.isYear(year)) {
			errors.push("Year: Provide a valid year! (E.g. 2014)");
		}
		if(_.isUndefined(month)) {
			errors.push("Month: Select a month.");
		}
		return errors;
	};

	function CreateSurveyService($http) {
		return {
			create: function(params) {
				return $http.post(surveys.apiUrls.create, params);
			}
		}
	}

	function SurveysCreateController($scope, $state, urlUtils, CreateSurveyService) {
		$scope.months = [
			{name: "January"}, {name: "February"}, {name: "March"}, {name: "April"},
			{name: "May"}, {name: "June"}, {name: "July"}, {name: "August"},
			{name: "September"}, {name: "October"}, {name: "November"}, {name: "December"}
		];

		$scope.submit = function() {
			var errors = surveys.validateSurveyForm($scope.month, $scope.year);
			if(errors.length > 0){
				$scope.errors = errors;
			}else{
				CreateSurveyService.create({month: $scope.month.name, year: $scope.year})
				.success(function() {
					$state.transitionTo("surveys.list");
				})
				.error(function(data, status){
					$scope.errors = data.errors;
					if(status == 401) {
						urlUtils.redirectHome();
					}
				});
			}
		};
	}

	function routes($stateProvider) {
		$stateProvider
			.state("surveysCreate", {
        		url: "/surveys/create",
		        templateUrl: "/surveys/create.html",
		        controller: "SurveysCreateController"
    		});
	}

	ng.module("surveys.create", [])
		.config(["$stateProvider", routes])
		.factory("CreateSurveyService", ["$http", CreateSurveyService])
		.controller("SurveysCreateController", ["$scope", "$state", "urlUtils", "CreateSurveyService", SurveysCreateController]);

}(angular));
( function (ng) {
	angular.module("surveys", ["surveys.list", "surveys.create"]);
}(angular));


( function (ng) {

    var apiUrls = {
        locations: {
            create: "/api/locations"
        }
    };

    function validateLocationForm (params) {
        var errors = [];
        if(_.isUndefined(params.name) || _.isEmpty(params.name.trim())) {
            errors.push("Name: provide a name for the location.");
        }

        if(_.isUndefined(params.district)) {
            errors.push("District: select a district.");
        }

        if(_.isUndefined(params.locationType)) {
            errors.push("Type of location: select what type of outlet this location is.");
        }

        if(_.isUndefined(params.loc)) {
            errors.push("Latitude: specify the latitude.");
            errors.push("Longitude: specify the longitude.");
        } else {
            if(_.isUndefined(params.loc.lon) || !utils.isNumber(params.loc.lon)) {
                errors.push("Longitude: specify a valid longitude");
            }
            if(_.isUndefined(params.loc.lat) || !utils.isNumber(params.loc.lat)) {
                errors.push("Latitude: specify a valid latitude.");
            }
        }
        return errors;
    }

    function LocationCreateService ($http) {
        var self = this;
        return {
            create: function(params) {
                return $http.post(apiUrls.locations.create, params);
            }
        };  
    }

    function LocationCreateController ($scope, $state, urlUtils, LocationCreateService) {
        $scope.districts = [
            {name: 'Corozal'}, {name: 'Orange Walk'}, {name: 'Belize'},
            {name: 'Cayo'}, {name: 'Stann Creek'}, {name: 'Toledo'}
        ];

        $scope.locationTypes = [
            {name: "Traditional"},
            {name: "Non-Traditional"},
            {name: "Hotspot"}
        ];

        $scope.submit = function () {
            var params = {
                name: $scope.name,
                district: $scope.district ? $scope.district.name : undefined,
                locationType: $scope.locationType ? $scope.locationType.name : undefined,
                loc: {lon: $scope.longitude, lat: $scope.latitude}
            };
            var errors = validateLocationForm(params);
            if(errors.length > 0) {
                $scope.errors = errors;
            } else {
                LocationCreateService.create(params)
                .success(function() {
                    $state.transitionTo("locations.list")
                })
                .error(function(data, status) {
                    $scope.errors = data.errors;
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
            }   
        };
    }

    ng.module("location.create", [])
        .factory("LocationCreateService", ["$http", LocationCreateService])
        .controller("LocationCreateController", ["$scope", "$state", "urlUtils", "LocationCreateService", LocationCreateController]);
        
}(angular));
( function (ng) {

    var apiUrls = {
        locations: {
            list: "/api/locations"
        }    
    };

    function LocationListService ($http) {
        return {
            list: function() {
                return $http.get(apiUrls.locations.list);
            },
            search: function(locationName) {
                return $http.get(apiUrls.locations.list + "/search?locationName="+locationName);
            }
        };
    }

    function LocationListController ($scope, urlUtils, LocationListService) {
        LocationListService.list()
            .success(function (data) {
                $scope.locations = data;
            })
            .error(function(data, status){
                console.error("ERROR: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.search = function(locationName) {
            LocationListService.search(locationName)
                .success(function (data) {
                    $scope.locations = data;
                })
                .error(function(error, status) {
                    console.error("Error executing search: ", error);
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
        };
    }

    ng.module("locations.list", [])
        .factory("LocationListService", ["$http", LocationListService])
        .controller("LocationListController", ["$scope", "urlUtils", "LocationListService", LocationListController]);

}(angular));
( function(ng) {

    function LocationSurveysGateway($http) {
        var baseUrl = "/api/locations/";
        return {
            fetchDetails: function(locationId) {
                return $http.get(baseUrl + locationId);
            }
        }
    }

    function LocationDetailsController($scope, $stateParams, urlUtils, LocationSurveysGateway) {
        $scope.summary = true;
        $scope.locationId = $stateParams.locationId;
        LocationSurveysGateway.fetchDetails($scope.locationId)
            .success( function(data) {
                $scope.surveys = data.surveys;
                $scope.location = data.location;
            })
            .error(function (error, status) {
                if(status == 401) {
                    urlUtils.redirectHome();
                } else {
                    alert("An error occurred fetching the data from the server!");
                    console.error("ERROR fetching data: ", error);
                }
            });

        $scope.showMore = function(survey) {
            $scope.summary = false;
            $scope.survey = survey;
        };

        $scope.showLess = function() {
            $scope.summary = true;
        };
    }

    ng.module("locations.details", [])
        .factory("LocationSurveysGateway", ["$http", LocationSurveysGateway])
        .controller("LocationDetailsController", ["$scope, $stateParams", "urlUtils", "LocationSurveysGateway", LocationDetailsController]);

}(angular));
( function (ng) {

    function router($stateProvider) {
        $stateProvider
            .state("locations", {
                url: 'locations',
                templateUrl: "/locations/index.html"
            })
            .state("locations.list", {
                url: "/list",
                templateUrl: "/locations/list.html",
                controller: "LocationListController"
            })
            .state("locations.create", {
                url: '/create',
                templateUrl: "/locations/create.html",
                controller: 'LocationCreateController'
            })
            .state("locations.summary", {
                url: "/:locationId/summary",
                templateUrl: "/locations/surveys_summary.html",
                controller: "LocationDetailsController"
            });
    }

    ng.module("PasmoLocation", ["location.create", "locations.list", "locations.details"])
        .config(["$stateProvider", router]);

}(angular)); 
( function (ng) {
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/non_traditional");
            },

            fetchSurveys: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/non_traditional_outlets");
            },

            createSurvey: function(survey_id, params) {
                return $http.post("/api/surveys/" + survey_id + "/non_traditional_outlets", params)
;           },

            fetchSurvey: function(survey_id, outlet_survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/non_traditional_outlets/" + outlet_survey_id);
            },
            editSurvey: function(survey_id, outlet_survey_id, params) {
                return $http.put("/api/surveys/" + survey_id + "/non_traditional_outlets/" + outlet_survey_id, params);
            }
        };
    }

    ng.module("NonTraditionalOutletSurvey.gatewayService", [])
        .factory("NonTraditionalSurveyGatewayService", ["$http", GatewayService]);

}(angular));
( function (ng) {

    function ListController ($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.surveyId = $stateParams.id
        NonTraditionalSurveyGatewayService.fetchSurveys($stateParams.id)
            .success(function(data){
                $scope.surveys = data;
            })
            .error(function(data, status) {
                console.error("Error retrieving surveys: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("NonTraditionalOutletSurvey.list", [])
        .controller("NonTraditionalOutletSurveyListController", ["$scope", "$state", "$stateParams", "urlUtils", "NonTraditionalSurveyGatewayService", ListController]);
        
}(angular));
( function (ng) {

    function CreateController ($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.outlet_types = [
            {name: "Restaurant"}, {name: "Pharmacy"}
        ];

        NonTraditionalSurveyGatewayService.fetchOutlets()
            .success(function(data) {
                $scope.locations = data;
                if($scope.locations.length == 0) {
                    $scope.noLocatons = true;
                }
            })
            .error(function(data, status) {
                console.error("Error retreiving outlets: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.cancel = function() {
            $state.transitionTo("listNonTraditionalOutlets", {id: $stateParams.id})
        };

        $scope.submit = function() {
            $scope.errors = [];
            if(!$scope.location) {
                $scope.errors = ["Please chose a location!"];
            }

            if(!$scope.outlet_type) {
                $scope.errors.push("Please select an outlet type!");
            }

            if($scope.errors.length == 0) {
                var params = {
                    outreach: $scope.outreach,
                    outletType: $scope.outlet_type,
                    targetPopulations: $scope.target_populations,
                    condomsAvailable: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                    lubesAvailable: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
                    gigi: _.isBoolean($scope.gigi) ? $scope.gigi : false,
                    location: {
                        id: $scope.location.id,
                        name: $scope.location.name,
                        district: $scope.location.district,
                        loc: $scope.location.loc
                    }
                };
                NonTraditionalSurveyGatewayService.createSurvey($stateParams.id, params)
                    .success( function(data){
                        $state.transitionTo("listNonTraditionalOutlets", {id: $stateParams.id});
                    })
                    .error( function(error, status) {
                        if(status == 401) {
                            urlUtils.redirectHome();
                        } else {
                            console.error("ERROR: ", error);
                            alert("An error occurred!");
                        }
                    });
            }
        };
    }

    ng.module("NonTraditionalOutletSurvey.create", [])
        .controller("NonTraditionalOutletSurveyCreateController", ["$scope", "$state", "$stateParams", "urlUtils", "NonTraditionalSurveyGatewayService", CreateController]);

}(angular));
( function(ng) {

    function EditController($scope, $state, $stateParams, urlUtils, NonTraditionalSurveyGatewayService) {
        $scope.survey_id = $stateParams.survey_id;
        $scope.outlet_survey_id = $stateParams.outlet_survey_id;
        NonTraditionalSurveyGatewayService.fetchSurvey($scope.survey_id, $scope.outlet_survey_id)
            .success(function(data) {
                $scope.survey = data;
                $scope.survey.outletType = JSON.parse(data.outletType).name;
            })
            .error(function(error) {
                console.error("Error fetching survey data: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.cancel = function() {
            $state.transitionTo("listNonTraditionalOutlets", {id: $scope.survey_id});
        };

        $scope.submit = function() {
            var params = {
                outreach: $scope.survey.outreach,
                targetPopulations: $scope.survey.targetPopulations,
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            NonTraditionalSurveyGatewayService.editSurvey($scope.survey_id, $scope.outlet_survey_id, params)
                .success( function(data){
                    $scope.cancel();
                })
                .error( function(error, status) {
                    if(status == 401) { 
                        urlUtils.redirectHome();
                    } else {
                        console.error("ERROR: ", error);
                        alert("An error occurred!");
                    }
                });
            
        };

    }

    ng.module("NonTraditionalOutletSurvey.edit", [])
        .controller("NonTraditionalOutletSurveyEditController", ["$scope", "$state", "$stateParams", "urlUtils", "NonTraditionalSurveyGatewayService", EditController]);
        
}(angular));
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
			})
			.state("editNonTraditionalOutlets", {
				url: "/surveys/:survey_id/non_traditional_outlet/:outlet_survey_id/edit",
				templateUrl: "/surveys/non_traditional_outlets/edit.html",
				controller: "NonTraditionalOutletSurveyEditController"
			});
	}

	angular
	.module("NonTraditionalOutletSurvey",
		["NonTraditionalOutletSurvey.gatewayService", "NonTraditionalOutletSurvey.list",
		"NonTraditionalOutletSurvey.create", "NonTraditionalOutletSurvey.edit"])
	.config(["$stateProvider", routes]);
	
}(angular));
( function (ng) {
    
    function GatewayService ($http) {
        return {
            fetchOutlets: function() {
                return $http.get("/api/locations/byType/hotspot");
            },

            fetchSurveys: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/hotspots");
            },

            createSurvey: function(survey_id, params) {
                return $http.post("/api/surveys/" + survey_id + "/hotspots", params);
            },

            fetchHotspotSurvey: function(survey_id, hotspot_survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/hotspots/" + hotspot_survey_id);
            },

            editHotspotSurvey: function(survey_id, hotspot_survey_id, params) {
                return $http.put("/api/surveys/" + survey_id + "/hotspots/" + hotspot_survey_id, params);
            }    
        };
    }

    ng.module("Hotspots.gateway", [])
        .factory("GatewayService", ["$http", GatewayService]);

}(angular));
( function (ng) {

    function ListController($scope, $state, $stateParams, urlUtils, GatewayService) {
        $scope.surveyId = $stateParams.id;
        GatewayService.fetchSurveys($stateParams.id)
            .success(function (data) {
                $scope.surveys = data;
            })
            .error(function (error, status) {
                console.error("Error retrieving surveys: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("Hotspots.list", [])
        .controller("ListController", ["$scope", "$state", "$stateParams", "urlUtils", "GatewayService", ListController]);

}(angular));
( function (ng) {

    function CreateController ($scope, $state, $stateParams, urlUtils, GatewayService) {
        GatewayService.fetchOutlets()
            .success(function(data) {
                $scope.locations = data;
                if($scope.locations.length == 0) {
                    $scope.noLocatons = true;
                }
            })
            .error(function(data, status) {
                console.error("Error retreiving outlets: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.cancel = function() {
            $state.transitionTo("hotspotsList", {id: $stateParams.id});
        };

        $scope.submit = function() {
            $scope.errors = [];
            if(!$scope.location) {
                $scope.errors = ["Please chose a location!"];
            }

            if($scope.errors.length == 0) {
                var params = {
                    outreach: $scope.outreach,
                    targetPopulations: $scope.target_populations,
                    condomsAvailable: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                    lubesAvailable: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
                    gigi: _.isBoolean($scope.gigi) ? $scope.gigi : false,
                    location: {
                        id: $scope.location.id,
                        name: $scope.location.name,
                        district: $scope.location.district,
                        loc: $scope.location.loc
                    }
                };
                GatewayService.createSurvey($stateParams.id, params)
                    .success( function(data){
                        $state.transitionTo("hotspotsList", {id: $stateParams.id});
                    })
                    .error( function(error, status) {
                        if(status == 401) {
                            urlUtils.redirectHome();
                        } else {
                            console.error("ERROR: ", error);
                            alert("An error occurred!");
                        }
                    });
            }
        };
    }

    ng.module("Hotspots.create", [])
        .controller("CreateController", ["$scope", "$state", "$stateParams", "urlUtils", "GatewayService", CreateController]);

}(angular));
( function(ng) {

    function EditController($scope, $state, $stateParams, urlUtils, GatewayService) {
        $scope.surveyId = $stateParams.survey_id;
        $scope.hotspotSurveyId = $stateParams.hotspot_survey_id;
        GatewayService.fetchHotspotSurvey($scope.surveyId, $scope.hotspotSurveyId)
            .success(function (data){
                $scope.survey = data;
            })
            .error(function(error, status){
                console.error("Error fetching hotspot survey: ", error);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.cancel = function() {
            $state.transitionTo("hotspotsList", {id: $scope.surveyId});
        };

        $scope.submit = function() {
            var params = {
                outreach: $scope.survey.outreach,
                targetPopulations: $scope.survey.targetPopulations,
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            GatewayService.editHotspotSurvey($scope.surveyId, $scope.hotspotSurveyId, params)
                .success( function(data){
                    $scope.cancel();
                })
                .error( function(error, status) {
                    if(status == 401) {
                        urlUtils.redirectHome();
                    } else {
                        console.error("ERROR: ", error);
                        alert("An error occurred!");
                    }
                });
        
        };

    }

    ng.module("Hotspots.edit", [])
        .controller("HotspotSurveyEditController", ["$scope", "$state", "$stateParams", "urlUtils", "GatewayService", EditController]);
}(angular));
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
    
    ng.module("Hotspots", []) //"Hotspots.gateway", "Hotspots.list"]) //"Hotspots.create", "Hotspots.edit"])
        .config(["$stateProvider", routes]);

}(angular));
( function (ng) {
    function OutletGatewayService ($http) {
        //Fetch all traditional outlets from server.
        return {
            fetchTraditionalOutlets: function() {
                return $http.get("/api/locations/byType/traditional");
            },
            createTraditonalOutlet: function(params, survey_id) {
                return $http.post("/api/surveys/" + survey_id + "/traditional_outlets", params);
            },
            fetchTraditionalOutletsSurvey: function(survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/traditional_outlets");
            },
            fetchSurvey: function(survey_id, outlet_survey_id) {
                return $http.get("/api/surveys/" + survey_id + "/traditional_outlets/" + outlet_survey_id);
            },
            updateSurvey: function(params, survey_id, outlet_survey_id) {
                return $http.put("/api/surveys/" + survey_id + "/traditional_outlets/" + outlet_survey_id, params);
            }
        };
        
    }

    ng.module("TraditionalOutletSurvey.gatewayService", [])
        .factory("TraditionalOutletGatewayService", ["$http", OutletGatewayService]);

}(angular));
( function (ng) {
    function ListController ($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
        $scope.id = $stateParams.id;
        TraditionalOutletGatewayService.fetchTraditionalOutletsSurvey($stateParams.id)
            .success(function(data) {
                $scope.surveys = data;
            })
            .error(function(data, status) {
                console.error("ERROR: ", data);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });
    }

    ng.module("TraditionalOutletSurvey.list", [])
        .controller("TraditionalOutletSurveyListController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", ListController]);

}(angular));
( function (ng) {
    function CreateController($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
        TraditionalOutletGatewayService
            .fetchTraditionalOutlets()
            .success(function(data) {
                console.log("Got traditional outlets: ", data);
                $scope.locations = data;
                if(data.length == 0) {
                    $scope.noLocations = true;
                    console.log("No Locations: ", $scope.noLocations);
                }
            })
            .error(function(err, status) {
                console.error("ERROR: ", err);
                if(status == 401) {
                    urlUtils.redirectHome();
                }
            });

        $scope.submit = function() {
            var params = {
                condomsAvailable: _.isBoolean($scope.condoms_available) ? $scope.condoms_available : false,
                lubesAvailable: _.isBoolean($scope.lube_available) ? $scope.lube_available : false,
                gigi: _.isBoolean($scope.gigi) ? $scope.gigi : false,
                location: {
                    id: $scope.location.id,
                    name: $scope.location.name,
                    district: $scope.location.district,
                    loc: $scope.location.loc
                }
            };
            TraditionalOutletGatewayService.createTraditonalOutlet(params, $stateParams.id)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
                })
                .error(function(data, status) {
                    if(status == 401) {
                        urlUtils.redirectHome();
                    } else {
                        console.error("ERROR: ", data);
                    }
                })
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.id});
        };
    }

    ng.module("TraditionalOutletSurvey.create", [])
        .controller("TraditionalOutletSurveyCreateController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", CreateController]);
        
}(angular));
( function(ng) {

    function EditController($scope, $state, $stateParams, urlUtils, TraditionalOutletGatewayService) {
        $scope.surveyId = $stateParams.survey_id;
        TraditionalOutletGatewayService.fetchSurvey($stateParams.survey_id, $stateParams.traditional_outlet_survey_id)
            .success(function(data) {
                $scope.survey = data;
            })
            .error(function(error, status){
                if(status == 401) {
                    urlUtils.redirectHome();
                } else {
                    alert("Could not retrieve survey from server!");
                    console.log("Error retrieving traditonal outlet from server: ", error);
                }
            });

         $scope.submit = function() {
            var params = {
                condomsAvailable: _.isBoolean($scope.survey.condomsAvailable) ? $scope.survey.condomsAvailable : false,
                lubesAvailable: _.isBoolean($scope.survey.lubesAvailable) ? $scope.survey.lubesAvailable : false,
                gigi: _.isBoolean($scope.survey.gigi) ? $scope.survey.gigi : false
            };
            TraditionalOutletGatewayService.updateSurvey(params, $stateParams.survey_id, $stateParams.traditional_outlet_survey_id)
                .success(function(data) {
                    $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
                })
                .error(function(error, status) {
                    console.error("ERROR: ", error);
                    if(status == 401) {
                        urlUtils.redirectHome();
                    }
                });
        };

        $scope.cancel = function() {
            $state.transitionTo("surveys.listTraditionalOutlets", {id: $stateParams.survey_id});
        };
    }

    ng.module("TraditionalOutletSurvey.edit", [])
        .controller("TraditionalOutletSurveyEditController", ["$scope", "$state", "$stateParams", "urlUtils", "TraditionalOutletGatewayService", EditController]);

}(angular));
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
			state("surveys.editTraditionalOutlet", {
				url: "/surveys/:survey_id/traditional_outlet/:traditional_outlet_survey_id",
				templateUrl: "/surveys/traditional_outlets/edit.html",
				controller: "TraditionalOutletSurveyEditController"
			});
	}


	ng.module("TraditionaOutletSurvey", 
		["TraditionalOutletSurvey.gatewayService", "TraditionalOutletSurvey.list", "TraditionalOutletSurvey.create",
		"TraditionalOutletSurvey.edit"])
		.config(["$stateProvider", routes]);
	
}(angular));
	
var PasmoApp = { apiUrls: {} };

angular.module("PasmoApp",
	["ui.router", "url_utils",
        "surveys", "PasmoLocation",
        "TraditionaOutletSurvey","NonTraditionalOutletSurvey", "Hotspots"])
	.run(["$rootScope", "$http", "$state", function($rootScope, $http, $state){
		console.info("Starting Pasmo App......");
	}]);
