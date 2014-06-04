'use strict';

angular.module('testFlowApp')
  .directive('node', function ($compile) {
  	return {
  		restrict: 'E',
	    replace: true,
	    template: '<li class="expanded"><span class="expandable"><i class="fa fa-plus"></i></span><span class="collapsible"><i class="fa fa-minus"></i></span><content contenteditable="true" ng-model="node.content"></content></li>',
	    link: function(scope, element, attrs, ctrl) {
	    	element
		    	.mouseenter(function() {
		    		$(".collapsible, .expandable").hide();
		    		element.children(".expandable").show();
		    	})
		    	.mouseleave(function() {
		    		element.children(".collapsible, .expandable").hide();
	    		});
	    	if (angular.isArray(scope.node.children)) {
					element.append("<nodecollection nodecollection='node.children'></nodecollection>"); 
					$compile(element.contents())(scope);
				}
	    }
	  };
  });