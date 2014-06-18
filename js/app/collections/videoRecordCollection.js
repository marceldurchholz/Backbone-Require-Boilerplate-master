// Collection.js
// -------------
define(["jquery","backbone", "models/VideoModel"],

  function($, Backbone, VideoModel) {

    // Creates a new Backbone Collection class object
    var videoRecordCollectionVar = Backbone.Collection.extend({
	
		model: VideoModel,
		localStorage: new Backbone.LocalStorage("videoRecordStorage"),
		url: 's299455960.online.de:5000/videos/'

    });

    // Returns the Model class
    return videoRecordCollectionVar;

  }

);