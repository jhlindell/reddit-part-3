(function() {
  'use strict';
  angular.module("app", ['ui.router','angularMoment'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state({
        name: 'home',
        url: '/',
        component: 'postList'
      })
      .state({
        name: 'formcomponent',
        url: '/posts/:id/edit',
        component: 'formcomponent'
      });
  }
}());
