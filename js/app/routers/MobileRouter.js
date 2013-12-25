// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/VideoDetailsView", "views/loginView", "collections/Collection", "views/DashboardView", "views/NoAccess", "views/LogoutView", "views/MyProfileView", "views/SidebarListView"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videosdetailsview, LoginViewJS, Collection, DashboardView, NoAccess, Logout, MyProfile, SidebarListView) {

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
				"sidebarlist" : "sidebarlist",
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"logout" : "logout"
            },
			
            home: function() {
				// new View();
				this.changePage(View, {});
            },
            aboutus: function() {
                // new Aboutus();
				this.changePage(Aboutus, {});
                // this.myView = new Aboutus();
				// $.mobile.changePage($(Aboutus.el), { changeHash: false, transition: 'slide' });
				// return(false);
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
            sidebarlist: function() {
                new SidebarListView();
				// this.changePage(Videos, {});
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
				// alert('viewFadeIn');
			},
			changePage: function(view, viewOptions) {
				// $.mobile.loading( 'show', { theme: 'e', textVisible: true, textonly: true, html: '<div style="text-align:center;">Loading the awesome...</div>' });
				// $.mobile.loadingMessage = 'Loading...Please wait';
				// $.mobile.showPageLoadingMsg();
				// $("#page-content").hide();
				this.myView = new view(viewOptions);
				this.myView.$el.off('create', this.viewFadeIn, this.$el)
				this.myView.$el.on('create', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
				// this.myView.$el.on('initialized', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
			}
        });

		// this.$el.trigger('create');
		// $('#body').trigger('create');
		return MobileRouter;

    }

);