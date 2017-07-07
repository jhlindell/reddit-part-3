(function() {
  'use strict';
  angular.module("app").component("newPost", {
    templateUrl: 'newPost/newPost.template.html',
    controller: newPostController
  });

  newPostController.$inject = ['$http'];

  function newPostController($http) {
    const vm = this;
    vm.$onInit = function() {
      vm.show = false;
      vm.showComments = false;
      vm.sortBy = '-vote_count';
      vm.sorter = 'Sort By Votes';
      for (var i = 4; i < 20; i++) {
        $http.delete('api/posts/' + i).then(function(response) {});
      }
      $http.get('/api/posts').then(response => {
        vm.posts = response.data;
      });

    };
    vm.createNewPost = function() {
      vm.newPost.created_at = new Date();
      vm.newPost.vote_count = 0;
      vm.newPost.comments = [];

      $http.post('api/posts', vm.newPost).then(response => {
        response.data.numComments = 0;
        response.data.comments = [];
        response.data.showComments = false;
        response.data.cmtInput = '';
        vm.posts.push(response.data);
        delete vm.newPost;
        vm.show = false;
      });
    };

    vm.newComment = function(post) {
      $http.post(`/api/posts/${post.id}/comments`, {content: post.cmtInput}).then(response => {
        post.comments.push(response.data);
      });
      delete post.cmtInput;
      post.numComments++;
    };

    vm.upvote = function(post) {
      post.vote_count++;
    };

    vm.downvote = function(post) {
      if (post.vote_count > 0) {
        post.vote_count--;
      }
    };

    vm.showHideComments = function(post) {
      post.showComments = !post.showComments;
    };
  }
})();
