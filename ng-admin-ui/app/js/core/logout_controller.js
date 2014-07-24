angular.module("app")
  .controller("LogoutController", ["AuthenticationService", "$state", function(AuthenticationService, $state){
    AuthenticationService.logout();
    $state.transitionTo("users");
  }]);
