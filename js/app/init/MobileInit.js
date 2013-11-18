// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	// $.mobile.hashListeningEnabled = true;

	// Backbone.history.bind("all", function (route, router) {
	Backbone.history.bind("route", function (route, router) {
		report('MobileInit.js','Backbone.history.bind event >> '+router);
		//console.log(window.location.hash);
		// report('MobileInit.js','document.ready event');
		// Handler for .ready() called.

	// $(document).ready(function() {
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
				if(!isMobile.any()) this.onDeviceReady();
			},
			// deviceready Event Handler
			//
			// The scope of 'this' is the event. In order to call the 'receivedEvent'
			// function, we must explicity call 'app.receivedEvent(...);'
			onDeviceReady: function() {
				report('MobileInit.js','onDeviceReady');
				// alert('onDeviceReady');
				$(document).on("pageshow", function(event, ui) {
					app.receivedEvent();
				});
				/*
				document.addEventListener('DOMComponentsLoaded', function(){
					alert('DOMComponentsLoaded are loaded!');
					console.log("DOMComponentsLoaded are loaded!");
				});
				*/
		   },
			// Update DOM on a Received Event
			receivedEvent: function() {
				report('MobileInit.js','deviceready receivedEvent');
				deviceReady = true;
				cordovaIsLoaded = true;
				// initApp();
				alert(router);
				populateDeviceInfo();
				/*
				(function($) {
					jqueryready = true;
				}(jQuery));
				*/
				// alert('app.initialize >> receivedEvent >> Received Event');
				// report('app.initialize >> receivedEvent','Received Event');
			}
		};
	// });
		app.initialize();
		/*
		report('MobileInit.js','document.ready END');
		*/
	});

	$(document).on("pageinit", function(event, ui) {
	   // jqmReady.resolve();
	   // alert('$(document).on("pageinit", function(event, ui) {');
	   report('$(document).on("pageinit", function(event, ui) {');
	});
	$(document).on("pageshow", function(event, ui) {
	   // jqmReady.resolve();
	   // alert('$(document).on("pageinit", function(event, ui) {');
	   report('$(document).on("pageshow", function(event, ui) {');
	});

    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);