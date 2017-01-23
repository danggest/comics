(function() {
  'use strict';

  angular.module('app').service('UserService',['$filter', function($filter) {

    this.users = [{"username":"dgarcia","password":"1234","name":"Daniel","lastName":"Garcia","id":1}];

    this.create = function create(user) {

      if (this.getByUsername(user.username)!== null) {
        console.log('El nombre de usuario ya se encuentra asignado');
      }else {
        var users = this.getUsers();

        // assign id
        var lastUser = users[users.length - 1] || { id: 0 };
        user.id = lastUser.id + 1;

        // save to local storage
        users.push(user);
        this.setUsers(users);

        return true;
      }
    return false;
    };

    this.getAll = function () {
      return this.getUsers();
    };

    this.getById = function (id) {

      var filtered = $filter('filter')(this.getUsers(), { id: id });
      var user = filtered.length ? filtered[0] : null;
      return user;
    };

    this.getByUsername = function (username) {
      var filtered = $filter('filter')(this.getUsers(), { username: username });
      var user = filtered.length ? filtered[0] : null;
      return user;
    };

    this.getUsers = function () {
      if(!localStorage.users){
          localStorage.users = JSON.stringify([]);
      }

      return JSON.parse(localStorage.users);
    };

    this.setUsers = function (users) {
      localStorage.users = JSON.stringify(users);
    };

    this.update = function (user) {
      var users = this.getUsers();
      for (var i = 0; i < users.length; i++) {
          if (users[i].id === user.id) {
              users[i] = user;
              break;
          }
      }
      this.setUsers(users);

      return true;
    };

    this.delete = function (id) {

        var users = this.getUsers();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        this.setUsers(users);

        return true;
    };

    this.addFirstUser = function() {
      this.setUsers(this.users);
    };

  }]);
})();
