'use strict';

angular.module('testFlowApp')
  .directive('node', function ($compile) {
  	return {
  		restrict: 'E',
	    replace: true,/*
	    scope: {
	    	node: '='
	    },*/
	    template: '<li><content contenteditable="true" ng-model="node.content"></content></li>', //'<div ng-model="node.content" contenteditable="true"></div>',
	    link: function(scope, element, attrs, ctrl) {
	    	if (angular.isArray(scope.node.children)) {
					element.append("<nodecollection nodecollection='node.children'></nodecollection>"); 
					$compile(element.contents())(scope);
				}

	     /* // view -> model
	      element.keyup(function() {
	        scope.$apply(function() {
	          ctrl.$setViewValue(element.html());
	        });
	      });

	      // model -> view
	      ctrl.$render = function() {
	        element.html(ctrl.$viewValue);
	      };

	      // load init value from DOM
	      ctrl.$render();*/
	    }
	  };
  });
/*


return {
		restrict: "E",
		replace: true,
		scope: {
			member: '='
		},
		template: "<li>{{member.name}}</li>",
		link: function (scope, element, attrs) {
			if (angular.isArray(scope.member.children)) {
				element.append("<collection collection='member.children'></collection>"); 
				$compile(element.contents())(scope)
			}
		}
	}*/