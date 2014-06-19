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

			var nodes = [{
					content: 'content',
					children: [{
						content: 'child1',
						children: [{
							content:'subchild',
							children: []
						}]
					}]
				},
				{
					content: 'content2',
					children: [{
						content: 'child1',
						children: [{
							content:'subchild',
							children: []
						}]
					}]
				}
			];

			function mapNodes(nodes) {
				return _.map(nodes, function(rawNode) {
					var node = Tree.Node(rawNode.content);
					if(rawNode.children) {
						node.append(mapNodes(rawNode.children));
					}
					return node;
				});
			}

			var what = mapNodes(nodes);

			root.append(what);
		}
	});