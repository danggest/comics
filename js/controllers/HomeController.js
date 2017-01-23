(function(){
  'use strict';

  angular
  .module('app')
  .controller('HomeController', ['$scope','$location','$rootScope' , 'AuthenticationService', 'UserService', 'ComicsService', '$routeParams', function($scope, $location, $rootScope, AuthenticationService, UserService, ComicsService, $routeParams) {
    var vm = this;

    vm.user = null;
    vm.comics = [];
    vm.comic = null;
    vm.allUsers = [];
    vm.logout = logout;
    vm.addComic = addComic;

    initController();

    function initController () {
            loadCurrentUser();
            loadAllUsers();
            loadAllComics();
    };

    function loadCurrentUser() {

      var user = UserService.getByUsername($rootScope.globals.currentUser.username);

      if (user !== null) {
        vm.user = user;
      }
    };

    function loadAllUsers() {
      var allusers = UserService.getAll();

      if (allusers !== null) {
        vm.allUsers = allusers;
      }
    };

    function loadAllComics(){
      var comics = ComicsService.getAll();

      if (comics !== null) {
        vm.comics = comics;
      }
    }

    function logout() {
      AuthenticationService.clearCredentials();
      $location.path('/login');
    }

    function addComic(){
      console.log(vm.comic);
      if (ComicsService.create(vm.comic)) {
        $location.path('/');
      }
      else{
        console.log('No se pudo agregar')
      }
    };

  }]);

})();
