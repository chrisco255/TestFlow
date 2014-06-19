'use strict';

angular.module('testFlowApp')
  .directive('nodecollection', function () {
    return {
		restrict: "E",
		replace: true,
		//creates an isolate scope so other collections are not affected by changes
		scope: {
			nodecollection: '='
		},
		//filter is used for hiding the children when an obscure filter is applied
		templateUrl: 'templates/nodecollection.html'
	};
  });
