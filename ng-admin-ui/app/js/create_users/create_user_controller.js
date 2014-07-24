angular.module('app')
  .controller('CreateUserController',['$scope', '$state', 'CreateUserService', 'AuthenticationService', function($scope, $state, CreateUserService, AuthenticationService){
    var self = this;
    if(!AuthenticationService.isLoggedIn()){
      $state.transitionTo("users");
    }
    this.submit = function() {
      CreateUserService.create({
        username: self.username,
        email: self.email,
        admin: self.admin
      }).success(function(data){
        $state.transitionTo("users_list");
      }).error(function(data){
        self.errors = data.error;
      });
    };
  }]);
