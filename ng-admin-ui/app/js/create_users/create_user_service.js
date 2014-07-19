angular.module('ng-admin-user-app')
  .service("CreateUserService", function() {
    this.create = function (params){
      return NgAdminApp.UserFactory.create(params);
    };
  });
