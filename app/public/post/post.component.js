(function() {
  'use strict';
  angular.module("app").component("post", {
    bindings: {
      postdata: '=',
      remove: '&'
    },
    templateUrl: 'post/post.template.html',
    controller: postController
  });

  postController.$inject = ['$http', 'postServices'];
  function postController($http, postServices) {
  const vm = this;

  vm.$onInit = function(){
    vm.postdata.showComments = false;
  };

  vm.upvote = function() {
    postServices.upVote(vm.postdata.id).then(function(response) {
      vm.postdata.vote_count++;
    });
  };

  vm.downvote = function() {
    if (vm.postdata.vote_count > 0) {
      postServices.downVote(vm.postdata.id).then(function(response){
        vm.postdata.vote_count--;
      });
    }
  };

  vm.showHideComments = function() {
    vm.postdata.showComments = !vm.postdata.showComments;
  };

  vm.deletePost = function(){
    postServices.deletePost(vm.postdata.id).then(function(){
      vm.remove(vm.postdata);
    });
  };
}
})();
