// CardStartView.js
// -------
define(["jquery", "backbone", "models/CardModel", "collections/cardsCollection", "views/CardView", "text!templates/cardStartView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, CardModel, cardsCollection, CardListViewItems, cardsStartViewHTML, sidemenusList, SidemenuView){
		
			var CardStartViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				createCard: function () {
					if (this._cardsCollection.online==0) {
						alert('in offline mode you can not add data');
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						this.create(new CardModel({"uploader": "042cb1572ffbea5d", "cardurl": "http://xyz.de.com.uk", "title": "This is a card title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/card-thumbnail.jpg"}));
					}
					return(false);
				},
				create: function(model) {
					_thisViewCardStart = this;
					$.ajax('http://dominik-lohmann.de:5000/cards', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						_thisViewCardStart.fetch();
					  }, 
					  error: function(xhr,b) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
				},
				bindEvents: function() {
					var _thisViewCardStart = this;
					this.$el.off('click','.createCard').on('click','.createCard',function(){_thisViewCardStart.createCard();});
				},
				initializeCollection:function(options) {
					this._cardsCollection = new cardsCollection([], options);
				},
				fetch: function(options) {
					this.$el.hide();
					this.initializeCollection(options);
					var _thisViewCardStart = this;
					this._cardsCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							console.log(coll);
							console.log(jsoncoll);
							_thisViewCardStart.render();
						}
					});
				},
				initialize: function(options) {
					this.initializeCollection(options);
					this.fetch(options);
				},
				insertVariables: function(model) {
					_thisViewCardStart = this;
					var uploader = model.get('uploader');
					console.log(this.id);
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users/?id="+uploader,
						async: false
					}).done(function(uploaderdata) {
						console.log(uploaderdata);
						_thisViewCardStart.uploaderdata = uploaderdata;
					});
					
					var pricetext = '';
					if (model.get('price')==0) pricetext = 'kostenlos';
					else pricetext = 'für '+model.get('price')+' Coins';
					_template = _.template(cardsStartViewHTML, {
						id: model.get('id'),
						uploader: _thisViewCardStart.uploaderdata.fullname,
						topic: model.get('topic'),
						cardurl: model.get('cardurl'),
						title: model.get('title'),
						subtitle: model.get('subtitle'),
						description: model.get('description'),
						price: model.get('price'),
						pricetext: pricetext,
						start: model.get('start'),
						end: model.get('end')
					},{variable: 'card'});
					$(this.el).html(_template);
				},
				render: function() {
					_thisViewCardStart = this;
					console.log('rendering CardStartView.js');
					$(window).resize(function() {
						window.resizeElement('#card_player_1')
					});
					console.log('DOING render CardStartView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewCardStart.nestedView = new SidemenuView().fetch();
					var htmlContent = '';
					$(this.el).html(htmlContent);
					_.each(this._cardsCollection.models, function(model) {
						this.id = model.get('id');
						_thisViewCardStart.insertVariables(model);
					});
					
					console.log('this._cardsCollection.models[0].attributes.cardurl');
					console.log(this._cardsCollection.models[0].attributes.cardurl);
					
					_thisViewCardStart.$el.trigger('create');
					new FastClick(document.body);
					_thisViewCardStart.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					return _thisViewCardStart;
				}

			});

        return CardStartViewVar;

    }

);