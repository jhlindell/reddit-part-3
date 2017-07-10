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

    this.postNew = function(post) {
      return $http.post('api/posts', post).then(response => response);
    };

    this.upVote = function(id) {
      return $http.post(`api/posts/${id}/votes`).then(response => response);
    };

    this.downVote = function(id) {
      return $http.delete(`api/posts/${id}/votes`).then(response => response);
    };

    this.postComment = function(id, comment) {
      return $http.post(`/api/posts/${id}/comments`, {content: comment}).then(response => response);
    };

    this.patchPost = function(id, post) {
      return $http.patch(`api/posts/${id}`, post).then(response => response);
    };
  }


}());
