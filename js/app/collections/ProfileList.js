// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile", "backbone.LocalStorage"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
	var ProfileList = Backbone.Collection.extend({
		// remote: true, // never cached, dualStorage is bypassed entirely
		// local: true,  // always fetched and saved only locally, never saves on remote
		// local: function() { return true; }, // local and remote can also be dynamic
		model: Profile,
		// url: 'profiles.jsonx'
		// url: 'http://mobile002.appinaut.de/api/employees/index.php', 
		// url: 'http://dominik-lohmann.de:5000/users/?{%22zip%22:%20%2222415%22}',
		initialize: function() {
			console.log('***** initialize');
			this.bind("error", this.errorHandler);			
			_thisCollection = this;
			var online = 0;
			// var onlinestatus = $('onlinestatus').val();
			// alert(onlinestatus);
			_thisCollection.online = online;
			if (_thisCollection.online==1) {
				console.log('##### ProfileList.initialize (with URL request)');
				this.url = 'http://dominik-lohmann.de:5000/users/';
				// this.url = 'http://coenraets.org/offline-sync/api/employees?modifiedSince=2010-03-01%2010:20:56';
			}
			else {
				console.log('##### ProfileList.initialize (with LocalStorageAdapter)');
				this.localStorage = LocalStorageAdapter;
			}
		},
		fetch: function(options) {
			console.log('***** fetch');
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			// console.log(Backbone.ajaxSync('read', this, options));
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObject;
		},
		sync: function(method, model, options) {
			console.log('***** sync: ' + method);
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response) {
			console.log('***** parse');
			_.each(response, function(model) {
				_thisCollection.add(model);
			});
			return(_thisCollection.models);
		},
		errorHandler: function(response, xhr) {
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
    return ProfileList;

  }

);