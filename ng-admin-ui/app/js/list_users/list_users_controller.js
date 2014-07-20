angular.module("app")
  .controller("ListUsersController", ["$scope", "ListUsersService", function($scope, ListUsersService){
    var self = this;
    ListUsersService.fetchUsers().success(function(data){
      self.users = data;
    });
  }]);
