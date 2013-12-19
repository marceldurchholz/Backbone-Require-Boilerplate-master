// UsersCollection.js
// -------------
define(["jquery", "backbone", "models/UserModel"],

  function($, Backbone, UserModel) {

    // Creates a new Backbone Collection class object
	var UsersCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			console.log('aaa '+this.options.dbid);
			this.bind("error", this.errorHandler);			
			_thisCollection = this;
			var online = _thisCollection.online = 1;
			this._localStorage_users = new Store('users');
			var offlineData = this.offlineData = this._localStorage_users.findAll();
			this.localStorage = this._localStorage_users;
			if (_thisCollection.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/users/?id='+this.options.dbid;
				this.localStorage = null;
			}
		},
		model: UserModel,
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
			console.log(response);
			_thisCollection.models = [];
			this._localStorage_users.models = [];
			for (n = 0; n < response.length; ++n) {
				model = response[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						_thisCollection.add(model);
						if (_thisCollection.online==1) this._localStorage_users.update(new UserModel(model));
					}
				}
				else {
					_thisCollection.add(model);
					if (_thisCollection.online==1) this._localStorage_users.update(new UserModel(model));
				}
			}
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
		txErrorHandler: function(tx) {
			alert('error tx.message');
		}
	});

    // Returns the Model class
    return UsersCollection;

  }

);