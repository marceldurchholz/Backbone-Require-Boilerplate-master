// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/VideoDetailsView", "views/loginView", "views/Testarea", "collections/Collection"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videosdetailsview, LoginViewJS, Testarea, Collection) {

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
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"testarea" : "testarea"
            },
			
            home: function() {
				new View();
            },
            aboutus: function() {
                new Aboutus();
            },
            listview: function() {
                var myListview = new Listview();
				myListview.render(); 
				this.changePage(myListview);
            },
            videos: function() {
                new Videos();
            },
            videodetailsview: function(id) {
				new Videosdetailsview({id:id});
            },
            loginViewJS: function() {
                new LoginViewJS();
            },
            testarea: function() {
                new Testarea();
            },
			changePage: function(view) {
				// alert('change page');
				//add the attribute ‘data-role=”page” ‘ for each view’s div 
				view.$el.attr('data-role', 'page');   
				//append to dom 
				$('body').append(view.$el);
				if(!this.init) {
					$.mobile.changePage($(view.el), {changeHash:false}); 
				} else {   
					this.init = false; 
				}
			}
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		$(window).scrollTop(0);
		return MobileRouter;

    }

);