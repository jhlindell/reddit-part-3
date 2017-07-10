(function() {
  'use strict';
  angular.module("app").component("post", {
    bindings: {
      postdata: '='
    },
    templateUrl: 'post/post.template.html',
    controller: postController
  });

  postController.$inject = ['$http'];
  function postController($http) {
  const vm = this;

  vm.$onInit = function(){
    vm.postdata.showComments = false;
  };

  vm.upvote = function() {
    $http.post(`api/posts/${vm.postdata.id}/votes`).then(function(response){
      vm.postdata.vote_count++;
    });
  };

  vm.downvote = function() {
    if (vm.postdata.vote_count > 0) {
      $http.delete(`api/posts/${vm.postdata.id}/votes`).then(function(response){
        vm.postdata.vote_count--;
      });
    }
  };

  vm.showHideComments = function() {
    vm.postdata.showComments = !vm.postdata.showComments;
  };
}
})();
