'use strict';

angular.module('testFlowApp')
  .directive('contenteditable', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the contenteditable directive');
      }
    };
  });

/*angular.module('testFlowApp')
	.directive('contenteditable', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ctrl) {
	      // view -> model
	      element.bind('blur', function() {
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
	});*/
