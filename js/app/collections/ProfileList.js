// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile", "backbone.LocalStorage"],

  function($, Backbone, Profile, LocalStorageAdapter) {

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
			var online = 1;
			// var onlinestatus = $('onlinestatus').val();
			// alert(onlinestatus);
			this._localStorage = new LocalStorageAdapter(); // LocalStorageAdapter;
			_thisCollection.online = online;
			if (_thisCollection.online==1) {
				console.log('##### ProfileList.initialize (with URL request)');
				
				
				var offlineData = this.findAll_offline();
				console.log('offlineData');
				console.log(offlineData);
				
				// var myModel = JSON.parse('{"id": 1, "fullname": "James King", "device": 0, "credits": "100", "pictureurl": ""}');
				// var myModel = new Profile({"id": 1, "fullname": "James King", "device": 0, "credits": "100", "pictureurl": ""});
				// console.log(myModel);
				// var offlineData = this._localStorage.findAll();
				// this._offlineData = offlineData;
				// console.log('offlineData');
				// console.log(this._offlineData);
				// this.url = 'http://coenraets.org/offline-sync/api/employees?modifiedSince=2010-03-01%2010:20:56';
				this.url = 'http://dominik-lohmann.de:5000/users/';
			}
			else {
				console.log('##### ProfileList.initialize (with LocalStorageAdapter)');
				this.localStorage = this._localStorage;
			}
		},
		findAll_offline: function() {
			alert('findAll');
			if (isMobile.any()) {
				this.db.transaction(
					function(tx) {
						var sql = "SELECT * FROM users";
						alert('Local SQLite database: "SELECT * FROM users"');
						tx.executeSql(sql, this.txErrorHandler,
							function(tx, results) {
								alert('getting len');
								var len = results.rows.length,
									users = [],
									i = 0;
								for (; i < len; i = i + 1) {
									users[i] = results.rows.item(i);
								}
								alert(len + ' rows found');
								alert(users);
								alert(users.toJSON);
								// for (var i = 0; i < l; i++) {
								// e = users[i];
								// callback(users);
								return(users);
							}
						);
					}
				);
			}
			else {
				users = [];
				return(users);
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
			var bla = Backbone.sync.call(model, method, model, options);
		},
		parse: function(response) {
			console.log('***** parse');
			console.log('this._offlineData');
			console.log(this._offlineData);
			// console.log('response');
			// console.log(response);			

			/*
			for (n = 0; n < this._offlineData.length; ++n) {
				arg = this._offlineData[n];
				console.log("typeof this._offlineData[" + n + "] = " + typeof arg);
				for (name in arg) {
					console.log("this._offlineData[" + n + "][" + name + "]=" + arg[name]);
				}
			}
			*/

			for (n = 0; n < response.length; ++n) {
				model = response[n];
				_thisCollection.add(model);
				/*
				console.log("typeof response[" + n + "] = " + typeof model);
				for (name in model) {
					console.log("response[" + n + "][" + name + "]=" + model[name]);
				}
				*/
			}
			/*
			_.each(response, function(model) {
				_thisCollection.add(model);
			});
			*/
			
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
    return ProfileList;

  }

);