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
		// alert('b');
	};
	*/
	
	window.addEventListener('load', function () {
		new FastClick(document.body);
	}, false);

	/*
	$(window).bind('hashchange', function(){
		// currentHash = window.location.hash;
		// console.log(window.location.hash);
		// alert('MobileInit.js '+window.location.hash);
		populateDeviceInfoTimer();
	});
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
	
	$('#footervideolink').on("vclick", function (e) {
		// report('footer clicked');
		if (footervideoStatus != true) {
			$("#footer").animate({
				height: "60%",
			}, 300, function () {
				footervideoStatus = true;
			});
		}
		else {
			$("#footer").animate({
				height: "20px",
			}, 300, function () {
				footervideoStatus = false;
			});
		}
		return false;
	});

	$('#showMenu').on("vclick", function (e) {
		if (menuStatus != true) {
			$("#flexiblecontent").animate({
				marginLeft: "190px",
			}, 300, function () {
				menuStatus = true;
			});
		} else {
			$("#flexiblecontent").animate({
				marginLeft: "0px",
			}, 300, function () {
				menuStatus = false;
			});
		}
		return false;
	});
	$('#sidebar').on("vclick", "#menuelement a.contentLink", function (e) {
		$("#flexiblecontent").animate({
			marginLeft: "0px",
		}, 300, function () {
			menuStatus = false;
			// alert('getURLParameter(window.location.href): ' + getURLParameter(window.location.href));
			// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
			// $.mobile.changePage( "#aboutus" , { reverse: false, changeHash: false } );
		});
		// return false;
	});
	
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
	app.initialize();
	// LocalStorageAdapter = new LocalStorageAdapter();
	// myLocalStorage.initialize();

	
	// Instantiates a new Mobile Router instance
	new MobileRouter();
  }

);
