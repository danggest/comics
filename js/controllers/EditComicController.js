(function(){

  'use strict';

  angular
  .module('app')
  .controller('EditComicController', ['$scope','$location','$rootScope' , 'AuthenticationService', 'UserService', 'ComicsService', '$routeParams', function($scope, $location, $rootScope, AuthenticationService, UserService, ComicsService, $routeParams) {
    var vm = this;

    vm.comic;
    vm.comics;
    vm.logout = logout;
    vm.editComic = editComic;

    initController();

    function initController () {
            loadAllComics();
            console.log($routeParams.id);
            vm.comic = vm.comics[$routeParams.id-1];
            console.log(vm.comic);
    };

    function loadAllComics(){
      var comics = ComicsService.getAll();

      if (comics !== null) {
        vm.comics = comics;
      }
    }

    function editComic(comic) {
      if (ComicsService.update(comic)) {
        console.log('Comic Editado');
      }
      $location.path('/');
    }

    function logout() {
      AuthenticationService.clearCredentials();
      $location.path('/login');
    }

  }]);
})();
