// MobileInit.js
// -------------

require(["jquery", "backbone"],

  function($, Backbone) {
	
	// Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;
    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	// $.mobile.hashListeningEnabled = true;
	
	var jqmReady = $.Deferred();
	var pgReady = $.Deferred();
	
	// $(document).on("mobileinit", function(event, ui) {
	$(document).on("mobileinit", function(event, ui) {
		   alert('MobileInit.js >> pageinit');
		   jqmReady.resolve();
		});
			
	/*
	// $(document).ready(function(){
		$(document).on("pageinit", function(event, ui) {
			   report('MobileInit.js','$(document).on("pageinit", function(event, ui) { jqmReady.resolve(); }');
			   jqmReady.resolve();
			$(document).on("pagecreate", function(event, ui) {
			});
		});
	// });
	*/
	
	/*
	$(document).on("pageinit", function(event, ui) {
	   report('MobileInit.js','$(document).on("pageinit", function(event, ui) { jqmReady.resolve(); }');
	   jqmReady.resolve();
	});

	$.when(jqmReady).then(function() {
		//Initialization code here
		report("MobileInit.js","jqmReady");
	});
	$.when(pgReady).then(function() {
		//Initialization code here
		report("MobileInit.js","pgReady");
	});
	*/
	$.when(jqmReady, pgReady).then(function() {
		//Initialization code here
		report("MobileInit.js","$.when(jqmReady, pgReady).then(function() { app.callback(); }");
		alert('both ready');
		/*
		if (app.callback) {
			app.callback();
			report('app.callback');
		}
		else {
			alert('app.callback undefined');
		}
		*/
	});
	
	$('body').on("click", "a.footervideolink", function (e) {
		// alert('footer clicked');
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
	
	function populateData(){
		alert('MobileInit.js >> populateData() START');
		// report('MobileInit.js','populateData() START');
		// doAlert('TEST','--> populateData()..');
		/*
		try {
			if (!device) alert('device not defined');
			else alert('device defined');
			// document.getElementById("device_internet").innerHTML = 'bla';
			// document.getElementById("user-agent").textContent = navigator.userAgent;
			// document.getElementById("platform").innerHTML = device.platform;
		} catch(e){ 
			catchError('populateData()',e); 
		}
		*/
	}

	var app = {
		callback: function() {
			alert('MobileInit.js >> var app:callback');
			// report('MobileInit.js','var app:callback');
			// setTimeout("populateData();",3000);
			// if (!device) alert('device not defined');
			// else alert('device defined');
			// populateData();
		},
		initialize: function() {
			report('MobileInit.js','var app:initialize');
			// this.callback = callback;
			alert("MobileInit.js >> initialize");
			if(!isMobile.any()) {
				pgReady.resolve();
				deviceReady = true;
				cordovaIsLoaded = true;
			}
			else {
				report("MobileInit.js","IS MOBILE DEVICE");
				this.bindEvents();
			}
		},
		bindEvents: function() {
			// document.addEventListener('load', this.onDeviceReady, false);
			// document.addEventListener('offline', this.onDeviceReady, false);
			// document.addEventListener('online', this.onDeviceReady, false);
			document.addEventListener('deviceready', this.onDeviceReady, false);
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
			alert("MobileInit.js >> receivedEvent");
			report('***** var app','receivedEvent');
			deviceReady = true;
			cordovaIsLoaded = true;
			pgReady.resolve();
			/*
			setTimeout(function() {
				report('MobileInit.js','app.receivedEvent w timeout 0');
				$( document ).ready(function() {
					report('MobileInit.js','app.receivedEvent AND document.ready in w timeout 0');
				});
			},0);
			*/
		}
	};	

	app.initialize();
	
  }

);

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	report('MobileInit.js','START');
    
	// Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;
    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	// $.mobile.hashListeningEnabled = true;
		
	Backbone.history.bind("route", function (route, router) {
		report('MobileInit.js','Backbone.history.bind event >> '+router);
		var router = Backbone.history.fragment;
		// alert(router);
		// report('MobileInit.js','router: '+router);
		// populateData(router);
	});
	
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
