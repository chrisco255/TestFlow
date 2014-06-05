'use strict';

angular.module('testFlowApp')
	.controller('MainCtrl', function ($scope, $timeout, $animate) {
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
			disableAnimationsThisCycle();
		};

		$scope.collapseHandler = function(scope) {
			scope.node.children.splice(0, scope.node.children.length);
		};

		function disableAnimationsThisCycle() {
			$animate.enabled(false);
			$scope.$$postDigest(function() {
				setTimeout(function() {
					$animate.enabled(true);
				}, 0);
			});
		}

		$scope.tabHandler = function(scope) {
			//find the previous sibling and make the current Node the last child of that sibling
			var index = _.indexOf(scope.nodecollection, scope.node);
			if(index > 0) {
				scope.isCollapsible = false;

				//remove node from nodecollection
				var node = scope.nodecollection.splice(index, 1);
				//append to sibling's children
				scope.nodecollection[index - 1].children.push(scope.node);

				disableAnimationsThisCycle();
			}
		};

		$scope.shiftTabHandler = function(scope) {
			var index, parentCollection, parentNode, parentIndex;
			//make the current Node the next sibling of its parent
			index = _.indexOf(scope.nodecollection, scope.node);

			if(scope.$parent && scope.$parent.$parent) {
				//get the parent collection and cancel action if it doesn't exist
				parentCollection = scope.$parent.$parent.nodecollection;
				if(!parentCollection) {
					return;
				}

				//grab the parent node and calculate the index in the parent collection
				parentNode = scope.$parent.$parent.node;
				parentIndex = _.indexOf(parentCollection, parentNode);
				scope.isCollapsible = false;
				//remove the node from its current collection
				scope.nodecollection.splice(index, 1);
				
				//splice in the node to the parent collection
				parentCollection.splice(parentIndex + 1, 0, scope.node);

				disableAnimationsThisCycle();
			}
		};

		$scope.backspaceHandler = function(scope) {
			var numChildren = scope.node.children.length;
			if(!numChildren) {
				//delete the node if there's no children
				var index = _.indexOf(scope.nodecollection, scope.node);
				scope.nodecollection.splice(index, 1);
				return true;
			}
			return false;
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