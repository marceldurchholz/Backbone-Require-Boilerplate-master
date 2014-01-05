  // 'use strict'; 
	// alert('jqm-config.js');
	
  	$(document).off("pageshow").on("pageshow", function () { 
		// alert('func');
		$(document).off('click','#blaclick').on('click','#blaclick',function(event){
			event.preventDefault();
			alert('clicked');
		});
		$(document).off('click','#footervideolink').on('click','#footervideolink',function(event){
			// report('footer clicked');
			if (footervideoStatus != true) {
				$("#footer").animate({
					height: "40%",
				}, 500, function () {
					footervideoStatus = true;
				});
			}
			else {
				$("#footer").animate({
					height: "20px",
				}, 500, function () {
					footervideoStatus = false;
				});
			}
			return false;
		});

		$(document).off('click','#showMenu').on('click','#showMenu',function(event){
			// alert('clicked');
			if (menuStatus != true) {
				$("div.ui-page-active").animate({
					left: "235px",
				}, 500, function () {
					menuStatus = true;
					menuSwitched(true);
				});
			} else {
				$("div.ui-page-active").animate({
					left: "100px",
				}, 500, function () {
					menuStatus = false;
					menuSwitched(false);
				});
			}
			return false;
		});
		$(document).off('click','#sidebarListViewDiv').on('click','#sidebarListViewDiv',function(event){
			event.preventDefault();
			$("div.ui-page-active").animate({
				left: "0px",
			}, 500, function () {
				menuStatus = false;
				menuSwitched(false);
				// console.log(event.target.hash);
				// system.redirectToUrl(event.target.hash);
				window.location.href = event.target.hash;
				// alert('getURLParameter(window.location.href): ' + getURLParameter(window.location.href));
				// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
				// $.mobile.changePage( "#aboutus" , { reverse: false, changeHash: false } );
			});
		});
	});
	
  	$(document).bind("mobileinit", function () { 
		// alert('mobileinit');

		$.support.cors = true;
		$.mobile.ajaxEnabled = false;
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false; 

		/*
        $.mobile.defaultDialogTransition = "slide";
        $.mobile.defaultPageTransition = "slide";
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;

	    //enable flag to disable rendering
        $.mobile.ignoreContentEnabled=true;
        $.mobile.phonegapNavigationEnabled = true;
        // enable loading page+icon
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
		*/

		/*
		$('div[data-role="page"]').on('pagehide', function (event, ui) {
			alert('false');
			console.log(event.currentTarget);
			// $(event.currentTarget).remove();
		});
		*/

		// $('div[data-role="page"]').on('pagehide', function (event, ui) { 
		/*
		$('#flexiblecontent').on('pageshow', function (event, ui) { 
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
		$('#flexiblecontent').on('pagehide', function (event, ui) { 
			alert('on page hide');
			$(event.currentTarget).remove();
		});
		*/
		
		this.router = window.MobileRouter;

		// jqd.resolve();
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
