'use strict';

angular.module('testFlowApp')
  .directive('node', function ($compile) {
  	return {
  		restrict: 'E',
	    replace: true,
	    template: '<li><span class="bullet"></span><content contenteditable="true" ng-model="node.content"></content></li>',
	    link: function(scope, element, attrs, ctrl) {

	    	
	    	
	    	// When a bullet is created, add a mouseover event listener
	    	element.children(".bullet").popover({ trigger: "manual" , html: true, placement: 'bottom', content: 'hello'})
	    		// When the pointer hovers on span image, show popover
				.on("mouseenter", function () {
					var _this = this;
					   $(this).popover("show");
					   // Hide if the pointer leaves popover
					   $(".popover").on("mouseleave", function () {
					      $(_this).popover('hide');
					   });
			   // If pointer is not inside popover AND the pointer leaves the span image, hide the popover
			   }).on("mouseleave", function () {
	         var _this = this;
            setTimeout(function () {
              	if (!$(".popover:hover").length) {
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