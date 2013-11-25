// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Model", "views/View", "views/Aboutus", "views/Testarea", "collections/Collection"],
        
    function($, Backbone, UserModel, View, Aboutus, Testarea, Collection) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
				// report('MobileRouter.js','initialize:');
                Backbone.history.start();
				$.when(dd, jqd).done(function doInit() {
					setTimeout(function() {
						// alert("Hello");
						populateDeviceInfo();
					},1000);
				});
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
                // alert('new View');
				// alert('bla');
            },
            aboutus: function() {
                new Aboutus();
				// populateDeviceInfo();
            },
            testarea: function() {
                new Testarea();
				// populateDeviceInfo();
            }
    
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }

);