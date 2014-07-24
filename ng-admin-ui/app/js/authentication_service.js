angular.module("app")
  .service("AuthenticationService", ['$http', function($http){
    var self = this;

    self.fetchCurrentUser = function() {
      return $http.get("/api/my_details");
    };

    self.setUser = function(user){
      self.user = user;
    };

    self.isLoggedIn = function() {
      return !_.isEmpty(self.user);
    };

    self.getUser = function() {
      return self.user;
    };

    self.isAllowed = function() {
      if(self.user) {
        return self.user.admin;
      } else {
        self.fetchCurrentUser().success(function(userInfo){
          AuthenticationService.setUser(userInfo);
        });
      }
    };

    self.logout = function() {
      delete self.user;
    };

  }]);
