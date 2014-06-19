'use strict';

angular.module('testFlowApp')
	.directive('node', function ($compile, EventHandlers) {
		
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/node.html',
			link: function(scope, element, attrs, ctrl) {
				scope.clickNode = scope.clickNode || function(scope) {
					EventHandlers.ClickNode(scope, element);
				};

				//bound to the collapse node icon
				scope.collapse = scope.collapse || function(scope) {
					EventHandlers.Collapse(scope);
				};

				//bound to the expand node icon
				scope.expand = scope.expand || function(scope) {
					EventHandlers.Expand(scope);
				};

				//show or hide the expand/collapse icons depending on if the node has children or not
				element
					.mouseover(function(event) {
						event.stopPropagation();
						$(".col-exp").hide();
						if(scope.node.children.length > 0) {
							element.children(".col-exp").show();
						}
					})
					.mouseleave(function() {
						element.children(".col-exp").hide();
					});
				
				//text options for the hover menu
				var strForHover = "Add Note <br> Add Attachment <br> Annotate <br> View Annotations <br> Delete"
								
				// When a bullet is created, add a mouseover event listener
				element.children(".bullet").popover({ trigger: "manual" , html: true, placement: 'bottom', content: strForHover})
					// When the pointer hovers on span image
					.on("mouseenter", function () {
						var _this = this;
						// Wait 300 ms
						setTimeout(function() {
							// If not hovering in another bullet
							if ($(".bullet:hover")[0] === _this) {
								// Show the popover
								$(_this).popover("show");
								// If the pointer leaves popover, hide the popover
								$(".popover").on("mouseleave", function () {
									$(_this).popover('hide');
								}); 
							}						
						}, 300);
						// If pointer leaves the span image
					})
					.on("mouseleave", function () {
						var _this = this;
						// Wait 100ms
						setTimeout(function () {
							// If not hovering in ANY popover
							if (!$(".popover:hover").length) {
								// Hide the popover
								$(_this).popover("hide")
							}
						}, 100);
					});

				//isArray check necessary to stop adding new elements if there are no children
				if (angular.isArray(scope.node.children)) {
					element.append("<nodecollection nodecollection='node.children'></nodecollection>"); 
					$compile(element.contents())(scope);
				}
			}
		};
	});