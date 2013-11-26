// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;	

	$(window).bind('hashchange', function(){
		// currentHash = window.location.hash;
		// console.log(window.location.hash);
		alert('MobileInit.js '+window.location.hash);
		setTimeout(function() {
			// alert("Hello");
			populateDeviceInfo();
		},1000);
	});
	
	app.initialize();
	/*
	$.when(dd, jqd).done(doInit);
	
	function doInit() {
		alert('both ready');
		// $(document).on("pageinit", function(){
			alert('pagecreate');
			populateDeviceInfo();
		// });	
	}
	*/
	
	// report('MobileInit.js','document.ready END');	

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



