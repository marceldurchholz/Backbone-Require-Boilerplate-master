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
	
	/*****
	// WEITERE ICONS FÜR DAS PAGE OPTIONS MENU:
	// http://api.jquerymobile.com/classes/
	*****/
	/*
	var htmlContent = '';
	htmlContent = '<ul id="pageOptionsDiv" class="ui-listview ui-listview-inset ui-shadow pageOptionsDiv" data-role="listview" data-inset="false" data-theme="a" data-dividertheme="a">';
		htmlContent += '<li  data-roles="seeker"  class="ui-btn ui-btn-icon-left ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-first-child ui-btn-up-a" data-theme="a" data-wrapperels="div" data-iconshadow="false" data-shadow="false" data-corners="false">';
		htmlContent += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
		htmlContent += '<a onClick="javascript:rotatePageOptionsIcon();history.back();return(false);" data-href="#%= sidemenu.urloffline %" class="ui-link-inherit contentLink pageOptionsSelectButton" style="font-size:0.8em;font-weight:normal;">';
		htmlContent += 'Zurück</a></div>';
		htmlContent += '<span class="ui-icon ui-icon-arrow-l ui-icon-shadow">&nbsp;</span></div>';
		htmlContent += '</li>';
		htmlContent += '<li  data-roles="provider"  class="ui-btn ui-btn-icon-left ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-btn-up-a" data-theme="a" data-wrapperels="div" data-iconshadow="false" data-shadow="false" data-corners="false">';
		htmlContent += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
		htmlContent += '<a onClick="javascript:rotatePageOptionsIcon();" href="#videos/record" data-href="#videos/record" class="ui-link-inherit contentLink pageOptionsSelectButton" style="font-size:0.8em;font-weight:normal;">';
		htmlContent += 'Multimediadatei hinzufügen</a></div>';
		htmlContent += '<span class="ui-icon ui-icon-plus ui-icon-shadow">&nbsp;</span></div>';
		htmlContent += '</li>';
		htmlContent += '<li  data-roles="provider"  class="ui-btn ui-btn-icon-left ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-btn-up-a" data-theme="a" data-wrapperels="div" data-iconshadow="false" data-shadow="false" data-corners="false">';
		htmlContent += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
		htmlContent += '<a onClick="javascript:rotatePageOptionsIcon();" href="#cards/edit/" data-href="#cards/edit/" class="ui-link-inherit contentLink pageOptionsSelectButton" style="font-size:0.8em;font-weight:normal;">';
		htmlContent += 'Lernset/Lernkarte hinzufügen</a></div>';
		htmlContent += '<span class="ui-icon ui-icon-plus ui-icon-shadow">&nbsp;</span></div>';
		htmlContent += '</li>';
		htmlContent += '<li  data-roles="provider"  class="ui-btn ui-btn-icon-left ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-btn-up-a" data-theme="a" data-wrapperels="div" data-iconshadow="false" data-shadow="false" data-corners="false">';
		htmlContent += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
		htmlContent += '<a onClick="javascript:rotatePageOptionsIcon();" href="#planer/edit/" data-href="#planer/edit/" class="ui-link-inherit contentLink pageOptionsSelectButton" style="font-size:0.8em;font-weight:normal;">';
		htmlContent += 'Veranstaltung/Termin hinzufügen</a></div>';
		htmlContent += '<span class="ui-icon ui-icon-plus ui-icon-shadow">&nbsp;</span></div>';
		htmlContent += '</li>';
		htmlContent += '<li  data-roles="provider"  class="ui-btn ui-btn-icon-left ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-last-child ui-btn-up-a" data-theme="a" data-wrapperels="div" data-iconshadow="false" data-shadow="false" data-corners="false">';
		htmlContent += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
		htmlContent += '<a onClick="javascript:rotatePageOptionsIcon();" href="#admin/users" data-href="#admin/users" class="ui-link-inherit contentLink pageOptionsSelectButton" style="font-size:0.8em;font-weight:normal;">';
		htmlContent += 'Benutzerverwaltung</a></div>';
		htmlContent += '<span class="ui-icon ui-icon-bars ui-icon-shadow">&nbsp;</span></div>';
		htmlContent += '</li>';
	htmlContent += '</ul>';
	*/

	
	
	/*
	var htmlContent = '';
	htmlContent = '<ul data-role="listview">';
		htmlContent += '<li data-roles="public" 		data-mini="true" data-iconpos="left" data-icon="arrow-l"><a style="font-weight:normal;" onClick="javascript:rotatePageOptionsIcon();history.back();return(false);">Zurück</a></li>';
		htmlContent += '<li data-roles="provider" 		data-mini="true" data-iconpos="left" data-icon="plus"><a style="font-weight:normal;" href="#videos/record">Multimediadatei hinzufügen</a></li>';
		// htmlContent += '<li data-roles="provider" 	data-mini="true" data-iconpos="left" data-icon="plus"><a style="font-weight:normal;" href="#cards/edit/">Lernset/Lernkarte hinzufügen</a></li>';
		// htmlContent += '<li data-roles="provider" 	data-mini="true" data-iconpos="left" data-icon="plus"><a style="font-weight:normal;" href="#planer/edit/">Veranstaltung/Termin hinzufügen</a></li>';
		htmlContent += '<li data-roles="provider" 	data-mini="true" data-iconpos="left" data-icon="bars"><a style="font-weight:normal;" href="#admin/users">Benutzerverwaltung</a></li>';
		htmlContent += '<li data-roles="public" 		data-mini="true" data-iconpos="left" data-icon="grid"><a style="font-weight:normal;" href="#dashboard">Dashboard</a></li>';
	htmlContent += '</ul>';
	*/
	// $( "#pageOptions" ).hide();
	// $( "#pageOptions" ).html(htmlContent);
	// $( "#pageOptions" ).trigger('create');	
	// $('body').on('click', '#showPageOptionsLink', function(e) {
	$('body').off('click','#showPageOptionsLink').on('click','#showPageOptionsLink',function(e) { 
		e.preventDefault();
		// alert('bla');
		showPageOptions();
		checkTopNaviRoles();
	});
	
	$('body').off( "swipeleft swiperight", ".swipeToDelete").on( "swipeleft swiperight", ".swipeToDelete", function( event ) {
		alert('swiped on element');
		var listitem = $(this);
		
		doConfirm('', 'Verlauf löschen?', function (event) { 
			if (event=="1") {
				deleteMessageFlow(listitem);
			}
		}, undefined);

		/*
		var listitem = $( this ),
			// These are the classnames used for the CSS transition
			dir = event.type === "swipeleft" ? "left" : "right",
			// Check if the browser supports the transform (3D) CSS transition
			transition = $.support.cssTransform3d ? dir : false;

			confirmAndDelete( listitem, transition );
		*/
	});
	
	function deleteMessageFlow(listitem) {
		alert('deleteMessageFlow');
		var this_id = listitem.attr('data-id');
		alert(this_id);
		listitem.remove();
	}

  }

);
