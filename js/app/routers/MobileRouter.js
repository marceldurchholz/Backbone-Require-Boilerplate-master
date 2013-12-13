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
				// this.changePage(View, {});
            },
            aboutus: function() {
                // new Aboutus();
				this.changePage(Aboutus, {});
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
				this.changePage(Listview, {});
				// var bla = new Listview();
            },
            videos: function() {
                // new Videos();
				this.changePage(Videos, {});
            },
            videodetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Videosdetailsview, {id:id});
            },
            loginViewJS: function() {
                new LoginViewJS();
            },
            testarea: function() {
                new Testarea();
            },
			viewFadeIn: function() {
				// alert('aaa');
				$("#page-content").fadeIn( 500, function() {
					// $( "#page-content" ).html('bla');
					// Animation complete
					$('.ui-content').scrollTop(0);
					$.mobile.loading( 'hide' );
				});
			},
			changePage: function(view, viewOptions) {
				$.mobile.loading( 'show', { theme: 'e', textVisible: true, textonly: true, html: '<div style="text-align:center;">Loading the awesome...</div>' });
				$("#page-content").hide();
				this.myView = new view(viewOptions);
				// this.myView.pastInitialize();
				// console.log(this.myView);
				// $('#page-content').remove();
				// $('div[data-role="page"]').on('pagehide', function (event, ui) { 
				// });
				// alert('change page');
				//add the attribute ‘data-role=”page” ‘ for each view’s div 
				// alert($(view.el));
				// var view = new Listview();
				// view.$el.attr('data-role', 'content');   
				//append to dom 
				// console.log(this.myView.$el.selector);
				// console.log(this.myView.$el);
				// var _thisView = this;
				this.myView.$el.off('create', this.viewFadeIn, this.$el).on('create', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
				// $('#mainpagediv').append(view.$el);
				
			}
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		return MobileRouter;

    }

);