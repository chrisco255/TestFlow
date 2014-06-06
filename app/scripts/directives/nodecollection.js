'use strict';

angular.module('testFlowApp')
  .directive('nodecollection', function () {
    return {
		restrict: "E",
		replace: true,
		scope: {
			nodecollection: '='
		},
		template: "<ul><node ng-repeat='node in nodecollection | filter: { content: nodecollection.collapsed}' node='node'></node></ul>",
		compile: function(element, attrs) {
			return function(scope, element, attrs) {

			};
		}
	};
  });
