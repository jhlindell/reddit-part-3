(function() {
  'use strict';
  angular.module("app").component("comment", {
    templateUrl: 'post/comment.template.html',
    controller: commentController,
    bindings: {
      commentdata: "="
    }
  });

  commentController.$inject = ['postServices'];
  function commentController(postServices) {
  const vm = this;

  vm.$onInit = function() {

  };

  vm.newComment = function(post) {
    postServices.postComment(vm.commentdata.id, vm.cmtInput).then(response => {
      vm.commentdata.comments.push(response.data);
    });
    delete vm.cmtInput;
    vm.commentdata.numComments++;
  };
}
})();
