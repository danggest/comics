(function(){
  'use strict';

  angular.module('app').controller('LoginController', ['$location', 'AuthenticationService', 'UserService', function($location, AuthenticationService, UserService) {
    var vm = this;

    (function initController() {
            // reset login status
            UserService.addFirstUser();
            AuthenticationService.clearCredentials();
        })();

    vm.login = function(){
      console.log(vm.user);
      AuthenticationService.login(vm.user.username, vm.user.password, function (response) {
        if (response.success) {
            AuthenticationService.setCredentials(vm.username, vm.password);
            $location.path('/');
        } else {
          console.log('NO SE ENCUENTRA REGISTRADO');
        }
      });
    };

  }]);

})();
