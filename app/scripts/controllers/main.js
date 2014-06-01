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

		function appendNode(scope) {
			if(scope.node.children.length === 0) { 
				var i = _.indexOf(scope.nodecollection, scope.node) + 1;
				scope.nodecollection.splice(i, 0, new Node());
			} else if(scope.node.children.length > 0) {
				scope.node.children.unshift(new Node());
			}
		}

		$scope.enterKeyHandler = function(scope) {
			appendNode(scope);
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