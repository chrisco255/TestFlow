'use strict';

angular.module('testFlowApp')
  .directive('nodecollection', function () {
    return {
		restrict: "E",
		replace: true,
		scope: {
			nodecollection: '='
		},
		template: "<ul><node ng-repeat='node in nodecollection' node='node'></node></ul>"
	};
  });
