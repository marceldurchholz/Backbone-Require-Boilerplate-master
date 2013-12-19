// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/VideoDetailsView", "views/loginView", "views/Testarea", "collections/Collection", "views/DashboardView", "views/NoAccess", "views/LogoutView", "views/MyProfileView"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videosdetailsview, LoginViewJS, Testarea, Collection, DashboardView, NoAccess, Logout, MyProfile) {

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
				"noaccess" : "noaccess",
				"dashboard" : "dashboard",
				"listview" : "listview",
				"videos" : "videos",
				"myprofile" : "myprofile",
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"logout" : "logout",
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
                // new LoginViewJS();
				this.changePage(LoginViewJS, {});
            },
            testarea: function() {
                new Testarea();
            },
            dashboard: function() {
                // new DashboardView();
				this.changePage(DashboardView, {});
            },
            myprofile: function() {
                // new MyProfile();
				this.changePage(MyProfile, {});
            },
            noaccess: function() {
                new NoAccess();
				// this.changePage(DashboardView, {});
            },
            logout: function() {
                new Logout();
				// this.changePage(DashboardView, {});
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
				this.myView.$el.off('create', this.viewFadeIn, this.$el).on('create', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
			}
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		return MobileRouter;

    }

);