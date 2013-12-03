// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
	var ProfileList = Backbone.Collection.extend({
		model: Profile,
		// url: 'profiles.jsonx'
		// url: 'http://mobile002.appinaut.de/api/employees/index.php', 
		url: 'http://dominik-lohmann.de:5000/users/',
		
		initialize: function() {
			console.log('collection initializing');

			var self = this;
			this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
			this.db.transaction(
				function(tx) {
					tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='profiles'", this.txErrorHandler,
						function(tx, results) {
							if (results.rows.length == 1) {
								alert('Using existing profiles table in local SQLite database');
								// self.sync();
							}
							else
							{
								alert('profiles table does not exist in local SQLite database');
								self.createTable();
							}
					});
					// self.sync(renderList);
				}
			)
		},
		createTable: function() {
			alert('createTable profiles');
			this.db.transaction(
				function(tx) {
					var sql =
						"CREATE TABLE IF NOT EXISTS profiles ( " +
						"id VARCHAR(100) PRIMARY KEY, " +
						"username VARCHAR(100), " +
						"password VARCHAR(100), " +
						"fullname VARCHAR(100), " +
						"slogan VARCHAR(500), " +
						"perstext VARCHAR(500), " +
						"device VARCHAR(100))";
					tx.executeSql(sql);
				},
				this.txErrorHandler,
				function() {
					alert('Table profiles successfully CREATED in local SQLite database');
					// callback();
					self.sync();
				}
			);
		},
		sync: function() {
			alert('sync profiles');
			var self = this;
			alert('Starting synchronization...');
			self.getLastSync(function(lastSync){
				alert('getting profiles beginning from ' + lastSync);
				alert('self.url: ' + self.url);
				self.getChanges(self.url, lastSync,
					function (changes) {
						alert('now doing soimething with these changes');
						/*
						if (changes.length > 0) {
							alert('applyChanges(changes, renderlist)');
							self.applyChanges(changes, renderlist);
						} else {
							alert('Nothing to synchronize');
							console.log('Nothing to synchronize');
							renderList();
						}
						*/
					}
				);
			});
		},
		getLastSync: function(callback) {
			alert('getLastSync');
			this.db.transaction(
				function(tx) {
					var sql = "SELECT MAX(lastModified) as lastSync FROM profiles";
					tx.executeSql(sql, this.txErrorHandler,
						function(tx, results) {
							var lastSync = results.rows.item(0).lastSync;
							alert('Last local timestamp is ' + lastSync);
							callback(lastSync);
						}
					);
				}
			);
		},
		getChanges: function(syncURL, modifiedSince, callback) {
			alert('getChanges');
			$.ajax({
				url: syncURL,
				data: {modifiedSince: modifiedSince},
				dataType:"json",
				success:function (data) {
					alert("The server returned " + data.length + " changes that occurred after " + modifiedSince);
					callback(data);
				},
				error: function(model, response) {
					alert(response.responseText);
				}
			});
		},

		txErrorHandler: function(tx) {
			alert(tx.message);
			log(tx.message);
		}

		/*
		parse: function(response, xhr) {
			return response[0];
			alert('response in parse ' + response.length);
			alert('response[0] in parse ' + + response[0].length);
			alert('returning response[0] in parse');
			if(response.type =="read"){
				return response[0];
			};
		},
		*/
	});

    // Returns the Model class
    return ProfileList;

  }

);