(function() {
  'use strict';
  angular.module("app").component("formcomponent", {
    templateUrl: 'form/form.template.html',
    controller: formController,
    bindings: {
      allposts: "=",
      toggle: "="
    }
  });

  formController.$inject = ['$http', '$stateParams', '$state', 'postServices'];
  function formController($http, $stateParams, $state, postServices) {
  const vm = this;

  vm.$onInit = function(){
    var id= $stateParams.id;
    if(id !== undefined){
      vm.updateOrPost = "Update";
      vm.loadForEdit();
    } else {
      vm.updateOrPost = "Create Post";
    }
  };

  vm.postOrPatch = function(){
    if($stateParams.id !== undefined){
      vm.patchPost();
    } else {
      vm.createNewPost();
    }
  };

  vm.patchPost = function(){
    postServices.patchPost($stateParams.id, vm.post).then(function(response){
      $state.go('home');
    });
  };

  vm.loadForEdit = function(){
    postServices.getSingle($stateParams.id).then(function(response){
      vm.post = response;
    });
  };

  vm.createNewPost = function() {
    vm.post.created_at = new Date();
    vm.post.vote_count = 0;
    vm.post.comments = [];

    postServices.postNew(vm.post).then(response => {
      response.data.numComments = 0;
        response.data.comments = [];
        response.data.showComments = false;
        response.data.cmtInput = '';
        vm.allposts.push(response.data);
        delete vm.post;
        vm.toggle = false;
    });
  };
}
})();
