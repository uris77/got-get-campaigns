angular.module('app')
  .service('FetchUserService', ['$http', function($http) {
    this.get = function(id) {
      return $http.get("/api/users/" + id);
    };
  }])
  .service("DeleteUserService", ["$http", function($http) {
    this.delete = function(id) {
      return $http.delete("/api/users/" + id);
    };
  }])
  .controller('EditUserController',['$scope', '$state', '$stateParams', 'EditUserService', 'FetchUserService', 'DeleteUserService', 'AuthenticationService', function($scope, $state, $stateParams, EditUserService, FetchUserService, DeleteUserService, AuthenticationService){
    var self = this;
    console.log("State Params: ", $stateParams);
    if(!AuthenticationService.isLoggedIn()){
      $state.transitionTo("users");
    } else {
      FetchUserService.get($stateParams.id).success(function(data){
        $scope.user = data.user;
      });      
    }
    this.submit = function() {
      if(Validate.isEmptyString($scope.user.username)) {
        $scope.errors = "Username can not be empty.";
      } else if(Validate.isEmptyString($scope.user.email)) {
        $scope.errors = "Email can not empty.";
      } else {
        EditUserService.save($scope.user)
        .success(function(data){
          $state.transitionTo("users_list");
        }).error(function(data){
          self.errors = data.error;
        });
      }
    };

    this.delete = function() {
      if(confirm("Do you want to delete this user?")) {
        DeleteUserService.delete($scope.user.id).success(function() {
          $state.transitionTo("users_list");
        });
      }
    };
  }]);

