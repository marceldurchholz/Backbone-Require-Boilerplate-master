// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll", "backbone.LocalStorage"],

  function($, Backbone, MobileRouter, LocalStorageAdapter) {

	/*
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.ajaxEnabled = false;
	$.mobile.hashListeningEnabled = false;	
	$.mobile.linkBindingEnabled = false;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0;
	$.mobile.defaultPageTransition = 'none'; 
	$.mobile.defaultDialogTransition = "none";
	$.mobile.page.prototype.options.degradeInputs.date = true;
	$.mobile.page.prototype.options.domCache = false;
	$.mobile.ignoreContentEnabled=true;
	$.mobile.document.unbind("pageshow");
	$.mobile.document.bind("pageshow", $.mobile.ajaxwhenpageshowed );
	$.mobile.ajaxwhenpageshowed = function ajaxwhenpageshowed() {
		alert('b');
	};
	*/
	
	// $(document).on('login', function () {
	/*
	$('body').on("login", function () {
		alert('doing action login');
		FB.login(function(response) {
			alert("Logged In");
		}, {scope: 'publish_actions,user_status,friends_status,read_stream'});
		return false;
	});
	*/
	
	/*
	$('body').on('vclick', '#reset', function() {
		report('reset');
		dao.dropTable(function() {
		   // dao.createTable();
		});
	});

	$('body').on('vclick', '#create', function() {
		report('create');
		dao.createTable();
		return false;
	});

	$('body').on('vclick', '#fill', function() {
		report('fill');
		dao.fillTable();
		return false;
	});

	$('body').on('vclick', '#sync', function() {
		report('sync');
		dao.sync(renderList);
		return false;
	});

	$('body').on('vclick', '#render', function() {
		report('render');
		renderList();
		return false;
	});

	$('body').on('vclick', '#clearLog', function() {
		report('clearLog');
		$('#log').val('');
		return false;
	});
	*/

	// Initialize the app
	// alert('app.initialize()');
	// app.initialize();
	
	// var deviceReadyDeferred = new jQuery.Deferred();
	
	window.MobileRouter = MobileRouter;

	app.initialize();
	// alert(blay);

	// LocalStorageAdapter = new LocalStorageAdapter();
	// myLocalStorage.initialize();

	
	// Instantiates a new Mobile Router instance
	/*
	var CreateMobileRouter = function() {
		new MobileRouter();
	}
	*/
	// window.appRouter = new MobileRouter();
	// CreateMobileRouter();
  }

);
