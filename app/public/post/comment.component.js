(function() {
  'use strict';
  angular.module("app").component("comment", {
    templateUrl: 'post/comment.template.html',
    controller: commentController,
    bindings: {
      commentdata: "="
    }
  });

  function commentController($http) {
  const vm = this;

  vm.$onInit = function() {

  };

  vm.newComment = function(post) {
    $http.post(`/api/posts/${vm.commentdata.id}/comments`, {content: vm.cmtInput}).then(response => {
      vm.commentdata.comments.push(response.data);
    });
    delete vm.cmtInput;
    vm.commentdata.numComments++;
  };
}
})();
