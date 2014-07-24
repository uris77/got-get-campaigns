angular.module("app")
  .controller("ListUsersController", ["$scope", "$state", "ListUsersService", "AuthenticationService", function($scope, $state, ListUsersService, AuthenticationService){
    var self = this;
    if(!AuthenticationService.isLoggedIn()){
      $state.transitionTo("users");
    } else {
      ListUsersService.fetchUsers().success(function(data){
        self.users = data;
      });
    }

    self.isAllowed = function() {
      return AuthenticationService.isAllowed();
    };
  }]);
