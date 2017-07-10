(function() {
  'use strict';

  angular
    .module('app')
    .service('postServices', service);

  service.inject = ['$http'];
  function service($http) {
    this.getAll = function(){
      return $http.get('/api/posts').then(response => response.data);
    };

    this.getSingle = function(id) {
      return $http.get(`api/posts/${id}`).then(response => response.data);
    };

  }


}());
