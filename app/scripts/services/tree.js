'use strict';

angular.module('testFlowApp')
	.factory('Tree', function () {
		var tree = {};

		//Node constructor function
		tree.Node = function (content, children) {
			function Node(content, children) {
				this.content = content || "";
				this.children = [];

				//if there are children defined as strings, push them to the new node's children array as nodes
				if(children) {
					for(var i = 0; i < children.length; i++) {
						this.children[i] = new Node(children[i]);
					}
				}
			}

			Node.prototype.append = function(node) {
				//appends a new node or existing node to the end of a node's children array
				this.children.unshift(node || new Node());
			};

			return new Node(content, children);
		};

		//The root node of the view
		tree.root = tree.Node();

		return tree;

	});
