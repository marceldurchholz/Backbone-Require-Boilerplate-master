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
	
	$('body').off( "swipeleft", ".swipeToDelete").on( "swipeleft", ".swipeToDelete", function( e ) {
		e.preventDefault();
		// alert('swiped on element');
		var listitem = $(this);		
		doConfirm('', 'Verlauf löschen?', function (clickevent) { 
			if (clickevent=="1") {
				deleteMessageFlow(listitem);
			}
		}, "Ja,Nein");
	});

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
			doAlert('Bitte geben Sie den Namen des Empfängers ein...','Empfänger eingeben.');
			return(false);
		}
		var content = $('#messagetextarea').val();
		// console.log(sender);
		// console.log(receiver);
		// console.log(content);
		// var cdate = dateYmdHis();
		// alert(getTimestamp());
		$('#messagesendbutton').addClass( 'ui-disabled' );
		$('#messagetextarea').addClass( 'ui-disabled' );
		dpd.messages.post({sender: sender, receiver: receiver, content: content, cdate: system.timestamp}, function(result, err) {
			if(err) {
				$('#messagesendbutton').removeClass( 'ui-disabled' );
				$('#messagetextarea').removeClass( 'ui-disabled' );
				return console.log(err);
			}
			$('#messagesendbutton').removeClass( 'ui-disabled' );
			$('#messagetextarea').removeClass( 'ui-disabled' );
			$('#messagetextarea').val( '' );
			// console.log(result, result.id);
		});
		return(false);
	});
	
	$('#noooooooo-page-content').scroll(function () {
		// console.log('aaa');
		$('.fadeWhenOffsite').each(function () {
			// var opa = ( 100-$(window).scrollTop() )/100;
			// console.log(opa);
			var opa = 1;
			// console.log($(window).scrollTop());
			// var pos = ($(this).offset().top - $(window).scrollTop());
			var top = $(this).offset().top;
			var elheight = $(this).height();
			// console.log(pos);
			if (top+50 < 100) {
				opa = top/100;
			} else {
				/*
				// console.log(bottom);
				// console.log($(window).height());
				if (top > $(window).height()-elheight) {
					// opa = 0.3;
					opa = top;
				}
				else {
					opa = 1;
				}
				*/
				opa = 1;
			}
			$(this).css({'opacity':opa});
		});
	});
	
	function deleteMessageFlow(listitem) {
		// alert('deleteMessageFlow');
		var this_id = listitem.attr('data-id');
		// alert(this_id);
		
		// listitem.fadeOut( 500, function() {
		listitem.toggle( "fast", function() {
			listitem.remove();
		});
		
	}
	
	$('#body').off( "swiperight", "#page-content").on( "swiperight", "#page-content", function( e ) {
		e.preventDefault();
		// alert('swiped on body');
		history.back();
		return(false);
	});
	
	// resize:false;height: 40px !important;

	function checkTextareaValue() {
		// console.log($('#messagetextarea').val().length);
		if ($('#messagetextarea').val() && $('#messagetextarea').val().length > 0) {
			// console.log('b');
			$('#messagesendbutton').removeClass( 'ui-disabled' );
		}
		else {
			// console.log('c');
			$('#messagesendbutton').addClass( 'ui-disabled' );
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
		var txt = $('#messagetextarea').val();
		$('#messagetextarea').val(txt.replace(/[\n\r]+/g, ""));
		// $('#messagetextarea').css({'height':''});
		// console.log($(this));
		// console.log($('#messagetextarea').val());
		checkTextareaValue();
	});
	
	$('#body').off( "focus", "#messagetextarea").on( "focus", "#messagetextarea", function( e ) {
		e.preventDefault();
		$('#messagetextarea').css({'max-height':'80px'});
		checkTextareaValue();
		// console.log(o);
		// $('#messagetextarea').height(0);
		// console.log(e.currentTarget.height());
		// $('#messagesendbuttondiv').show();
		$('#page-content').stop().animate({
		  scrollTop: $("#page-content")[0].scrollHeight
		}, 800);
		// console.log('focussed textarea');
	});
	$('#body').off( "blur", "#messagetextarea").on( "blur", "#messagetextarea", function( e ) {
		e.preventDefault();
		$('#messagetextarea').css({'max-height':'40px'});
		checkTextareaValue();
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
	
	// $(window).bind('resize', function() {
	$(window).resize(function() {
		fontResize();
	});
	
  }

);
