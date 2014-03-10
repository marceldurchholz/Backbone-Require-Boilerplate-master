// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll", "backbone.LocalStorage"],

  function($, Backbone, MobileRouter, LocalStorageAdapter) {

	/*
	dpd.messages.get({}, function (arr,err) {
		if(err) {
			return console.log(err);
		}
		$.each( arr, function( key, message ) {
			dpd.messages.del(message.id, function (err) {
			  if(err) console.log(err);
			});						
		});
	});

	dpd.orders.get({}, function (arr,err) {
		if(err) {
			return console.log(err);
		}
		$.each( arr, function( key, message ) {
			dpd.orders.del(message.id, function (err) {
			  if(err) console.log(err);
			});						
		});
	});

	dpd.users.get({}, function (arr,err) {
		if(err) {
			return console.log(err);
		}
		$.each( arr, function( key, message ) {
			dpd.users.put(message.id, {"purchases":[], "followers":[], "interests":[], "following":[]}, function (result, err) {
			  if(err) console.log(err);
			});						
		});
	});
	*/

	// alert('mobileinit.js');
	
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
	$.mobile.page.prototype.options.domCache = false;
	$.mobile.defaultPageTransition = 'fade'; 
	$.mobile.defaultDialogTransition = "fade";
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
	
	
	$('body').off('click','#closewelcomepopupbtn').on('click','#closewelcomepopupbtn',function(e) { 
		e.preventDefault();
		setTimeout(function() {
			$( "#welcomepopup" ).popup( "close" );
		},1);
	});
	
	// $( "#tutorialpopup" ).popup( "open", {transition: 'fade'} );
	$( "#welcomepopup" ).bind({
		popupafterclose: function(event, ui) { 
			$( "#tutorialpopup" ).popup( "open", {transition: 'fade'} );
		}
	});

	$('body').off('click','#closepopupbtn').on('click','#closepopupbtn',function(e) { 
		e.preventDefault();
		setTimeout(function() {
			$( "#tutorialpopup" ).popup( "close" );
			window.system.showtutorial = false;
		},1);
	});
	
	$('body').off('click','#showPageOptionsLink').on('click','#showPageOptionsLink',function(e) { 
		e.preventDefault();
		// alert('bla');
		showPageOptions();
		checkTopNaviRoles();
	});
	
	
	$('body').off( "swipeleft", ".swipeToDelete").on( "swipeleft", ".swipeToDelete", function( e ) {
	// $('body').off( "click", ".swipeToDelete").on( "click", ".swipeToDelete", function( e ) {
		e.preventDefault();
		// alert('swiped on element');
		var listitem = $(this);
		deleteMessageSwitch(listitem);
	});
	
	function deleteMessageSwitch(el) {
		var listitem = el;
		el.toggleClass( 'ui-btn-up-d' );
		var selected = 0;
		$('.swipeToDelete').each(function () {
			if ($(this).hasClass( "ui-btn-up-d" )) {
				selected = selected + 1;
			}
		});
		if (selected>0) showDeleteBar(true);
		else showDeleteBar(false);
	}

	$('body').off( "click", ".deleteBarLink").on( "click", ".deleteBarLink", function( e ) {
		e.preventDefault();
		// alert('swiped on element');
		doConfirm('Der Eintrag kann nicht wiederhergestellt werden!', 'Wirklich löschen?', function (clickevent) { 
			if (clickevent=="1") {
				$.when( deleteMessageFlow() ).done(
					function( result ) {
						console.log('end deleteMessageFlow');
					}
				);
			}
		}, "Ja,Nein");
	});
	
	/*
	$('abody').off( "swipeleft", ".swipeToDelete").on( "swipeleft", ".swipeToDelete", function( e ) {
		e.preventDefault();
		// alert('swiped on element');
		var listitem = $(this);
		doConfirm('Der Eintrag kann nicht wiederhergestellt werden!', 'Wirklich löschen?', function (clickevent) { 
			if (clickevent=="1") {
				deleteMessageFlow(listitem);
			}
		}, "Ja,Nein");
	});
	*/
	
	function deleteMessageFlow() {
		// alert('deleteMessageFlow');
		// alert('deleteMessageFlow');
		showModal();
		var deferred = $.Deferred();
		var count = 0;
		$('.swipeToDelete').each(function () {
			// aaa
			// console.log($(this).attr('class'));
			var this_id = $(this).attr('data-id');
			$(this).remove();
			var this_cat = $(this).attr('data-cat');
			if ($(this).hasClass( "ui-btn-up-d" )) {
				// selected = selected + 1;
				// console.log('deleting flow id: '+this_id);
				dpd.messages.get(this_id, function (result) {
					// console.log(result);
					var query = { $or:[{"sender":result.receiver,"receiver":result.sender}  ,  {"sender":result.sender,"receiver":result.receiver}] };
					dpd.messages.get(query, function (messages) {
						// console.log();
						// $.each( messages, function( key, message ) {
						for(key = 0; key < messages.length; key++) {
							var message = messages[key];
							// console.log(key);
							// console.log(message);
							dpd.messages.del(message.id, function (err) {
								count++;
								if(err) {
									if (count==messages.length) deleteMessageFlowDone();
								}
								else {
									if (count==messages.length) deleteMessageFlowDone();
								}
							});
						}
						// $('#MessagesNestedViewDiv').html('');
						// window._thisMessagesViewNested.fetch();
					});
				});
			}
		});
		// deferred.resolve(count);
		// window._thisMessagesViewNested.fetch();
		// return deferred.promise();
		// alert(this_id);
	}
	
	function deleteMessageFlowDone() {
		console.log('done');
		hideModal();
		window._thisMessagesViewNested.fetch();
		showDeleteBar(false);
	}
	
	
	
	bindSwipeBack();
	$('body').off( "click", ".messagesendbutton").on( "click", ".messagesendbutton", function( e ) {
		e.preventDefault();
		// alert('bla');
		$("#newmessageform").submit();
	});

	$('body').off( "submit", ".newmessageform").on( "submit", ".newmessageform", function( e ) {
		e.preventDefault();
		// alert('foo');
		// var data = $('.newmessageform').serialize();
		// console.log(data);
		if($('#messagetextarea').val().length==0) return(false);
		var sender = window.me.id;
		var receiver = $('#receiver').val();
		if (receiver=='') {
			doAlert('Es ist kein Empfänger definiert...','Ups. Entschuldigung!');
			return(false);
		}
		var content = $('#messagetextarea').val();
		// console.log(sender);
		// console.log(receiver);
		// console.log(content);
		// var cdate = dateYmdHis();
		// alert(getTimestamp());
		$('.newmessageform').css({'opacity':'0.6'});
		$('#messagesendbutton').addClass( 'ui-disabled' );
		$('#messagetextarea').addClass( 'ui-disabled' );
		dpd.messages.post({sender: sender, receiver: receiver, content: content, cdate: system.timestamp}, function(result, err) {
			if(err) {
				$('#messagesendbutton').removeClass( 'ui-disabled' );
				$('#messagetextarea').removeClass( 'ui-disabled' );
				$('.newmessageform').css({'opacity':'0.7'});
				return console.log(err);
			}
			$('.newmessageform').css({'opacity':'0.7'});
			$('#messagesendbutton').removeClass( 'ui-disabled' );
			$('#messagetextarea').removeClass( 'ui-disabled' );
			$('#messagetextarea').val( '' );
			$('#messagesendbutton').css({'color':'#707070'});
			$('#messagetextarea').css({'max-height':'40px'});
			// console.log(result, result.id);
		});
		return(false);
	});
	
	/*
	$('#page-content').scroll(function () {
		$('.newmessageform').each(function () {
			// $(this).height();
			// $(this).css({'position':'fixed'});
			$(this).css({'bottom':'0px'});
			// $(this).css({'opacity':'0.7'});
		});
	});
	*/
	
	// resize:false;height: 40px !important;

	function checkTextareaValue() {
		// console.log($('#messagetextarea').val().length);
		if ($('#messagetextarea').val() && $('#messagetextarea').val().length > 0) {
			// console.log('b');
			$('#messagesendbutton').css({'color':'#0645AD'});
			// $('#messagesendbutton').removeClass( 'ui-disabled' );
		}
		else {
			// console.log('c');
			$('#messagesendbutton').css({'color':'#707070'});
			// $('#messagesendbutton').addClass( 'ui-disabled' );
		}
	}
	
	
	$('#body').off( "keyup", "#messagetextarea").on( "keyup", "#messagetextarea", function( e ) {
		/*
		if (e.which == 13) {
			e.preventDefault();
			return(false);
		}
		*/
		e.preventDefault();
		// console.log('keyup');
		$('.newmessageform').css({'opacity':'0.9'});
		var txt = $('#messagetextarea').val();
		$('#messagetextarea').val(txt.replace(/[\n\r]+/g, ""));
		$('#newmessageform').css({'bottom':'0px'});
		$('#page-content').stop().animate({
		  scrollTop: $("#page-content")[0].scrollHeight
		}, 1000);
		
		// $('#messagetextarea').css({'height':''});
		// console.log($(this));
		// console.log($('#messagetextarea').val());
		checkTextareaValue();
	});
	
	$('#body').off( "focus", "#messagetextarea").on( "focus", "#messagetextarea", function( e ) {
		e.preventDefault();
		$('.newmessageform').css({'opacity':'0.9'});
		$('#messagetextarea').css({'max-height':'80px'});
		checkTextareaValue();
		// console.log(o);
		// $('#messagetextarea').height(0);
		// console.log(e.currentTarget.height());
		// $('#messagesendbuttondiv').show();
		$('#page-content').stop().animate({
		  scrollTop: $("#page-content")[0].scrollHeight
		}, 1000);
		// console.log('focussed textarea');
	});
	$('#body').off( "blur", "#messagetextarea").on( "blur", "#messagetextarea", function( e ) {
		e.preventDefault();
		$('.newmessageform').css({'opacity':'0.7'});
		// $('#messagetextarea').css({'max-height':'40px'});
		checkTextareaValue();
		hideKeyboard();
		// $('#messagetextarea').height(40);
		// $('#messagetextarea').css("height","20px");
		// $( '#messagetextarea' ).height( 20 );
		// console.log($('#messagetextarea'));
		// $('#messagesendbuttondiv').hide();
		// console.log('blurred textarea');
	});
	
	/*
	$('#body').off( "keyup", "#messagetextarea").on( "keyup", "#messagetextarea", function( event ) {
		if (event.keyCode == 13) {
			event.preventDefault();
			console.log('keyup');
			return(false);
		}
	});
	*/
	
	$(document).on('click', ".external", function (e) {
		e.preventDefault();
		// alert('bla');
		var targetURL = $(this).attr("href");
		window.open(targetURL, "_system");
	});

	// $(window).bind('resize', function() {
	$(window).resize(function() {
		// fontResize();
	});
	
  }

);
