var NgAdminApp = {};
angular.module('app', ["ui.router"]).run(function($rootScope, $http, AuthenticationService){
  console.log("Starting app....");
  $http.get("/api/my_details").success(function(myInfo){
    AuthenticationService.setUser(myInfo);
  });
});
