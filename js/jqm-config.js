define(['jquery'], function($){ 
  // 'use strict'; 
	// alert('jqm-config.js');
  	$(document).on("mobileinit", function () { 
		alert('mobileinit');
		$.support.cors = true;
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 
		
        $.mobile.ajaxEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.linkBindingEnabled = false; //-- works properly with jqm 1.1.1 rc1

        // use ? $.mobile.autoInitializePage = false;

        $.mobile.defaultDialogTransition = "none";
        $.mobile.defaultPageTransition = "slidedown";
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;

        //enable flag to disable rendering
        // $.mobile.ignoreContentEnabled=true;
        $.mobile.pushStateEnabled = true;
        $.mobile.phonegapNavigationEnabled = true;
        // enable loading page+icon
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
    });
	/*
  	$(document).bind("mobileinit", function () { 
		alert('foo');
		// alert('mobileinit');
		$.support.cors = true;
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 
		
        $.mobile.ajaxEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.linkBindingEnabled = false; //-- works properly with jqm 1.1.1 rc1

        // use ? $.mobile.autoInitializePage = false;

        $.mobile.defaultDialogTransition = "none";
        $.mobile.defaultPageTransition = "slidedown";
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;

        //enable flag to disable rendering
        // $.mobile.ignoreContentEnabled=true;
        $.mobile.pushStateEnabled = true;
        $.mobile.phonegapNavigationEnabled = true;
        // enable loading page+icon
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
		
		$.mobile.buttonMarkup.hoverDelay = 0;
		$.mobile.pageContainer = $('#container');
		$.mobile.defaultPageTransition = 'slide';
		$.mobile.defaultDialogTransition = "none";
		$.mobile.page.prototype.options.degradeInputs.date = true;
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.ignoreContentEnabled=true;
		
		// Remove page from DOM when it's being replaced 
		$('div[data-role="page"]').on('pagehide', function (event, ui) { 
			alert('on page hide');
			$(event.currentTarget).remove();
			// alert($('#page-content').html());
			// console.log(event);
			// $(event.target).html('');
			// $.mobile.loading( 'hide' );
			// alert('pagehide');
			// $(ele).remove(); 
			// $('#page-content').remove();
			// app.initialize();
		});
		// jqd.resolve();
	}); 
	*/
});
