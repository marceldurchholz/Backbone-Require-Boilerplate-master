// PlanerCollection.js
// -------------
define(["jquery", "backbone", "models/PlanModel"],

  function($, Backbone, PlanModel) {

    // Creates a new Backbone Collection class object
	var PlanerCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionPlaner = this;
			var online = _thisCollectionPlaner.online = 1;
			this._localStorage_planer = new Store('planer');
			var offlineData = this.offlineData = this._localStorage_planer.findAll();
			this.localStorage = this._localStorage_planer;
			if (_thisCollectionPlaner.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/planer/';
				// this.url = 'http://dominik-lohmann.de:5000/planer/d6c9268c49a139bf';
				this.localStorage = null;
			}
		},
		model: PlanModel,
		fetch: function(options) {
			if (_thisCollectionPlaner.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionPlaner.user = user;
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
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(responsePlaner) {
			console.log('parse responsePlaner');
			// console.log(_thisCollectionSidemenu.user);
			_thisCollectionPlaner.models = [];
			this._localStorage_planer.models = [];
			for (n = 0; n < responsePlaner.length; ++n) {
				model = responsePlaner[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						// alert('id setted');
						_thisCollectionPlaner.add(model);
						if (_thisCollectionPlaner.online==1) this._localStorage_planer.update(new PlanModel(model));
					}
				}
				else {
					_thisCollectionPlaner.add(model);
					if (_thisCollectionPlaner.online==1) this._localStorage_planer.update(new PlanModel(model));
				}
			}
			return(_thisCollectionPlaner.models);
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
    return PlanerCollection;

  }

);