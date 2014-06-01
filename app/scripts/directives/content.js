'use strict';

angular.module('testFlowApp')
  .directive('content', function () {
    return {
    	restrict: 'E',
	    require: 'ngModel',
	    compile: function(element, attrs) {
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

				if(element.attr("class")) {
					placeCaretAtEnd(element[0]);
				}/*

	    	console.log("Content compiled");*/

	    	var link = function(scope, element, attrs, ctrl) {
		    	var elEvents = $._data(element[0], 'events');
		      if(!elEvents) {
			      element.bind('keydown', function() {
			      	if(event.which === 13) {
			      		//stop default behavior of creating a new line
								event.preventDefault();

								//push a new sibling or if there are children, prepend a new child
								scope.$root.$$childHead.enterKeyHandler(scope);

								//send the cursor to the newly created element

								/*
								$root = $(event.target);
								$root.focus();*/

								//TODO: Construct the HTML so this selector is not so shoddy
								/*var newElement = $(window.getSelection().focusNode).parent().parent().next().children("p");
								
								placeCaretAtEnd( newElement.get(0) );*/
							}

							setTimeout(function() {
					      // view -> model
				      	scope.$apply(function() {
				        	ctrl.$setViewValue(element.html());
				      	});
			      	}, 0);
			      });
		      }

		      // model -> view
		      ctrl.$render = function() {
		        element.html(ctrl.$viewValue);
		      };

		      // load init value from DOM
		      ctrl.$render();
	      };

	      return link;
	    }
	  };
  });
