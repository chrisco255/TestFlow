'use strict';

angular.module('testFlowApp')
	.factory('Tree', function () {
		var tree = {};
		var levels = {
			root: 'root',
			suite: 'suite',
			suiteOpen: 'suite-open',
			case: 'case',
			caseOpen: 'case-open',
			step: 'step',
			stepOpen: 'step-open'
		};

		// Node constructor function
		tree.Node = function (content, parentNode) {
			// return the descendent level of a given level 
			function descendentLevel(level) {
				if(level === levels.root)
					return levels.suite;
				if(level === levels.suite)
					return levels.case;
				return levels.step;
			}

			//returns true if all objects in an array are in fact nodes
			function allAreNodes(nodes) {
				if(_.isArray(nodes)) {
					var nodeCount = _.filter(nodes, function(n) { 
						return '' + Node === '' + n.constructor; 
					});
					return nodeCount.length === nodes.length;
				}
				return false;
			}

			function Node(content, parentNode) {
				this.content = content || '';
				this.children = [];
				this.level = 'root';

				//if parentNode's defined, set the parentNode property
				if(parentNode instanceof Node) {
					this.parentNode = parentNode;
					this.level = descendentLevel(parentNode.level);
				}
			}

			//set parent nodes of all descendents of this node
			Node.prototype.setParents = function setParents() {
				var self = this;

				_.each(self.children, function(childNode) {
					childNode.parentNode = self;
					childNode.level = descendentLevel(self.level);
					childNode.setParents();
				});
			}
			
			Node.prototype.append = function append(node) {
				if(allAreNodes(node)) {
					this.children.push.apply(this.children, node);
				}
				else if(node instanceof Node) {
					//appends a new node or existing node to the end of a node's children array
					this.children.push(node);
				}
				//if no argument supplied, push a new node onto the children array
				else if(node === undefined) {
					this.children.push(newNode(null, this));
				}

				this.setParents();
			};

			Node.prototype.prepend = function prepend(node) {
				if(allAreNodes(node)) {
					this.children.unshift.apply(this.children, node);
				}
				else if(node instanceof Node) {
					//appends a new node or existing node to the end of a node's children array
					this.children.unshift(node);
					//either prepend an existing node or make a new one with this as the parent
				}
				else if(node === undefined) {
					this.children.unshift(new Node(null, this));
				}

				this.setParents();
			};

			return new Node(content, parentNode);
		};

		//The root node of the view
		tree.root = tree.Node();
		tree.drillBranch = tree.Node();

		return tree;

	});
