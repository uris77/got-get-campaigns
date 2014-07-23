angular.module('app')
  .controller('CreateUserController',['$scope', '$state', 'CreateUserService', 'AuthenticationService', function($scope, $state, CreateUserService, AuthenticationService){
    var self = this;
    if(!AuthenticationService.isLoggedIn()){
      $state.transitionTo("home");
    }
    this.submit = function() {
      CreateUserService.create({
        name: self.username,
        email: self.email,
        admin: self.admin
      }).success(function(data){
        $state.transitionTo("list_users");
      }).error(function(data){
        self.errors = data.error;
      });
    };
  }]);
