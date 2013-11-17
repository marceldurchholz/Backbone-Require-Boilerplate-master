// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Model", "views/View", "views/Aboutus", "views/Sidebar", "views/Testarea", "collections/Collection"],
        
    function($, Backbone, UserModel, View, Aboutus, Sidebar, Testarea, Collection) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
				report('MobileRouter.js','initialize:');
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash bang on the url, the home method is called
                "": "testarea",
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
            },
            sidebar: function() {
                new Sidebar();
            }
    
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }

);