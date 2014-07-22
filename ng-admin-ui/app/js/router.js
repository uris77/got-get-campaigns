angular.module('app')
  .config(function($stateProvider, $urlRouterProvider){
    /*
     * Define states
     */
    var createState = {
        url: '/users/create',
        templateUrl: "create_user_form.html",
        controller: "CreateUserController"
    },
    listState = {
        url: '/users/list',
        templateUrl: 'users_list.html',
        controller: "ListUsersController"
    },
    home = {
      url: '/',
      templateUrl: 'home.html',
      controller: function(){}
    };

    // Hook up the states to ui-router
    $stateProvider
      .state('create_users', createState)
      .state('list_users', listState)
      .state('home', home);
  });
