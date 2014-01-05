// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Profile", "models/System", "views/View", "views/Aboutus", "views/Listview", "views/Videos", "views/VideoDetailsView", "views/VideoRecordView", "views/LearningStreamView", "views/loginView", "views/DashboardView", "views/NoAccess", "views/LogoutView", "views/MyProfileView"],
        
    function($, Backbone, Profile, System, View, Aboutus, Listview, Videos, Videosdetailsview, Videorecordview, Learningstreamview, LoginViewJS,  DashboardView, NoAccess, Logout, MyProfile) {
		"use strict";
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

				$(function () {
					// window.MobileRouter = MobileRouter;
					Backbone.history.start({ pushState : false });
				});

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
				"myprofile" : "myprofile",
				"videos/details/:id" : "videodetails",
				"videos/details/view/:id" : "videodetailsview",
				"videos/record" : "videorecordview",
				"learningstreamview" : "learningstreamview",
				"employeeListItemView" : "employeeListItemView",
				"login" : "loginViewJS",
				"logout" : "logout"
            },
			startpage: function() {
				// redirectToUrl();
				// alert('routing to redirectToUrl');
				// system.redirectToUrl('#home');
				// this.changePageTransition(new View);
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
				// this.changePage(Videos, {});
				this.changePageTransition(new Videos);
            },
            videodetailsview: function(id) {
				// new Videosdetailsview({id:id});
				this.changePage(Videosdetailsview, {id:id});
            },
			videorecordview: function() {
				// alert('bla');
				this.changePage(Videorecordview, {});
			},
            dashboard: function() {
                // new DashboardView();
				// this.changePage(DashboardView, {});
				this.changePageTransition(new DashboardView);
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
			home: function() {
				// alert('routing to home');
				// new View();
				this.changePageTransition(new View);
				// this.changePage(View, {});
            },
            loginViewJS: function() {
				// alert('routing to login');
                // new LoginViewJS();
				// this.changePage(LoginViewJS, {});
				this.changePageTransition(new LoginViewJS);
            },
			changePageTransition:function (page) {
				$(page.el).attr('data-role', 'page');
				$('body').append($(page.el));
				var transition = page.transition ? page.transition : $.mobile.defaultPageTransition;
				// We don't want to slide the first page
				if (this.firstPage) {
					transition = 'none';
					this.firstPage = false;
				}
				$.mobile.changePage($(page.el), {changeHash:true, transition: 'slide'});
				console.log(page);
				// $('.ui-page-active').append('<div id="sidebarListViewDiv" class="sidebarListViewDiv" style="position:fixed;top:0;left:0;text-align:left;height:100%;z-index:0;width:220px;ba/ckground-color:#222;"></div>');
				page.render();
			},
			changePage: function(view, viewOptions) {
				// system.toggleLoading(true);
				// $.mobile.loadingMessage = 'Loading...Please wait';
				// $.mobile.showPageLoadingMsg();
				// $("#page-content").hide();
				
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