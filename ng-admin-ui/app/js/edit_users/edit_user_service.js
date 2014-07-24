angular.module('app')
  .service("EditUserService", ['$http',function($http) {
    this.save = function (params){
      return $http.put("/api/users/" + params.id, params);
    };
  }]);

