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
        console.log("Created users successfully");
        $state.transitionTo("list_users");
      });
    };
  }]);
