// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/Planer", "views/Cards", "views/VideoDetailsView", "views/PlanDetailsView", "views/CardDetailsView", "views/CardStartView", "views/VideoRecordView", "views/LearningStreamView", "views/loginView", "views/DashboardView", "views/NoAccess", "views/LogoutView", "views/MyProfileView"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Planer, Cards, Videosdetailsview, Planerdetailsview, Cardsdetailsview, Cardstartview, Videorecordview, Learningstreamview, LoginViewJS,  DashboardView, NoAccess, Logout, MyProfile) {

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
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"videos/record" : "videorecordview",
				"planer" : "planer",
				"planer/details/:id" : "plandetails",
				"planer/details/view/:id" : "plandetailsview",
				"planer/entry" : "planentryview",
				"cards" : "cards",
				"cards/details/:id" : "carddetails",
				"cards/details/view/:id" : "carddetailsview",
				"cards/start/view/:id/:page" : "cardstartview",
				"cards/entry" : "cardentryview",
				"myprofile" : "myprofile",
				"learningstreamview" : "learningstreamview",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"logout" : "logout"
            },
			startpage: function() {
				// redirectToUrl();
				// alert('routing to redirectToUrl');
				system.redirectToUrl('#home');
			},
			home: function() {
				// alert('routing to home');
				// new View();
				// system.redirectToUrl('#login');
				this.changePage(View, {});
            },
			learningstreamview: function() {
				// alert('routing to home');
				new Learningstreamview();
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
            videos: function() {
                // new Videos();
				this.changePage(Videos, {});
            },
            planer: function() {
                // new Planer();
				// alert('bla');
				this.changePage(Planer, {});
            },
            cards: function() {
                // new Cards();
				// alert('bla');
				this.changePage(Cards, {});
            },
            carddetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Cardsdetailsview, {id:id});
            },
            cardstartview: function(cardid,page) {
				// new Videosdetailsview({id:id});
				this.changePage(Cardstartview, {cardid:cardid,page:page});
            },
            videodetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Videosdetailsview, {id:id});
            },
            plandetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Planerdetailsview, {id:id});
            },
			videorecordview: function() {
				// alert('bla');
				this.changePage(Videorecordview, {});
			},
			planentryview: function() {
				// alert('bla');
				this.changePage(Planentryview, {});
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
				this.changePage(NoAccess, {});
            },
            logout: function() {
                // new Logout();
				this.changePage(Logout, {});
            },
			/*
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
				// console.log('create triggered');
				// $("#page-content").show();
				new FastClick(document.body);
				$("#page-content").fadeIn( 1000, function() {
					$('.ui-content').scrollTop(0);
					$.mobile.hidePageLoadingMsg();
					new FastClick(document.body);
				});
			},
			*/
			changePage: function(view, viewOptions) {
				// system.toggleLoading(true);
				// $.mobile.loadingMessage = 'Loading...Please wait';
				// $.mobile.showPageLoadingMsg();
				// $("#page-content").hide();
				// $("#body").hide();
				// $("#page-content").css({"position":"fixed", "top":"100px"});
				// $("#ui-page-active").css({"position":"fixed", "top":"200px"});
				this.myView = new view(viewOptions);
				new FastClick(document.body);
				// this.myView.$el.off('create', this.testFunction);
				// this.myView.$el.on('create', this.testFunction);
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