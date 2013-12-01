// ProfileList.js
// -------------
define(["jquery", "backbone", "models/Profile"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
	var ProfileList = Backbone.Collection.extend({
		model: Profile,
		// url: 'profiles.jsonx'
		url: 'http://mobile002.appinaut.de/api/profiles/index.php'
	});

    // Returns the Model class
    return ProfileList;

  }

);