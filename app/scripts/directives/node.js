'use strict';

angular.module('testFlowApp')
  .directive('node', function ($compile) {
  	return {
  		restrict: 'E',
	    replace: true,
	    template: '<li><content contenteditable="true" ng-model="node.content"></content></li>',
	    link: function(scope, element, attrs, ctrl) {
	    	if (angular.isArray(scope.node.children)) {
					element.append("<nodecollection nodecollection='node.children'></nodecollection>"); 
					$compile(element.contents())(scope);
				}
	    }
	  };
  });