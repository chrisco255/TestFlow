'use strict';

angular.module('testFlowApp')
  .directive('content', function () {
    return {
    	restrict: 'E',
	    require: 'ngModel',
	    link: function(scope, element, attrs, ctrl) {
	      // view -> model
	      element.bind('keyup', function() {
	        scope.$apply(function() {
	          ctrl.$setViewValue(element.html());
	        });
	      });

	      // model -> view
	      ctrl.$render = function() {
	        element.html(ctrl.$viewValue);
	      };

	      // load init value from DOM
	      ctrl.$render();
	    }
	  };
  });
