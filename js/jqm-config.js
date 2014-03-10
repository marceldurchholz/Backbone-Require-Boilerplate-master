define(['jquery'], function($){ 
  // 'use strict'; 
	// alert('jqm-config.js');
  	$(document).bind("mobileinit", function () { 
		// alert('mobileinit');
		$.support.cors = true;
		$.mobile.ajaxEnabled = true; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 
		$.mobile.buttonMarkup.hoverDelay = 0;
		// $.mobile.pageContainer = $('#container');
		$.mobile.defaultPageTransition = 'slide';
		$.mobile.defaultDialogTransition = "none";
		$.mobile.page.prototype.options.degradeInputs.date = true;
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.ignoreContentEnabled=true;

		/*
		pageScript(function($context){
		  $context.bind("pagebeforecreate", function(event, ui) {
			console.log("The DOM is untouched by jQM");
		  });

		  $context.bind("pagecreate", function(event, ui) {
			console.log("The page is ready!");
		  });
		  
		  $context.bind("pagebeforeshow", function(event, ui) {
			console.log("Before show");
		  });

		  $context.bind("pageshow", function(event, ui) {
			console.log("Show");
			$( ".dynspace_small" ).each(function(index, value) {
				var content = $(this).html(); // attr('data-roles');
				alert(content);
			});
		  });

		  $context.bind("pagebeforehide", function(event, ui) {
			console.log("Before hide");
		  });

		  $context.bind("pagehide", function(event, ui) {
			console.log("Hide");
			$(event.currentTarget).remove();
		  });
		});
		
		// Remove page from DOM when it's being replaced 
		$('div[data-role="page"]').on('pagehide', function (event, ui) { 
			// alert('on page hide');
			$(event.currentTarget).remove();
			// alert('bla');
			// alert($('#page-content').html());
			// console.log(event);
			// $(event.target).html('');
			// $.mobile.loading( 'hide' );
			// alert('pagehide');
			// $(ele).remove(); 
			// $('#page-content').remove();
			// app.initialize();
		});
		*/
		// jqd.resolve();
	}); 
});
