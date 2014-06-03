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

		$scope.tabHandler = function(scope) {
			//find the previous sibling and make the current Node the last child of that sibling
			var index = _.indexOf(scope.nodecollection, scope.node);
			if(index > 0) {
				//remove node from nodecollection
				var node = scope.nodecollection.splice(index, 1);
				//append to sibling's children
				scope.nodecollection[index - 1].children.push(scope.node);
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

				//remove the node from its current collection
				scope.nodecollection.splice(index, 1);
				
				//splice in the node to the parent collection
				parentCollection.splice(parentIndex + 1, 0, scope.node);

			}

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

		// $('#hello').mouseenter(
		//     function(){
		//     var list = $("#hello").append('<ul class="menu"></ul>').find('ul');
		//     for (var i = 0; i < 10; i++)
		//         list.append('<li>something</li>');
		//  	}
		// );

		// $('#hello').mouseout(
		// 	function(){
		// 		var list = $("ul.menu").remove();
		// 	}
		// );

		setTimeout(function() {
			$('#content>ul>li>span').attr('data-content' , '<a>Test Suite</a><br>');
			$('#content ul ul>li>span').attr('data-content' , 'Test Case');
			$('#content ul ul ul>li>span').attr('data-content' , 'Step');
			$('#content ul ul ul ul>li>span').attr('data-content' , 'Substep');
		}, 0);

	});