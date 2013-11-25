// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;

	// $( document ).ready(function() {
		// Handler for .ready() called.
		// report('MobileInit.js','document.ready START');
		app.initialize();
		// report('MobileInit.js','document.ready END');	

		$('body').on("click", "a.footervideolink", function (e) {
			// report('footer clicked');
			if (footervideoStatus != true) {
				$("#footer").animate({
					height: "60%",
				}, 300, function () {
					footervideoStatus = true;
				});
				return false;		
			}
			else {
				$("#footer").animate({
					height: "20px",
				}, 300, function () {
					footervideoStatus = false;
				});
				return false;
			}
		});

		$('body').on("click", "a.showMenu", function (e) {
			if (menuStatus != true) {
				$(".ui-page-active").animate({
					marginLeft: "175px",
				}, 300, function () {
					menuStatus = true;
				});
				return false;
			} else {
				$(".ui-page-active").animate({
					marginLeft: "0px",
				}, 300, function () {
					menuStatus = false;
				});
				return false;
			}
		});
		$('body').on("click", "#menuelement a.contentLink", function (e) {
			$(".ui-page-active").animate({
				marginLeft: "0px",
			}, 300, function () {
				menuStatus = false;
			});
		});
	// });
	
       // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);