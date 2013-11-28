// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "views/View", "views/Aboutus", "views/Testarea", "collections/Collection"],
        
    function($, Backbone, Profile, View, Aboutus, Testarea, Collection) {

		$.support.cors = true;
		$.mobile.allowCrossDomainPages = true;
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;	
		$.mobile.buttonMarkup.hoverDelay = 0;
		$.mobile.defaultPageTransition = 'none'; 
		$.mobile.defaultDialogTransition = "none";
		$.mobile.page.prototype.options.degradeInputs.date = true;
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.ignoreContentEnabled=true;

		var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
				// report('MobileRouter.js','initialize:');
                Backbone.history.start();
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

		// this.$el.trigger('create');
		$('#body').trigger('create');

		return MobileRouter;

    }

);