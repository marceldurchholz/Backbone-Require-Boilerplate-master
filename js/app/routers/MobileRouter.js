// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/Aboutus", "views/EmployeeListItemView", "views/Testarea", "collections/Collection"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videodetails, EmployeeListItemView, Testarea, Collection) {

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
				// alert('aaa');
            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash bang on the url, the home method is called
                "": "home",
                "home": "home",
				"aboutus" : "aboutus",
				"listview" : "listview",
				"videos" : "videos",
				"videosdetails" : "aboutus",
				"employeeListItemView" : "employeeListItemView",
				"testarea" : "testarea"
            },
			
            home: function() {
				new View();
            },
            aboutus: function() {
                new Aboutus();
            },
            listview: function() {
                new Listview();
            },
            videos: function() {
                new Videos();
            },
            videodetails: function() {
                // console.log(id);
				// new Videodetails([], {id:id});
				// alert(id);
            },
            employeeListItemView: function() {
                new EmployeeListItemView();
            },
            testarea: function() {
                new Testarea();
            }
    
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		$(window).scrollTop(0);
		return MobileRouter;

    }

);