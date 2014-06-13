'use strict';

angular
  .module('testFlowApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/sidebar', {
        templateUrl: 'views/sidebar.html',
        controller: 'SidebarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
