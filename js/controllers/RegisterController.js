(function(){
  'use strict';

  angular.module('app').controller('RegisterController',['UserService','$location', '$rootScope', function (UserService,$location, $rootScope) {
    var register = this;

    register.loadData = function () {
      if (UserService.create(register.user)) {
        $location.path('/');
      }
      else{
        console.log('No se pudo agregar')
      }
    }

  }]);

})();
