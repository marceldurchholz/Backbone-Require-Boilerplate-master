// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
	var ProfileList = Backbone.Collection.extend({
		model: Profile,
		// url: 'profiles.jsonx'
		url: 'http://mobile002.appinaut.de/api/employees/index.php', 
		
		initialize: function() {
			console.log('collection initializing');
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