'use strict';

angular.module('testFlowApp')
	.directive('rootnode', function () {
		var directive = {};

		/*directive.template = '<div ng-repeat="node in root.children"><p ng-model="node.content"></p></div>';*/
		directive.restrict = 'E';

		directive.compile = function(element, attrs) {

			var linkFunction = function($scope, element, attributes) {
				element.keydown(function (event) {
					//if user presses enter key, stop the default behavior
					if(event.which === 13) {
						event.preventDefault();
						$scope.enterKeyHandler();
						$scope.$apply();
						/*
						$root = $(event.target);
						$root.focus();*/

						//TODO: Construct the HTML so this selector is not so shoddy
						var newElement = $(window.getSelection().focusNode).parent().parent().next().children("p");
						
    				placeCaretAtEnd( newElement.get(0) );
					}



					/*// model -> view
					ctrl.$render = function() {
						element.html(ctrl.$viewValue);
					};

					// load init value from DOM
					ctrl.$render();*/
				});
				
			};

			return linkFunction;
		};

		return directive;

		function placeCaretAtEnd(el) {
			el.focus();
			if (typeof window.getSelection != "undefined"
			&& typeof document.createRange != "undefined") {
				var range = document.createRange();
				range.selectNodeContents(el);
				range.collapse(false);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (typeof document.body.createTextRange != "undefined") {
				var textRange = document.body.createTextRange();
				textRange.moveToElementText(el);
				textRange.collapse(false);
				textRange.select();
			}
		}
	});
