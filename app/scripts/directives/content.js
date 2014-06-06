'use strict';

angular.module('testFlowApp')
	.directive('content', function () {
		return {
			restrict: 'E',
			require: 'ngModel',
			compile: function(element, attrs) {

				// due to virtual node being created during compile process
				// look for a class attribute to be sure this is the one attached to
				// the DOM.  Also check for the pre-tag for debugging purposes
				if(element.attr("class") && !element.closest("pre")[0]) {
					placeCaretAtEnd(element[0]);
				}

				var link = function(scope, element, attrs, ctrl) {
					var rootScope = scope.$root.$$childHead;

					// prevent double binding of events
					var elEvents = $._data(element[0], 'events');
					if(!elEvents) {
						element.keydown(function(event) {
							// enter key
							if(event.which === 13) {
								// stop default behavior of creating a new line
								event.preventDefault();
								// push a new sibling or if there are children, prepend a new child
								rootScope.enterKeyHandler(scope);
							}

							// tab key
							if(event.which === 9) {
								// stop default behavior of creating a new line
								event.preventDefault();

								if(event.shiftKey) {
									// move a branch up the tree
									rootScope.shiftTabHandler(scope);
								} else {
									// append the branch
									rootScope.tabHandler(scope);			
								}
							}

							//up key or down key
							if(event.which === 38 || event.which === 40) {
								// stop default behavior of creating a new line
								event.preventDefault();

								//get a list of all the content elements and the index of the current element
								var contents = element.closest("#content").find("content");
								var index = _.indexOf(contents, element[0]);

								//move the cursor up or down depending on which key the user presses
								if(event.which === 38 && index > 0) {
									placeCaretAtEnd(contents[index-1]);
								} else if(event.which === 40 && index < contents.length - 1) {
									placeCaretAtEnd(contents[index+1]);
								}
							}

							//backspace
							if(event.which === 8) {
								//remove node from nodecollection if there are no children
								if(element.text() === "") {
									//get a list of all the content elements and the index of the current element
									var contents = element.closest("div").find("content");
									var index = _.indexOf(contents, element[0]);
									var didRemoveNode = rootScope.backspaceHandler(scope);

									if(didRemoveNode) {
										event.preventDefault();
										placeCaretAtEnd(contents[index-1]);
									}
								}
							}

							// Timeout of zero causes this to function to run after the current one 
							// is complete.  Makes sure the view is updated before the model value gets updated.
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
		
		//places cursor at the end of a given html element
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
