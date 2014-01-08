// CardsCollection.js
// -------------
define(["jquery", "backbone", "models/CardModel"],

  function($, Backbone, CardModel) {

    // Creates a new Backbone Collection class object
	var CardsCollectionVar = Backbone.Collection.extend({
		comparator: function( collection ){
			return( collection.get( 'topic' ) );
		},
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionCards = this;
			var online = _thisCollectionCards.online = 1;
			this._localStorage_cards = new Store('cards');
			var offlineData = this.offlineData = this._localStorage_cards.findAll();
			this.localStorage = this._localStorage_cards;
			if (_thisCollectionCards.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/cards/';
				// this.url = 'http://dominik-lohmann.de:5000/cards/d6c9268c49a139bf';
				this.localStorage = null;
			}
		},
		model: CardModel,
		fetch: function(options) {
			if (_thisCollectionCards.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionCards.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
			}
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObject;
		},
		sync: function(method, model, options) {
			// options.parse = false;
			var bla = Backbone.sync.call(model, method, model, options);
			// console.log(bla);
			console.log(options);
			console.log(method);
			console.log(model);
			/*
			$.get( 'http://dominik-lohmann.de:5000/cards/', function( data ) {
			  alert( "Data Loaded: " + data );
			  console.log(data);
			  return(data);
			});
			*/
		},
		parse: function(responseCards) {
			console.log('parse responseCards');
			// console.log(_thisCollectionSidemenu.user);
			_thisCollectionCards.models = [];
			this._localStorage_cards.models = [];
			for (n = 0; n < responseCards.length; ++n) {
				model = responseCards[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						// alert('id setted');
						_thisCollectionCards.add(model);
						if (_thisCollectionCards.online==1) this._localStorage_cards.update(new CardModel(model));
					}
				}
				else {
					// console.log(model);
					_thisCollectionCards.add(model);
					if (_thisCollectionCards.online==1) _thisCollectionCards._localStorage_cards.update(new CardModel(model));
					var userid = model.uploader;
					/*
					$.get( 'http://dominik-lohmann.de:5000/users/?id='+userid, function( data ) {
						// alert( "Data Loaded: " + data.fullname );
						console.log("Data Loaded: " + data.fullname);
						model.fullname = data.fullname;
						console.log(model);
						// return(data);
						_thisCollectionCards.add(model);
						if (_thisCollectionCards.online==1) _thisCollectionCards._localStorage_cards.update(new CardModel(model));
					});
					*/
				}
			}
			/*
			window.setTimeout(function bla() {
				console.log(_thisCollectionCards.models);
				return(_thisCollectionCards.models);
				alert('huhuuu');
			}, 2000);
			*/
			console.log(_thisCollectionCards.models);
			return(_thisCollectionCards.models);
		},
		errorHandler: function(xhr) {
			console.log(xhr);
			if (xhr.status=='404') {
				if (xhr.responseJSON==undefined) {
					alert('probably no internet connection');
				}
				else {
					alert('probably request url wrong or not reachable');
				}
			}
		},
		successHandler: function(xhr) {
			alert('successHandler');
			console.log(xhr);
		}
	});

    // Returns the Model class
    return CardsCollectionVar;

  }

);