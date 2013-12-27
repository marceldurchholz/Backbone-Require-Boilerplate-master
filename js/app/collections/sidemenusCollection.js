// SidemenusCollection.js
// -------------
define(["jquery", "backbone", "models/SidemenuModel"],

  function($, Backbone, SidemenuModel) {

    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			// console.log('options');
			// console.log(options);
			this.options = options || {};
			// this.options.id = this.options.id || 0;
			
			// console.log('this');
			// console.log(this);
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollection = this;
			var online = _thisCollection.online = 1;
			if (online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollection.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						alert('you are not logged in');
						var user = {};
					}
				});
			}
			this._localStorage_sidemenus = new Store('sidemenus');
			var offlineData = this.offlineData = this._localStorage_sidemenus.findAll();
			this.localStorage = this._localStorage_sidemenus;
			if (_thisCollection.online==1) {
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu/?nav=true';
				this.url = 'http://dominik-lohmann.de:5000/sidemenu/?{"nav":"true","$sort":"seq"}';
				
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu?{%22nav%22:%22true%22}';
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu/d6c9268c49a139bf';
				this.localStorage = null;
			}
		},
		model: SidemenuModel,
		fetch: function(options) {
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObject;
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response) {
			// console.log('parse');
			// console.log(this.options);
			_thisCollection.models = [];
			this._localStorage_sidemenus.models = [];
			for (n = 0; n < response.length; ++n) {
				model = response[n];
				
				var access = 0;
				jQuery.each(model.roles, function(i, val) {
					access = jQuery.inArray( val, _thisCollection.user.roles );
					if (access>0) {
						// console.log(val);
						// console.log(_thisCollection.user.roles);
						// console.log(jQuery.inArray( val, _thisCollection.user.roles ));
						console.log('ACCESS GAINED FOR PAGE ' + model.userfriendly);
						return false;
					}
				});
				
				if (access>0) {
					if (this.options.hasOwnProperty('id')) {
						if (this.options.id == model.id) {
							// alert('id setted');
							_thisCollection.add(model);
							if (_thisCollection.online==1) this._localStorage_sidemenus.update(new SidemenuModel(model));
						}
					}
					else {
						_thisCollection.add(model);
						if (_thisCollection.online==1) this._localStorage_sidemenus.update(new SidemenuModel(model));
					}
				}
				// console.log('DEBUG');
				// console.log(this.options.id);
				// console.log(model.id);
			}
			// console.log(_thisCollection.models);
			// console.log(this._localStorage_sidemenus);
			return(_thisCollection.models);
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
			console.log(xhr);
			alert('success');
		},
		/*
		txErrorHandler: function(tx) {
			alert('error tx.message');
		}
		*/
	});

    // Returns the Model class
    return SidemenusCollection;

  }

);