(function() {
  'use strict';

  angular.module('app').service('ComicsService',['$filter', function($filter) {

    this.comics = [];

    this.create = function create(comic) {

        var comics = this.getComics();

        // assign id
        var lastComic = comics[comics.length - 1] || { id: 0 };
        comic.id = lastComic.id + 1;

        // save to local storage
        comics.push(comic);
        this.setComics(comics);

        return true;
    };

    this.getAll = function () {
      return this.getComics();
    };

    this.getById = function (id) {

      var filtered = $filter('filter')(this.getComics(), { id: id });
      var comic = filtered.length ? filtered[0] : null;
      return comic;
    };

    this.getByName = function (name) {
      var filtered = $filter('filter')(this.getComics(), { name: name });
      var comic = filtered.length ? filtered[0] : null;
      return comic;
    };

    this.getComics = function () {
      if(!localStorage.comics){
          localStorage.comics = JSON.stringify([]);
      }

      return JSON.parse(localStorage.comics);
    };

    this.setComics = function (comics) {
      localStorage.comics = JSON.stringify(comics);
    };

    this.update = function (comic) {
      var comics = this.getComics();
      for (var i = 0; i < comics.length; i++) {
          if (comics[i].id === comic.id) {
              comics[i] = comic;
              break;
          }
      }
      this.setComics(comics);

      return true;
    };

    this.delete = function (id) {

        var comics = this.getComics();
        for (var i = 0; i < comics.length; i++) {
            var comic = comics[i];
            if (comic.id === id) {
                comics.splice(i, 1);
                break;
            }
        }
        this.setComics(comics);

        return true;
    };

  }]);
})();
