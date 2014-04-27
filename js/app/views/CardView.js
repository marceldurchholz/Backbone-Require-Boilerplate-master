// CardView.js
// -------
define(["jquery", "backbone", "text!templates/cardsViewPage.html"],

    function($, Backbone, cardsViewPage){
		
		var CardViewVar = Backbone.View.extend({
			
			el: "#CardsNestedViewDiv",
			initialize: function() {
				showModal();
				// this.$el.hide();
				// console.log('initializing CardView.js');
			},
			checkLogin:function() {
				_thisViewCards = this;
				// dpd.users.me(function(user) {
				dpd('users').get(window.system.uid, function(user, err) {
					if (user) { }
					else system.redirectToUrl('#login');
				});
			},
			fetch: function() {	
				_thisViewCards = this;
				var streamData = new Array();
				_thisViewCards.streamData = streamData;
				// _thisViewCards.checkLogin();
				
				$.ajax({
					url: "http://dominik-lohmann.de:5000/users/"+window.me.id,
					async: false
				}).done(function(me) {
					// alert(me.id);
					_thisViewCards.me = me;
					if (_thisViewCards.me.interests == undefined) _thisViewCards.me.interests = new Array();
				});

				var requestUrl = "http://dominik-lohmann.de:5000/cards?active=true&deleted=false";
				if (window.system.master==false) requestUrl = requestUrl + "&uploader="+window.system.aoid;
				else requestUrl = requestUrl + "&public=true";
				$.ajax({
					url: requestUrl,
					async: false
				}).done(function(cardData) {
					_thisViewCards.uploaderArray = new Array();
					_.each(cardData, function(value, index, list) {
						var exists = 1;
						// exists = $.inArray( value.topic, _thisViewCards.me.interests );
						// if (_thisViewCards.me.interests == undefined) exists=1;
						// else if (_thisViewCards.me.interests.length==0) exists=1;

						if (value.usergroups == undefined) value.usergroups = new Array();
						if (window.me.usergroups == undefined) window.me.usergroups = new Array();
						if (value.usergroups.length>0) {
							var exists=-1;
							$.each( value.usergroups, function( key, role ) {
								$.each( window.me.usergroups, function( keyme, valueme ) {
									if (role==valueme) {
										exists=1;
										return(false);
									}
								});
							});
						}

						if (exists>-1 || value.uploader == me.id) {
							value.ccat = 'card';
							value.icon = 'images/icon-cards-60.png';
							value.href = '#cards/details/view/'+value.id;
							var uploader = value.uploader;
							if (_thisViewCards.uploaderArray[uploader]==undefined) {
								$.ajax({
									url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
									async: false,
									success: function(data, textStatus, XMLHttpRequest) {
										console.log(data);
										value.uploaderdata = data;
										_thisViewCards.uploaderArray[data.id]==data;
										console.log(_thisViewCards.uploaderArray[data.id]);
									},
									error:function (xhr, ajaxOptions, thrownError) {
										console.log(xhr.responseText);
									}
								});
							}
							else {
								value.uploaderdata = _thisViewCards.uploaderArray[uploader];
							}							
							_thisViewCards.streamData.push(value);
						}
					});
				});
				
				if (_thisViewCards.streamData.length==0) {
					var value = new Object();
					value.ccat = 'plan';
					value.icon = 'images/avatar.jpg';
					value.href = '#myprofile';
					value.title = 'Noch keine Inhalte!';
					value.topic = 'Bitte Interessen auswählen...';
					value.description = ' Klicken Sie hier um auf Ihre Profileinstellungen zu gelangen...';
					value.uploaderdata = new Array();
					_thisViewCards.streamData.push(value);
				}
				
				_thisViewCards.render();

				/*
				this._cardsCollection = new cardsCollection();
				this._cardsCollection.fetch({
					success: function(coll, jsoncoll) {
						_thisViewCards.initializeme();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _cardsCollection');
					}
				});
				*/
			},
			bindEvents: function() {
				var _thisViewCards = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewCards.clicked(e);});
				this.$el.off('click','.showCardDetailsLink').on('click','.showCardDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
			},
			/*
			insertData: function(model) {
				_thisViewCards = this;
				var uploader = model.get('uploader');
				rowContent = '';
				// if (model.get('uploader') == window.system.aoid) {
				//	if (window.system.master!=true) {
						rowContent = _.template(cardsViewPage, {
							id: model.get('id'),
							// uploader: model.get('uploader'),
							uploader: model.get('uploaderdata').fullname,
							url: model.get('url'),
							title: model.get('title'),
							description: model.get('description'),
							price: model.get('price'),
							thumbnailurl: model.get('thumbnailurl'),
							topic: model.get('topic')
						},{variable: 'card'});
				//	}
				// }
				return(rowContent);
			},
			*/
			render: function() {
				var _thisViewCards = this;
				console.log(_thisViewCards.streamData);
				/*
				_thisViewCards.htmlContent = '';
				_thisViewCards.rowContent = '';
				_.each(this._cardsCollection.models, function(model) {
					var uploader = model.attributes.uploader; // "ed568841af69d94d";
					$.ajax({
						url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
						async: false,
						success: function(data, textStatus, XMLHttpRequest){
							model.attributes.uploaderdata = data;
							_thisViewCards.rowContent = _thisViewCards.rowContent + _thisViewCards.insertData(model);
						},
						error:function (xhr, ajaxOptions, thrownError) {
							if (xhr.responseText=='{"message":"not found","statusCode":404,"status":404}') {
								dpd.cards.put(model.attributes.id, {"active":false}, function(result, err) {
								  if(err) return console.log(err);
								});
							}
						}
					});
				});
				_thisViewCards.htmlContent = '<ul id="cardsListView" data-filter="true" data-filter-placeholder="Suchfilter..." data-filter-theme="a" data-role="listview" data-theme="a" data-divider-theme="f" data-autodividers="true">'+_thisViewCards.rowContent+'</ul>';
				$(this.el).html(_thisViewCards.htmlContent);
				$("#cardsListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					// console.log(li);
					var rowTopic = li.data( "topic" );
					var out = rowTopic;
					return out;
				  }
				});
				*/
				
				_thisViewCards.$el.html(_.template(cardsViewPage, {
					data: _thisViewCards.streamData
				},{variable: 'stream'}));
				
				$("#cardsListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					// console.log(li);
					var rowTopic = li.data( "topic" );
					var out = rowTopic;
					return out;
				  }
				});
				
				hideModal();
				this.$el.trigger('create');
				new FastClick(document.body);
				/*
				this.$el.fadeIn( 500, function() {
					// $('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				*/
				this.bindEvents();
				return this;				
			}
		});

        return CardViewVar;

    }

);