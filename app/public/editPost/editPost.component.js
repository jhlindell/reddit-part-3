(function() {
  'use strict';
  angular.module("app").component("editPost", {
    templateUrl: 'editPost/editPost.template.html',
    controller: editPostController
  });

  editPostController.$inject = ['$http', '$stateParams', '$state'];

  function editPostController($http, $stateParams, $state) {
    const vm = this;
    vm.$onInit = function() {
      $http.get(`/api/posts/${$stateParams.id}`).then(response => {
        vm.editPost = response.data;
      });
    };
    vm.editPostFunc = function() {
      $http.patch(`api/posts/${$stateParams.id}`, vm.editPost).then(response => {
        $state.go('home');
      });
    };
  }
})();
