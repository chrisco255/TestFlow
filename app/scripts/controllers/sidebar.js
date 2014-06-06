'use strict';

angular.module('testFlowApp')
  .controller('SidebarCtrl', function ($scope) {
    $scope.el = ["hello", "hola", "bonjour"];
    $scope.topLevel = [];
    for (var i = 0; i < $scope.root.children.length; i++) {
    	$scope.topLevel.push($scope.root.children[i].content);
    }

  });
