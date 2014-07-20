angular.module('app')
  .service("CreateUserService", ['$http',function($http) {
    this.create = function (params){
      var user = NgAdminApp.UserFactory.create(params);
      if(_.isEmpty(user.errors)) {
        delete user.errors;
        return $http.post("/api/users", user);
      } else {
        return user;
      }
    };
  }]);
