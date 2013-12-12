define(['jquery'], function($){ 
  'use strict'; 
  	$(document).bind("mobileinit", function () { 
		alert('mobileinit');
		// $.support.cors = true;
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 
		/*
		$.mobile.buttonMarkup.hoverDelay = 0;
		$.mobile.defaultPageTransition = 'none'; 
		$.mobile.defaultDialogTransition = "none";
		$.mobile.page.prototype.options.degradeInputs.date = true;
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.ignoreContentEnabled=true;
		*/
		// Remove page from DOM when it's being replaced 
		$('div[data-role="page"]').on('pagehide', function (event, ui) { 
			$(event.currentTarget).remove(); 
			alert('bla');
		}); 
	}); 
});
