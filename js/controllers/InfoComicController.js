(function(){

  'use strict';

  angular
  .module('app')
  .controller('InfoComicController', ['$scope','$location','$rootScope' , 'AuthenticationService', 'UserService', 'ComicsService', '$routeParams', function($scope, $location, $rootScope, AuthenticationService, UserService, ComicsService, $routeParams) {
    var vm = this;

    vm.comic;
    vm.comics;
    vm.logout = logout;

    initController();

    function initController () {
            loadAllComics();
            vm.comic = vm.comics[$routeParams.id-1];
            console.log(vm.comic);
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

  }]);
})();
