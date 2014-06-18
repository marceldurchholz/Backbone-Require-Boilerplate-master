// CardDetailsView.js
// -------
define(["jquery", "backbone", "collections/cardsCollection", "text!templates/cardDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/usergroupsPopupPage.html", "text!templates/pricePopupPage.html"],

    function($, Backbone, cardsCollection, cardsDetailsViewHTML, sidemenusList, SidemenuView, usergroupsPopupPage, pricePopupPage){
		
			var CardDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				bindEvents: function() {
					var _thisViewCardDetails = this;
					
					_thisViewCardDetails.$el.off('click','#detailslink').on('click','#detailslink',function(e) { 
						e.preventDefault();
						$('#detailsdiv').toggle();
						$('#detailslink').toggle();
					});
					
					_thisViewCardDetails.$el.off('click','#buybutton').on('click','#buybutton',function(e) { 
						var id = $(this).attr('data-id');
						dpd('users').get(window.system.uid, function(me, err) {
							if (me) {
								window.me = me;
								_thisViewCardDetails.buyItem(id);
							}
							else {
								doConfirm('Um diese Funktion zu nutzen, registrieren Sie sich bitte.', 'Lernset kaufen', function (event) { 
									if (event=="1") {
										window.location.href = '#noaccess';
									}
								}, ('Okay,Abbruch').split(","));
							}
						});						
					});
					
					_thisViewCardDetails.$el.off('click','#changePriceBtn').on('click','#changePriceBtn',function(e){
						e.preventDefault();
						var streamdata = new Object();
						var id = $(this).attr('data-id');
						var dbtype = $(this).attr('data-dbtype');
						streamdata.id = id;
						
						$.ajax({
							url: "http://s299455960.online.de:5000/cards/"+id,
							async: false
						}).done(function(card) {
							streamdata.dbtype = 'card';
							streamdata.objid = card.id;
							streamdata.activeusergroups = card.usergroups;
							streamdata.objactive = card.active;
							streamdata.objpublic = card.public;
							streamdata.slider_price = card.price;
							console.log(streamdata);
						});
						var popupid = 'popupBasic';
						$('#pageoverlay').append('<div style="z-index:9999;b/ackground-color:#000;width:'+($(window).width()-60)+'px;min-width:200px !important;max-width:650px !important;" data-role="popup" data-dismissible="true" data-overlay-theme="a" class="ui-corner-all" data-theme="a" id="'+popupid+'"></div>');
						$('#'+popupid).html('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>');			
						$('#'+popupid).append('<div class="ui-corner-bottom ui-content" style="z-index:9999;b/ackground-color:#000;" id="popupcontent" data-role="content"></div>');
						$( "#"+popupid ).bind({
							popupafterclose: function(event, ui) { 
								$('#body').find('.ui-popup-container').each(function() {
									$(this).remove();
								});
								$('#pageoverlay').find('#popupBasic').each(function() {
									$(this).remove();
								});
								$('#videoboxinnerdiv').css({"visibility":"visible"});
								_thisViewCardDetails.fetch(_thisViewCardDetails.options);
							}
						});
						var popupcontent = _.template(pricePopupPage, {
							data: streamdata
						},{variable:'streamdata'});
						$('#popupcontent').html(popupcontent);
						$('#videoboxinnerdiv').css({"visibility":"hidden"});
						var el = $( "#"+popupid );
						el.popup().trigger('create');
						$("#sliderprice").val(streamdata.slider_price).slider("refresh");
						$("#sliderprice").focus();
						$("#sliderprice").blur();
						el.popup( "open", {transition: 'fade'} );
					});

					
					$('#body').off('change','.usergroupcb').on('change','.usergroupcb',function(e) { 
						e.preventDefault();
						var id = $(this).attr('data-id');
						var usergroupid = $(this).attr('data-usergroupid');
						var o = new Object();
						o.id = e.currentTarget.id;
						if (e.currentTarget.checked==false) o.status = "";
						else o.status = "checked";
						o.label = $("label[for='"+ e.currentTarget.id +"']").text();
						dpd('cards').get(id, function(card, err) {
							var exists = $.inArray( $.trim(usergroupid), card.usergroups )
							if (o.status=="checked" && exists==-1) dpd.cards.put(id, {"usergroups": {$push:$.trim(usergroupid)}} );
							else dpd.cards.put(id, {"usergroups": {$pull:$.trim(usergroupid)}} );
						});
						return(false);
					});
					_thisViewCardDetails.$el.off('click','#setusergroupbtn').on('click','#setusergroupbtn',function(e){
						e.preventDefault();
						// console.log('bla');
						// console.log(_thisViewCardDetails._cardsCollection.models[0].attributes.id);
						// return(false);
						_thisViewCardDetails.obj = new Object();
						var cardsetid = _thisViewCardDetails._cardsCollection.models[0].attributes.id;
						
						var requestUrl = "http://s299455960.online.de:5000/usergroups/?deleted=false";
						if (window.me.master!=true) requestUrl = requestUrl+"&owner="+window.me.id;
						$.ajax({
							url: requestUrl,
							async: false
						}).done(function(usergroups) {
							_thisViewCardDetails.obj.allusergroups = usergroups;
						});

						$.ajax({
							url: "http://s299455960.online.de:5000/cards/"+cardsetid,
							async: false
						}).done(function(card) {
							_thisViewCardDetails.obj.activeusergroups = card.usergroups;
							_thisViewCardDetails.obj.dbtype = "card";
							_thisViewCardDetails.obj.objid = card.id;
							_thisViewCardDetails.obj.objactive = card.active;
							_thisViewCardDetails.obj.objpublic = card.public;
							// console.log(_thisViewCardDetails.obj.activeusergroups);
						});
						
						var popupid = 'popupBasic';
						$('#pageoverlay').append('<div style="z-index:9999;width:'+($(window).width()-30)+'px;min-width:200px !important;max-width:650px !important;" data-role="popup" data-dismissible="true" data-overlay-theme="a" class="ui-corner-all" data-theme="b" id="'+popupid+'"></div>');
						$('#'+popupid).html('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>');			
						$('#'+popupid).append('<div class="ui-corner-bottom ui-content" id="popupcontent" data-role="content"></div>');
						$( "#"+popupid ).bind({
							popupafterclose: function(event, ui) { 
								$('#body').find('.ui-popup-container').each(function() {
									$(this).remove();
								});
								$('#pageoverlay').find('#popupBasic').each(function() {
									$(this).remove();
								});
							}
						});
						var popupcontent = _.template(usergroupsPopupPage, {
							data: _thisViewCardDetails.obj
						},{variable:'streamdata'});
						$('#popupcontent').html(popupcontent);
						var el = $( "#"+popupid );
						el.popup().trigger('create');
						el.popup( "open", {transition: 'fade'} );
					});
					

				},
				buyItem: function(id) {
					var _thisViewCardDetails = this;
					// _thisConfirmButtonLabels = ('Preise anzeigen,Abbrechen').split(",");
					var CreditsAfterPurchase = parseFloat(window.me.credits) - parseFloat(_thisViewCardDetails._cardsCollection.models[0].attributes.price);
					if (CreditsAfterPurchase<0) {
						doConfirm('Sie haben nicht genügend APPinaut® Coins.', 'Schade...', function (event) { 
							if (event=="1") {
								window.location.href = '#myprofile';
							}
						}, ('Preise anzeigen,Abbrechen').split(","));
						return(false);
					}
					else {
						_thisViewCardDetails._me = _thisViewCardDetails._cardsCollection.user;
						_thisViewCardDetails._cardData = _thisViewCardDetails._cardsCollection.models[0].attributes;
						if (_thisViewCardDetails._cardData.price>0) doConfirm('Möchten Sie dieses Video für ' + _thisViewCardDetails._cardData.price + ' APPinaut Coins ansehen?', 'Video ansehen', function (event) { 
							if (event=="1") {
								_thisViewCardDetails.purchaseVideoStart(me,_thisViewCardDetails._cardsCollection.models[0].attributes);
							}
						}, undefined);
						else {
							_thisViewCardDetails.purchaseVideoStart(me,_thisViewCardDetails._cardsCollection.models[0].attributes);
						}
					}
				},
				purchaseVideoStart: function(me,cardData) {
					var _thisViewCardDetails = this;
					var creditsAfterPurchase = parseFloat(window.me.credits) - parseFloat(cardData.price);
					console.log(cardData);
					_thisViewCardDetails._cardData = cardData;
					_thisViewCardDetails._creditsAfterPurchase = creditsAfterPurchase;
					var data = new Object();
					data.credits = ''+creditsAfterPurchase;
					data.purchases = window.me.purchases;
					_newData = new Object();
					_newData.purchases = new Array();
					_newData = data;
					// _thisViewCardDetails._me = me;
					$.ajax('http://s299455960.online.de:5000/users/?id='+me.id,{
						type:"GET",
						async: false,
					}).done(function(me) {
						window.me = me;
						if (window.me.purchases==undefined) window.me.purchases = new Array();
						// _newData.purchases = me.purchases;
					}).fail(function() { doAlert( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." ); })
					.always(function() { 
					});
					if ($.inArray(cardData.id, window.me.purchases) > -1) {
						doAlert('Sie haben dieses Lernset bereits gekauft.','Information');
					}
					else {
						if (window.me.purchases==undefined) window.me.purchases = new Array();
						_newData.purchases.push(cardData.id);
						console.log(JSON.stringify({purchases: _newData.purchases,credits: creditsAfterPurchase}));
						$.ajax('http://s299455960.online.de:5000/users/?id='+window.me.id,{
							type:"POST",
							contentType: "application/json",
							async: false,
							data: JSON.stringify({
								purchases: _newData.purchases,
								credits: creditsAfterPurchase
							}),
						}).done(function(uploaderdata) {
							var alertmsg = 'Sie können das Lernset nun starten.';
							if (cardData.price>0) alertmsg += ' Für weitere Käufe sind noch '+creditsAfterPurchase+' Credits verfügbar.';
							doAlert(alertmsg,'Information');
							window.addFollower(window.me, cardData.uploader);
							window.addOrder(window.me,cardData.id,cardData.uploader,cardData.price);
						}).fail(function() {
							console.log( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." );
						})
						.always(function() {
							window.me.purchases = _newData.purchases;
							_thisViewCardDetails.render();
						});
					}
				},
				initializeCollection:function(options) {
					this._cardsCollection = new cardsCollection([], options);
				},
				fetch: function(options) {
					this.initializeCollection(options);
					var _thisViewCardDetails = this;
					this._cardsCollection.fetch({
						error: function(action, coll) {
							// console.log(action);
							// console.log(coll);
						},
						success: function(coll, jsoncoll) {
							// console.log(coll);
							// console.log(jsoncoll);
							_thisViewCardDetails.render();
						}
					});
				},
				initialize: function(options) {
					this.initializeCollection(options);
					this.fetch(options);
				},
				insertVariables: function(model) {
					var _thisViewCardDetails = this;
					var uploader = model.get('uploader');
					// console.log(this.id);
					$.ajax({
						url: "http://s299455960.online.de:5000/users/?id="+uploader,
						async: false
					}).done(function(uploaderdata) {
						// console.log(uploaderdata);
						_thisViewCardDetails.uploaderdata = uploaderdata;
					});
					var pricetext = '';
					if (model.get('price')==0) pricetext = 'Video kostenlos laden';
					else pricetext = 'Lernset für '+model.get('price')+' Coins kaufen';
					_template = _.template(cardsDetailsViewHTML, {
						id: model.get('id'),
						uploaderdata: _thisViewCardDetails.uploaderdata,
						uploader: _thisViewCardDetails.uploaderdata.fullname,
						topic: model.get('topic'),
						cardurl: model.get('cardurl'),
						thumbnailurl: model.get('thumbnailurl'),
						title: model.get('title'),
						subtitle: model.get('subtitle'),
						description: model.get('description'),
						price: model.get('price'),
						pricetext: pricetext,
						purchases: model.get('purchases'),
						start: model.get('start'),
						cdate: model.get('cdate'),
						end: model.get('end')
					},{variable: 'card'});
					$(this.el).html(_template);
				},
				render: function() {
					var _thisViewCardDetails = this;
					// console.log('rendering CardDetailsView.js');
					$(window).resize(function() {
						window.resizeElement('#card_player_1')
					});
					// console.log('DOING render CardDetailsView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewCardDetails.nestedView = new SidemenuView().fetch();
					var htmlContent = '';
					$(this.el).html(htmlContent);
					_.each(this._cardsCollection.models, function(model) {
						// this.id = model.get('id');
						_thisViewCardDetails.insertVariables(model);
					});
					// console.log('this._cardsCollection.models[0].attributes.cardurl');
					// console.log(this._cardsCollection.models[0].attributes.cardurl);
					// window.createCardPreview(_thisViewCardDetails.$('#card_player_1'),'card_player_1',this._cardsCollection.models[0].attributes.cardurl);
					_thisViewCardDetails.$el.trigger('create');
					hideModal();
					var slicePoint = Math.round($(window).width()/5-14);
					_thisViewCardDetails.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
						fontResize();
						$('.readmore').expander({
							slicePoint: slicePoint*4,
							preserveWords: true,
							expandPrefix: '...',
							expandEffect: 'fadeIn',
							expandSpeed: 500,
							collapseEffect: 'fadeOut',
							collapseSpeed: 200,
							expandText: ' Weiterlesen...',
							userCollapseText: '',
							userCollapse: false
						});
					});
					_thisViewCardDetails.bindEvents();
					return _thisViewCardDetails;
				}

			});

        return CardDetailsViewVar;

    }

);