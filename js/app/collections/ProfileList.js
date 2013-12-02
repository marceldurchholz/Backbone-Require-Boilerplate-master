// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
	var ProfileList = Backbone.Collection.extend({
		model: Profile,
		// url: 'profiles.jsonx'
		url: 'http://mobile002.appinaut.de/api/employees/index.php', 
		
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
		initialize: function() {
			// this.myProfiles = new JobCollection();
			/*
			var data = [
				{ id: "a", name: "path1" },
				{ id: "b", name: "path2" },
			];
			
			console.log("ProfileCollection initialize");
			/*
			this.fetch({
			   error: function () {
				 console.log("fetching error!!"); 
			   },
			   success: function () {
				  console.log("fetching success"); 
			   }
			}).complete(function () {
				console.log('done');
				console.log('length1:' +  this.length);
			});
			*/
			console.log('bla');
			// this.parse();
		}
	});

    // Returns the Model class
    return ProfileList;

  }

);