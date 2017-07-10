(function() {
  'use strict';

  angular
    .module('app')
    .service('postServices', service);

  function service() {
    this.getAll = function(){
      $http.get('/api/posts').then(response => {
        return response.data;
      });
    };
  }

}());
