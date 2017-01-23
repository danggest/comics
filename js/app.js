(function() {
  'use strict';

  angular.module('app', ['ngRoute','ngCookies']).config(config).run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider){

    $routeProvider
    .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
    })

    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })

    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'RegisterController',
      controllerAs: 'register'
    })

    .when('/add-comic', {
      templateUrl: 'views/addComic.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })

    .when('/info/:id', {
      templateUrl: 'views/comicDetail.html',
      controller: 'InfoComicController',
      controllerAs: 'vm'
    })

    .when('/edit/:id', {
      templateUrl: 'views/comicEdit.html',
      controller: 'EditComicController',
      controllerAs: 'vm'
    })

    .otherwise({ redirectTo: '/login'});
  }

  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
  function run($rootScope, $location, $cookies, $http) {

    $rootScope.globals = $cookies.getObject('globals') || {};

    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authData;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
      var loggedIn = $rootScope.globals.currentUser;

      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }

    });

  }
})();
