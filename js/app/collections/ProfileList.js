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
			alert('collection initializing');
			/*
			var myCollection = new ProfileList([
				new Profile({ name: 'hans', id: 200}),
				new Profile({ title: 'peter', id: 250}),
				new Profile({ title: 'werner', id: 100}),
				new Profile({ title: 'connie', id: 10})
				// Add more here
			]);
			*/
			// console.log(this);
			// this.add({ name: 'fred', id: 20 });
			// console.log(this);
			// this.ProfileList = myCollection;
		},
		parse: function(response, xhr) {
			// return response[0];
			// alert('response[0] in parse ' + + response[0].length);
			// alert('returning response[0] in parse');
			// alert(response.type);
			/*
			if (response.type =="read"){
				return response[0];
			}
			else */
			this.checkTable(function() {
				alert('coming back to checkTable');
				alert('response in parse ' + response.length);
				return(response);
			});
			// return(response);
		},
		checkTable: function(callback) {
			alert('first checkTable');
			callback();
			var self = this;
			this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
			this.db.transaction(
				function(tx) {
					tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='employee'", this.txErrorHandler,
						function(tx, results) {
							if (results.rows.length == 1) {
								alert('Using existing Employee table in local SQLite database');
							}
							else
							{
								alert('Employee table does not exist in local SQLite database');
								// self.createTable(callback);
							}
					});
					// self.sync(renderList);
				}
			)
		},
		txErrorHandler: function(tx) {
			alert('error tx.message');
			// alert(tx.message);
		}

	});

    // Returns the Model class
    return ProfileList;

  }

);