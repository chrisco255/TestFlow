'use strict';

angular.module('testFlowApp')
	.controller('MainCtrl', function ($scope) {
		function Node(content, children) {
			var childNodes = [];
			if(children) {
				for(var i = 0; i < children.length; i++) {
					childNodes[i] = new Node(children[i]);
				}
			}
			return {
				content: content || "",
				children: childNodes
			};
		}

		function NodeCtrl($scope, content) {
			$scope.content = content || "";
			$scope.children = [];
		}

		function appendNode() {
			$scope.root.children.push(new Node(""));
		}

		$scope.enterKeyHandler = function() {
			appendNode();
		};

		function setupDefaultNodes(root) {
			root.children.push.apply(root.children, [
				new Node("This is", ["child1", "child2"]),
				new Node("a test", ["child1"]),
				new Node("to see how"),
				new Node("well this works")
			]);
		}

		$scope.root = new Node();
		setupDefaultNodes($scope.root);

		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.removeEnd = function() {
			$scope.awesomeThings.splice(1);
		};

		$scope.removeAll = function() {
			$scope.awesomeThings = [];
		};

	});