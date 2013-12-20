// SidebarCollection.js
// -------------
define(["jquery", "backbone", "models/SidebarModel"],

  function($, Backbone, SidebarModel) {

    // Creates a new Backbone Collection class object
	var SidebarCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			// console.log('SidebarCollection.js: '+this.options.dbid);
			this.bind("error", this.errorHandler);			
			_thisCollection = this;
			var online = _thisCollection.online = 1;
			this._localStorage_sidebar = new Store('sidebar');
			var offlineData = this.offlineData = this._localStorage_sidebar.findAll();
			this.localStorage = this._localStorage_sidebar;
			var me = me || {};
			if (_thisCollection.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						_thisCollection.me = user;
						// later in addition check roles
						// _thisCollection._usersCollection = new usersCollection([], {dbid:_thisCollection.me.id});
						// _thisCollection.fetch();
						// console.log(user.roles);
						// this.url = 'http://dominik-lohmann.de:5000/sidemenu/?nav='+this.options.dbid;
						// console.log('myroles');
						this.url = 'http://dominik-lohmann.de:5000/sidemenu?{"roles":{"$in":'+JSON.stringify(_thisCollection.me.roles)+'},"navoffline":"true"}'
						// console.log('SidebarCollection.js: '+this.url);
						this.localStorage = null;
					}
					else {
						// location.href = "#noaccess";
					}
				});
			}
		},
		model: SidebarModel,
		fetch: function(options) {
			// console.log('SidebarCollection.js: options: '+options);
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			// console.log('responseObject');
			// console.log(responseObject);
			return responseObject;
		},
		sync: function(method, model, options) {
			// console.log('SidebarCollection.js: sync');
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response) {
			// console.log('response');
			// console.log(response);
			// if (!response.length) response = {"0":response};
			// console.log('SidebarCollection.js: '+response);
			// console.log(response);
			// console.log(_.size(response));
			// console.log(response.id);
			// response.length = _.size(response);
			_thisCollection.models = [];
			this._localStorage_sidebar.models = [];
			for (n = 0; n < response.length; ++n) {
				model = response[n];
				// console.log('SidebarCollection.js: '+model);
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						_thisCollection.add(model);
						if (_thisCollection.online==1) this._localStorage_sidebar.update(new SidebarModel(model));
					}
				}
				else {
					_thisCollection.add(model);
					if (_thisCollection.online==1) this._localStorage_sidebar.update(new SidebarModel(model));
				}
			}
			return(_thisCollection.models);
		},
		errorHandler: function(xhr) {
			// console.log(xhr);
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
    return SidebarCollection;

  }

);