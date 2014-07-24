angular.module('app')
  .config(function($stateProvider, $urlRouterProvider){
    /*
     * Define states
     */
    var createState = {
        url: '/create',
        templateUrl: "create_user_form.html",
        controller: "CreateUserController"
    },
    listState = {
        url: '/list',
        templateUrl: 'users_list.html',
        controller: "ListUsersController"
    },
    editUser = {
      url: '/edit/:id',
      templateUrl: 'edit_user_form.html',
      controller: "EditUserController"
    },
    logout = {
      url: "/logout",
      controller: "LogoutController"
    },
    home = {
      url: '/',
      templateUrl: 'home.html'
    };

    // Hook up the states to ui-router
    $stateProvider
      .state('users', home)
      .state('users_create', createState)
      .state('users_list', listState)
      .state("users_edit", editUser)
      .state("logout", logout);
  });
