'use strict';

angular.module('testFlowApp')
	.controller('SidebarCtrl', function ($scope, Tree, EventHandlers) {
		$scope.testSuites = _.each(Tree.root.children, function(node) {
			return node;
		});

		$scope.clickNode = function(scope) {
			EventHandlers.ClickNode(scope);
		};
	});
