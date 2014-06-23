'use strict';

angular.module('testFlowApp')
	.controller('MainCtrl', function ($scope, $timeout, $animate, Tree, EventHandlers) {
		//bind the root to the Tree factory
		$scope.root = Tree.root;

		$scope.rootIsTreeRoot = function() {
			return $scope.root === Tree.root;
		};

		//set up some default nodes for testing and demoing
		setupDefaultNodes($scope.root);

		//purely for testing, remove before publishing
		function setupDefaultNodes(root) {

			var nodes = [{
					content: 'Home Page',
					children: [{
						content: 'Log in',
						children: [{
							content:'Without entering any username and password',
							children: [{
								content:'Empty out input fields',
								children: []
							},{
								content:'Click log in',
								children: []
							}]
						},{
							content:'Test it only with username',
							children: []
						},{
							content:'Test it only with password',
							children: []
						},{
							content:'User name with wrong password',
							children: []
						},{
							content:'Password with wrong user name',
							children: []
						},{
							content:'Right username and right password',
							children: []
						},{
							content:'Cancel, after entering username and password',
							children: []
						},{
							content:'Enter long username and password that exceeds the set limit of characters',
							children: []
						},{
							content:'Try copy/paste in the password text box',
							children: []
						}]
					}]
				},
				{
					content: 'Reservations',
					children: [{
						content: 'Datepicker',
						children: [{
							content:'Set departure date previous to today',
							children: []
						},{
							content:'Select an arrival date before departure date',
							children: []
						}]
					}]
				}
			];

			function mapNodes(nodes) {
				return _.map(nodes, function(rawNode) {
					var node = Tree.Node(rawNode.content);
					if(rawNode.children) {
						node.appendChild(mapNodes(rawNode.children));
					}
					return node;
				});
			}

			var suites = mapNodes(nodes);

			root.children = [];
			root.appendChild(suites);
		}
	});