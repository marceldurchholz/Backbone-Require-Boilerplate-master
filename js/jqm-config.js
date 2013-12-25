define(['jquery'], function($){ 
  // 'use strict'; 
  	$(document).bind("mobileinit", function () { 
		// alert('mobileinit');
		$.support.cors = true;
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 
		$.mobile.buttonMarkup.hoverDelay = 0;
		$.mobile.defaultPageTransition = 'none'; 
		$.mobile.defaultDialogTransition = "none";
		$.mobile.page.prototype.options.degradeInputs.date = true;
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.ignoreContentEnabled=true;
		// Remove page from DOM when it's being replaced 
		$('div[data-role="page"]').on('pageshow', function (event, ui) { 
			// alert($('#page-content').html());
			// console.log(event);
			// $(event.target).html('');
				$("#page-content").fadeIn( 500, function() {
					// $( "#page-content" ).html('bla');
					// Animation complete
					$('.ui-content').scrollTop(0);
					// $.mobile.loading( 'hide' );
				});
			$.mobile.loading( 'hide' );
			// alert('pageshow');
			// $(ele).remove(); 
			// $('#page-content').remove();
		});
		$('div[data-role="page"]').on('pagehide', function (event, ui) { 
			$("#page-content").hide();
			$.mobile.loading( 'show' );
			// alert('pagehide');
		});
		jqd.resolve();
	}); 
});
