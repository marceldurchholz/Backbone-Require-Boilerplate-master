// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	report('MobileInit.js','START');
    
	
	// Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;
    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	// $.mobile.hashListeningEnabled = true;
	
	
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
	

	var jqmReady = $.Deferred();
	var pgReady = $.Deferred();

	
	var app = {
		callback: function() {
			report('var app','app.callback');
			deviceReady = true;
			cordovaIsLoaded = true;
			report('app.callback','populateDeviceInfo()');
			setTimeout("populateDeviceInfo();",1000);
		},
		initialize: function() {
			report('MobileInit.js','var app.initialize();');
			// this.callback = callback;
			if(isMobile.any()) {
				report("var app",">> IS NOT MOBILE");
				this.bindEvents();
			}
			else {
				report("var app",">> IS MOBILE");
				//In case of web we ignore PG but resolve the Deferred Object to trigger initialization
				pgReady.resolve();
			}
		},
		bindEvents: function() {
			// document.addEventListener('load', this.onDeviceReady, false);
			// document.addEventListener('offline', this.onDeviceReady, false);
			// document.addEventListener('online', this.onDeviceReady, false);
			document.addEventListener('deviceready', this.onDeviceReady, false);
			/*
			if(!isMobile.any()) {
				this.onDeviceReady();
			}
			*/
		},
		onDeviceReady: function() {
			/*
			report('MobileInit.js','onDeviceReady');
			deviceReady = true;
			cordovaIsLoaded = true;
			app.receivedEvent('deviceready');
			*/
			app.receivedEvent('deviceready');
	   },
		receivedEvent: function(event) {
			// report('***** var app','receivedEvent');
			switch(event) {
				case 'deviceready':
					pgReady.resolve();
					/*
					setTimeout(function() {
						report('MobileInit.js','app.receivedEvent w timeout 0');
						$( document ).ready(function() {
							report('MobileInit.js','app.receivedEvent AND document.ready in w timeout 0');
						});
					},0);
					*/
				break;
			}
		}
	};
	
	
	$(document).on("pageinit", function(event, ui) {
	   report('document','pageinit');
	   jqmReady.resolve();
	});
	/**
	 * General initialization.
	 */
	$.when(jqmReady, pgReady).then(function() {
	   //Initialization code here
	   report("$.when","Frameworks ready.");
	   if(app.callback) {
		  app.callback();
	   }
	});

	/*
	Backbone.history.bind("route", function (route, router) {
		report('MobileInit.js','Backbone.history.bind event >> '+router);
		// alert(router);
		$( document ).ready(function() {
			// if ('router' == 'testarea') {
				report('functions.js','populateDeviceInfo() for testarea when route changed and document ready');
				setTimeout("populateDeviceInfo();",1000);
			// }
		});
	});
	*/
	

	app.initialize();
    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);





	//console.log(window.location.hash);
	// opened file / location on- or offline?
	// report('Backbone.history.location.href',Backbone.history.location.href);
	/*
	window.addEventListener('jqm-ready', function(){
		alert("detected jqm-ready");
		// run some code
	});
	document.addEventListener('mobileinit', function(){
		// ^----- TYPO HERE (should be mobileinit)
		alert('mobileinit');
	});
	*/
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
