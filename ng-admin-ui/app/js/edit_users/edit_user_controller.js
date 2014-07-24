angular.module('app')
  .service('FetchUserService', ['$http', function($http) {
    this.get = function(id) {
      return $http.get("/api/users/" + id);
    };
  }])
  .controller('EditUserController',['$scope', '$state', '$stateParams', 'EditUserService', 'FetchUserService', 'AuthenticationService', function($scope, $state, $stateParams, EditUserService, FetchUserService, AuthenticationService){
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
  }]);

