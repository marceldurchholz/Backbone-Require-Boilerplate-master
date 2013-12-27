// SidemenusCollection.js
// -------------
define(["jquery", "backbone", "models/SidemenuModel"],

  function($, Backbone, SidemenuModel) {

    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionSidemenu = this;
			var online = _thisCollectionSidemenu.online = 1;
			this._localStorage_sidemenus = new Store('sidemenus');
			// var offlineData = this.offlineData = this._localStorage_sidemenus.findAll();
			// this.localStorage = this._localStorage_sidemenus;
			/*
			if (_thisCollectionSidemenu.online==1) {
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu/?nav=true';
				this.url = 'http://dominik-lohmann.de:5000/sidemenu/?{"nav":"true","$sort":"seq"}';
				
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu?{%22nav%22:%22true%22}';
				// this.url = 'http://dominik-lohmann.de:5000/sidemenu/d6c9268c49a139bf';
				// this.localStorage = null;
			}
			*/
			this.url = 'http://dominik-lohmann.de:5000/sidemenu/?{"nav":"true","$sort":"seq"}';
		},
		model: SidemenuModel,
		fetch: function(options) {
			if (_thisCollectionSidemenu.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionSidemenu.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						console.log('you are not logged in');
					}
				});
			}
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObjectSidemenu;
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(responseSidemenu) {
			console.log('parse responseSidemenu');
			// console.log(_thisCollectionSidemenu.user);			
			_thisCollectionSidemenu.models = [];
			this._localStorage_sidemenus.models = [];
			for (n = 0; n < responseSidemenu.length; ++n) {
				model = responseSidemenu[n];
				var access = 0;
				jQuery.each(model.roles, function(i, val) {
					if (_thisCollectionSidemenu.user) {
						access = jQuery.inArray( val, _thisCollectionSidemenu.user.roles );
						if (access<=0) {
						}
						if (access>0) {
							return false;
						}
					}
					else if (model.roles=="public") {
						console.log(model.userfriendly + ' is a public page');
						access = 1;
					}
				});
				
				if (access>0) {
					console.log('ADDING PAGE ' + model.userfriendly);
					_thisCollectionSidemenu.add(model);
					/*
					if (_thisCollectionSidemenu.online==1) {
						console.log('updating this._localStorage_sidemenus');
						this._localStorage_sidemenus.update(new SidemenuModel(model));
					}
					*/
				}
				// console.log('DEBUG');
				// console.log(this.options.id);
				// console.log(model.id);
			}
			// console.log('_thisCollectionSidemenu.models');
			// console.log(_thisCollectionSidemenu.models);
			// console.log(this._localStorage_sidemenus.update);
			// console.log(this._localStorage_sidemenus);
			// this.options.parentView.render();
			return(_thisCollectionSidemenu.models);
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
    return SidemenusCollection;

  }

);