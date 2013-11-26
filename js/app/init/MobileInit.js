// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;	
	$.mobile.buttonMarkup.hoverDelay = 0;
	$.mobile.defaultPageTransition = 'none'; 
	$.mobile.defaultDialogTransition = "none";
	$.mobile.page.prototype.options.degradeInputs.date = true;
	$.mobile.page.prototype.options.domCache = false;
	$.mobile.ignoreContentEnabled=true;

	$.when(dd, jqd).done(function doInit() {
		populateDeviceInfoTimer();
		// Returns the MobileRouter class
	});
	app.initialize();

	$(window).bind('hashchange', function(){
		// currentHash = window.location.hash;
		// console.log(window.location.hash);
		// alert('MobileInit.js '+window.location.hash);
		populateDeviceInfoTimer();
	});
		
	$('body').on("vclick", "a.footervideolink", function (e) {
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

	$('body').on("vclick", "a.showMenu", function (e) {
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
	$('body').on("vclick", "#menuelement a.contentLink", function (e) {
		$(".ui-page-active").animate({
			marginLeft: "0px",
		}, 300, function () {
			menuStatus = false;
			// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
		});
	});
	
	// Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);



