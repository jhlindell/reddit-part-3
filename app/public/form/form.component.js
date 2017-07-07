(function() {
  'use strict';
  angular.module("app").component("formcomponent", {
    templateUrl: 'form/form.template.html',
    controller: formController,
    bindings: {
      allposts: "="
    }
  });

  formController.$inject = ['$http', '$stateParams', '$state'];
  function formController($http, $stateParams, $state) {
  const vm = this;

  vm.$onInit = function(){
    console.log(vm.allposts);
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
      vm.allposts.push(response.data);
      delete vm.newPost;
      vm.show = false;
    });
  };
}
})();
