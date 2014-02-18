// DashboardNestedView.js
// -------
define(["jquery", "backbone", "text!templates/DashboardNestedViewPage.html"],

    function($, Backbone, DashboardNestedViewPage){
		
		var DashboardNestedViewVar = Backbone.View.extend({
			el: "#DashboardNestedViewDiv",
			initialize: function() {
				_thisViewDashboardNested = this;
				console.log('initialize DashboardNestedView.js');
				dpd.users.me(function(me) {
					if (me) _thisViewDashboardNested.initializeme();
					else system.redirectToUrl('#login');
				});
			},
			initializeme: function() {
				console.log('initializeme DashboardNestedView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					console.log(status);
					_thisViewDashboardNested.me = status;
					_thisViewDashboardNested.render();
				  },
				  function( status ) {
					// console.log( status + ", you fail this time" );
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewDashboardNested.dfd.state() === "pending" ) {
						_thisViewDashboardNested.dfd.notify( "working... " );
						setTimeout( _thisViewDashboardNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewDashboardNested = this;
				console.log('fetchMe DashboardNestedView.js');
				_thisViewDashboardNested.dfd = new jQuery.Deferred();
				_thisViewDashboardNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewDashboardNested.dfd.resolve(user);
						}, 0 );
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
				return this.dfd.promise();
			},
			fetch: function() {	
				_thisViewDashboardNested = this;
				console.log('fetching DashboardNestedView.js');
				this.$el.hide();
			},
			showDetails: function(e) {
				// e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				// window.location.hash = '#videos/details/'+id;
				// Router.navigate( $(this).attr('href') );
				window.location.hash = '#videos/details/view/'+id;
				// alert('bla');
			},
			bindEvents: function() {
				var _thisViewDashboardNested = this;
				dpd.users.me(function(user) {
					if (user) {
						// _thisViewDashboardNested.me = user;
						if (_thisViewDashboardNested.me.active==false || user.fullname=='') {
							$('#showMenu').hide();
							$('#showPageOptions').hide();
							// system.redirectToUrl('#myprofile');
							window.location.href = '#myprofile';
						}
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
			},
			render: function() {
				var _thisViewDashboardNested = this;
				console.log('rendering DashboardNestedView.js');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				if (_thisViewDashboardNested.me.pictureurl==undefined || _thisViewDashboardNested.me.pictureurl.length<=10) {
					_thisViewDashboardNested.me.pictureurl = 'images/avatar.jpg';
				}
				htmlContent = _.template(DashboardNestedViewPage, {
					id: _thisViewDashboardNested.me.id
					, pictureurl: _thisViewDashboardNested.me.pictureurl
					, fullname: _thisViewDashboardNested.me.fullname
				},{variable: 'user'});
				$(this.el).html(htmlContent);
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				this.bindEvents();
				return(this);
			}
		});

        return DashboardNestedViewVar;

    }

);