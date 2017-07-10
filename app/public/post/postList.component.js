(function() {
  'use strict';
  angular.module("app").component("postList", {
    templateUrl: 'post/postList.template.html',
    controller: postListController
  });

  postListController.$inject = ['postServices'];

  function postListController(postServices) {
    const vm = this;
    vm.$onInit = function() {
      vm.posts = [];
      vm.show = false;
      vm.sortBy = '-vote_count';
      vm.sorter = 'Sort By Votes';
      postServices.getAll().then(function(response){
        vm.posts = response;
      });
    };

    vm.removePost = function(post){
      for(let i = 0; i < vm.posts.length; i++){
        if(vm.posts[i].id === post.id){
          vm.posts.splice(i, 1);
        }
      }
    };
  }
})();
