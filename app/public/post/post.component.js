(function() {
  'use strict';
  angular.module("app").component("post", {
    bindings: {
      postdata: '='
    },
    templateUrl: 'post/post.template.html',
    controller: postController
  });

  function postController($http) {
  const vm = this;

  vm.$onInit = function(){
    vm.postdata.showComments = false;
  };

  vm.upvote = function() {
    vm.postdata.vote_count++;
  };

  vm.downvote = function() {
    if (vm.postdata.vote_count > 0) {
      vm.postdata.vote_count--;
    }
  };

  vm.showHideComments = function() {
    vm.postdata.showComments = !vm.postdata.showComments;
  };
}
})();
