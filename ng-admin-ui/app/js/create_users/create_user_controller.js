angular.module('app')
  .controller('CreateUserController',['$scope', 'CreateUserService',function($scope, CreateUserService){
    var self = this;
    this.submit = function() {
      CreateUserService.create({
        name: self.username,
        email: self.email
      }).success(function(data){
        console.log("Created users successfully");
      });
    };
  }]);
