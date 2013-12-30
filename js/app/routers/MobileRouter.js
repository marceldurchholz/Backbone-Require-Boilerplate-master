// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/VideoDetailsView", "views/VideoAddToFavourites", "views/loginView", "collections/Collection", "views/DashboardView", "views/NoAccess", "views/LogoutView", "views/MyProfileView", "views/SidebarListView", "views/Sidemenus"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videosdetailsview, Videoaddtofavourites, LoginViewJS, Collection, DashboardView, NoAccess, Logout, MyProfile, SidebarListView, Sidemenus) {

		var MobileRouter = Backbone.Router.extend({

			routerSwitched: function(status) {
				var routerSwitchedDeferred = $.Deferred();
				var routerSwitchedDeferredWatcher = routerSwitchedDeferred.then(function( value ) {
					return status;
				});
				routerSwitchedDeferred.resolve();
				routerSwitchedDeferredWatcher.done(function( value ) {
					alert(value);
					// console.log(value);
				});
			},
            initialize: function() {
                Backbone.history.start();
                // Tells Backbone to start watching for hashchange events
				// report('MobileRouter.js','initialize:');
				// alert('aaa');
				// this.routerSwitched(false);
            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash bang on the url, the home method is called
                "": "startpage",
				"home": "home",
				"aboutus" : "aboutus",
				"noaccess" : "noaccess",
				"dashboard" : "dashboard",
				"listview" : "listview",
				"videos" : "videos",
				"sidemenus" : "sidemenus",
				"myprofile" : "myprofile",
				"sidebarlist" : "sidebarlist",
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"videos/favourites/add/:id" : "videoaddtofavourites",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"logout" : "logout"
            },
			startpage: function() {
				// redirectToUrl();
				// alert('routing to redirectToUrl');
				system.redirectToUrl('#login');
			},
			home: function() {
				// alert('routing to home');
				new View();
				// this.changePage(View, {});
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
            sidemenus: function() {
				this.changePage(Sidemenus, {});
            },
            videodetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Videosdetailsview, {id:id});
            },
			videoaddtofavourites: function(id) {
				new Videoaddtofavourites({id:id});
			},
            loginViewJS: function() {
				// alert('routing to login');
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
                // new NoAccess();
				this.changePage(DashboardView, {});
            },
            logout: function() {
                // new Logout();
				this.changePage(Logout, {});
            },
			viewFadeIn: function() {
				// alert('viewFadeIn');
				// $.mobile.loading( 'hide' );
				// $("#page-content").show();
				// $('.ui-content').scrollTop(0);
				$("#page-content").fadeIn( 100, function() {
					// $( "#page-content" ).html('bla');
					// Animation complete
					$('.ui-content').scrollTop(0);
					// console.log("$.mobile.loading( 'hide' )");
					// $.mobile.loading( 'hide' );
					// system.toggleLoading(false);
				});
			},
			testFunction: function() {
				// alert('test');
				// $("#page-content").show();
				/*
				$("#page-content").fadeIn( 1000, function() {
					$('.ui-content').scrollTop(0);
				});
				*/
			},
			changePage: function(view, viewOptions) {
				// system.toggleLoading(true);
				// $.mobile.loadingMessage = 'Loading...Please wait';
				// $.mobile.showPageLoadingMsg();
				// $("#page-content").hide();
				
				this.myView = new view(viewOptions);
				this.myView.$el.off('create', this.testFunction);
				this.myView.$el.on('create', this.testFunction);
				// this.myView.$el.off('create', this.viewFadeIn, this.$el);
				// this.myView.$el.on('create', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
				
				// this.myView.$el.on('initialized', this.viewFadeIn, this.$el); // << hier noch ein .off hinzufügen, weil multiple ausführung!!! <<
			}
        });
		
		// eventuell nützlich
		// http://stackoverflow.com/questions/11787384/backbone-js-and-jquery-mobile-accessing-router-function-from-view
		// und
		// http://stackoverflow.com/questions/11533247/uncaught-typeerror-when-trying-to-call-loading-with-jquery-mobile
		
		// this.$el.trigger('create');
		// $('#body').trigger('create');
		return MobileRouter;

    }

);