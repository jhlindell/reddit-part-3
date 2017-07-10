(function() {
  'use strict';
  angular.module("app").component("postList", {
    templateUrl: 'post/postList.template.html',
    controller: postListController
  });

  postListController.$inject = ['$http'];

  function postListController($http) {
    const vm = this;
    vm.$onInit = function() {
      vm.posts = [];
      vm.show = false;
      vm.sortBy = '-vote_count';
      vm.sorter = 'Sort By Votes';
      $http.get('/api/posts').then(response => {
        vm.posts = response.data;
      });
    };

  }
})();
