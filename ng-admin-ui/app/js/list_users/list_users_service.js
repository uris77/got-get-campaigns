angular.module('app')
  .service("ListUsersService", ['$http', function($http){
    this.fetchUsers = function() {
      return $http.get("/api/users");
    };
  }]);
