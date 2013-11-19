// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	report('MobileInit.js','START');
    
	// $('#body').append('<div id="sidebar"></div>');
	
	// Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	// $.mobile.hashListeningEnabled = true;

	window.addEventListener('jqm-ready', function(){
		alert("detected jqm-ready");
		// run some code
	});
	document.addEventListener('mobileinit', function(){
		// ^----- TYPO HERE (should be mobileinit)
		alert('mobileinit');
	});
	
	/*
	$('body').on("click", ".showMenu", function (e) {
		alert('bla');
	});
	*/
	$('body').on("click", "a.showMenu", function (e) {
		// alert('clicked');
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
		// alert('#menuelement a.contentLink clicked');
		$(".ui-page-active").animate({
			marginLeft: "0px",
		}, 300, function () {
			menuStatus = false;
		});
	});
	
	/*
	$(document).on("pagebeforecreate", function(event, ui) {
		report('pagebeforecreate');
		$(document).ready(function() {
			report('pagebeforecreate & documentready');
		});
	});
	$(document).on("pagecreate", function(event, ui) {
		report('pagecreate');
		$(document).ready(function() {
			report('pagecreate & documentready');
		});
	});
	$(document).on("pageinit", function(event, ui) {
	   report('pageinit');
		$(document).ready(function() {
			report('pageinit & documentready');
		});
	});
	$(document).on("pageshow", function(event, ui) {
		report('pageshow');
		$(document).ready(function() {
			report('pageshow & documentready');
		});
	});
	$(document).ready(function() {
		report('documentready');
		});
	*/
	
	// Backbone.history.bind("all", function (route, router) {
	// $(document).ready(function() {
	// if (!app) 
	var app = {
		// Application Constructor
		initialize: function() {
			this.bindEvents();
			report('MobileInit.js','var app.initialize();');
			// alert('var app');
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
			if(!isMobile.any()) {
				// setTimeout(this.onDeviceReady,1000);
				this.onDeviceReady();
			}
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function() {
			report('MobileInit.js','onDeviceReady');
			deviceReady = true;
			cordovaIsLoaded = true;
			this.receivedEvent();
			// alert('onDeviceReady');
			// $(document).on("pageshow", function(event, ui) {
			// });
			/*
			document.addEventListener('DOMComponentsLoaded', function(){
				alert('DOMComponentsLoaded are loaded!');
				console.log("DOMComponentsLoaded are loaded!");
			});
			*/
	   },
		// Update DOM on a Received Event
		receivedEvent: function() {
			setTimeout(function() {
				report('MobileInit.js','this.receivedEvent START');
				$( document ).ready(function() {
					// initApp();
					/*
					(function($) {
						jqueryready = true;
					}(jQuery));
					*/
					// alert('this.initialize >> receivedEvent >> Received Event');
					// report('this.initialize >> receivedEvent','Received Event');
				});
			},0);
		}
	};
	
	
	// opened file / location on- or offline?
	// report('Backbone.history.location.href',Backbone.history.location.href);
	
	Backbone.history.bind("route", function (route, router) {
		report('MobileInit.js','Backbone.history.bind event >> '+router);
			// alert(router);
			$( document ).ready(function() {
				// if ('router' == 'testarea') {
					report('functions.js','populateDeviceInfo() for testarea when route changed and document ready');
					setTimeout(populateDeviceInfo,1000);
				// }
			});
				
		//console.log(window.location.hash);
		// report('MobileInit.js','document.ready event');
		// Handler for .ready() called.

	// });
		/*
		report('MobileInit.js','document.ready END');
		*/
	});

	app.initialize();
    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);