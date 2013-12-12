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
				// $('#page-content').html('aaa');
				// var bla = $('#page-content').html();
				// console.log($(body).html());
				// console.log('bla');
				// myListview.render(); 
				// this.changePage(bla);
				// $('#page-content').remove();
				// var myListview = new Listview();
				// var changePage = this.changePage(Listview, {});
				// $('#page-content').setElement( Listview() );
				// this.changePage();
				new Listview();
            },
			viewFactory: function(view, viewOptions) {
			  //perform your boilerplate code
			  // this.myView = new view(viewOptions);
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
			changePage: function(view, viewOptions) {
				this.myView = new view(viewOptions);
				// $('#page-content').remove();
				// $('div[data-role="page"]').on('pagehide', function (event, ui) { 
				// });
				// alert('change page');
				//add the attribute ‘data-role=”page” ‘ for each view’s div 
				// alert($(view.el));
				// var view = new Listview();
				// view.$el.attr('data-role', 'content');   
				//append to dom 
				console.log(view.$el);
				// $('#mainpagediv').append(view.$el);
				
			}
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		$(window).scrollTop(0);
		return MobileRouter;

    }

);