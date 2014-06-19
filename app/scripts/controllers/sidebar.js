'use strict';

angular.module('testFlowApp')
	.controller('SidebarCtrl', function ($scope, Tree) {
		$scope.testSuites = _.each(Tree.root.children, function(node) {
			return node;
		});
	});
