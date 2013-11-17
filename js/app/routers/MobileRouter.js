// MobileRouter.js
// ---------------
$(document).ready(function(){
	report('MobileRouter.js','document.ready');

	define(["jquery", "backbone", "models/Model", "views/View", "views/Aboutus", "collections/Collection"],		
		
		function($, Backbone, UserModel, View, Aboutus, Collection) {

			var MobileRouter = Backbone.Router.extend({

				initialize: function() {

					// Tells Backbone to start watching for hashchange events
					Backbone.history.start();
					// app.initialize();
				},

				// All of your Backbone Routes (add more)
				routes: {
					// When there is no hash bang on the url, the home method is called
					"": "home",
					"home": "home",
					"aboutus" : "aboutus",
					"testarea" : "testarea"
				},

				home: function() {
					new View();
				},
				aboutus: function() {
					new Aboutus();
				},
				testarea: function() {
					new Testarea();
				}
		
			});

			// Returns the MobileRouter class
			return MobileRouter;

		}
		

	);

app.initialize();
});
