'use strict';

angular.module('testFlowApp')
	.directive('node', function ($compile) {
		
		return {
			restrict: 'E',
			replace: true,
			template: '<li ng-show="isCollapsible" ng-class="{ animate: isCollapsible }"><span class="expandable"><i class="fa fa-plus"></i></span><span ng-click="collapseHandler()" class="collapsible"><i class="fa fa-minus"></i></span><span class="bullet"></span><content contenteditable="true" ng-model="node.content"></content></li>',
			link: function(scope, element, attrs, ctrl) { 	
				scope.isCollapsible = scope.isCollapsible === undefined ? true : scope.isCollapsible;
				// prevent double binding of events
				var collapseElements = element.children(".collapsible, .expandable");
				var collapseEvents = $._data(collapseElements[0], 'events');
				if(!collapseEvents) {
					collapseElements.click(function() {
						scope.$root.$$childHead.collapseHandler(scope);
					});
				}

				element
					.mouseover(function(event) {
						event.stopPropagation();
						$(".collapsible, .expandable").hide();
						if(scope.node.children.length > 0) {
							element.children(".collapsible").show();
						}
					})
					.mouseleave(function() {
						element.children(".collapsible, .expandable").hide();
					});
				
				var strForHover = "Add Note <br> Add Attachment <br> Annotate <br> View Annotations <br> Delete"
								
				// When a bullet is created, add a mouseover event listener
				element.children(".bullet").popover({ trigger: "manual" , html: true, placement: 'bottom', content: strForHover})
					// When the pointer hovers on span image
				.on("mouseenter", function () {
					var _this = this;
					// Wait 300 ms
					setTimeout(function() {
						// If not hovering in another bullet
						if ($(".bullet:hover")[0] === _this){
							// Show the popover
							 $(_this).popover("show");
							 // If the pointer leaves popover, hide the popover
							 $(".popover").on("mouseleave", function () {
									$(_this).popover('hide');
							 }); 
						}						
					}, 300);					
				 // If pointer leaves the span image
				 }).on("mouseleave", function () {
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

				if (angular.isArray(scope.node.children)) {
					element.append("<nodecollection nodecollection='node.children'></nodecollection>"); 
					$compile(element.contents())(scope);
				}
			}
		};
	});
