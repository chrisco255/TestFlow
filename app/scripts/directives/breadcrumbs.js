'use strict';

angular.module('testFlowApp')
	.directive('breadcrumbs', function (Tree, EventHandlers) {
		return {
			template: '<div><span ng-repeat="step in steps"><a ng-click="clickStep(this)">{{ getStepText(this) }}</a><span> > </span></span></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.steps = [];

				scope.getStepText = function(scope) {
					var text = scope.step === Tree.root ? "Home" : scope.step.content;
					return text;
				};

				scope.clickStep = function(scope) {
					EventHandlers.ClickStep(scope);
				};

				//returns all the nodes in a trace to the tree's root
				function pathToTreeRoot(node) {
					var parent = node.parentNode;
					var path = [];

					if(parent) {
						path.push(parent);
						return pathToTreeRoot(parent).concat(path);
					}
					return path;
				}

				scope.$watch('root', function (root) {
					if(Tree.root === root) {
						scope.steps = [];
					} else {
						scope.steps = pathToTreeRoot(root);
					}
				});
			}
		};
	});
