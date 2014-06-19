'use strict';

angular.module('testFlowApp')
	.service('EventHandlers', function EventHandlers($animate, Tree) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		this.KeyCodes = {
			Enter: 13,
			Tab: 9,
			Up: 38,
			Down: 40,
			Backspace: 8
		};

		//if there's no children for this node, make a new sibling node
		//otherwise make a new node at the beginning of the children array
		function appendNode(scope) {
			if(scope.node.children.length === 0) { 
				var i = _.indexOf(scope.nodecollection, scope.node) + 1;
				scope.nodecollection.splice(i, 0, Tree.Node());
				//now set the parents of the node collection
				scope.node.parentNode.setParents();
			} else if(scope.node.children.length > 0) {
				scope.node.prepend();
				//scope.node.children.unshift(Tree.Node());
				//scope.node.setParents();
			}
		}

		//turn animations off
		function disableAnimations() {
			$animate.enabled(false);
		}

		//reenable animations after the currently digesting bindings update the view
		function enableAnimations(scope) {
			scope.$$postDigest(function() {
				//DOM removals, it seems, run at the end of the postDigest function,
				//so a setTimeout reenables the animations after the DOM removals
				setTimeout(function() {
					$animate.enabled(true);
				}, 0);
			});
		}

		//append a new node
		this.EnterKey = function(scope, element) {
			disableAnimations();
			appendNode(scope);
			enableAnimations(scope);
		};

		//indent this node and all descendents
		this.TabKey = function(scope, element) {
			disableAnimations();
			//find the previous sibling and make the current Node the last child of that sibling
			var index = _.indexOf(scope.nodecollection, scope.node);
			if(index > 0) {
				scope.isCollapsible = false;

				//remove node from nodecollection
				var node = scope.nodecollection.splice(index, 1);
				//append to sibling's children
				scope.nodecollection[index - 1].children.push(scope.node);
				//refactor
				scope.node.parentNode.setParents();
			}

			enableAnimations(scope);
		};

		//unindent this node and all descendents
		this.ShiftTabKey = function(scope, element) {
			disableAnimations();

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

				scope.node.parentNode.parentNode.setParents();
			}

			enableAnimations(scope);
		};

		//delete characters as usual unless there are no remaining characters
		//if the node has no chars and no children, remove the node
		this.BackspaceKey = function(scope, element) {
			var numChildren = scope.node.children.length;
			if(!numChildren) {
				//delete the node if there's no children
				var index = _.indexOf(scope.nodecollection, scope.node);
				scope.nodecollection.splice(index, 1);
				return true;
			}
			return false;
		};

		//drill down to this node
		this.ClickNode = function(scope, element) {
			Tree.drillBranch.children = [scope.node];
			scope.$root.$$childHead.root = Tree.drillBranch;
		};

		//collapse all children into the parent that was clicked
		this.Collapse = function(scope) {
			//applying this unlikely string as a filter causes all the children to be collapsed
			scope.node.children.collapsed = "~!%@%!~";
		};

		//expand all child nodes for this node
		this.Expand = function(scope) {
			scope.node.children.collapsed = "";
		};

	});
