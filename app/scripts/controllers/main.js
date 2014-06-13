'use strict';

angular.module('testFlowApp')
	.controller('MainCtrl', function ($scope, $timeout, $animate, Tree, EventHandlers) {
		//bind the root to the Tree factory
		$scope.root = Tree.root;

		//set up some default nodes for testing and demoing
		setupDefaultNodes($scope.root);

		//goofy experiment that will likely be removed later
		//"The More You Know" audio
		$scope.playAudio = function() {
			$("#audio").get(0).play();
		};

		//purely for testing, remove before publishing
		function setupDefaultNodes(root) {
			root.children.push.apply(root.children, [
				Tree.Node("This is", ["child1", "child2"]),
				Tree.Node("a test", ["child1"]),
				Tree.Node("to see how"),
				Tree.Node("well this works")
			]);
		}
	});