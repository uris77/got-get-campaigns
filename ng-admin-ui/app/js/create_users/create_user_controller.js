angular.module('app')
  .controller('CreateUserController',['$scope', '$state', 'CreateUserService',function($scope, $state, CreateUserService){
    var self = this;
    this.submit = function() {
      CreateUserService.create({
        name: self.username,
        email: self.email
      }).success(function(data){
        console.log("Created users successfully");
        $state.transitionTo("list_users");
      });
    };
  }]);
