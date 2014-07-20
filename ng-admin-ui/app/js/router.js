angular.module('app')
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('create_users', {
        url: '/users/create',
        templateUrl: "create_user_form.html",
        controller: "CreateUserController"
      })
      .state('list_users', {
        url: '/users/list',
        templateUrl: 'users_list.html',
        controller: function(){ console.log('listing...');}
      });
  });
