// MyProfileNestedView.js
// -------
define(["jquery", "backbone", "text!templates/MyProfileNestedViewPage.html"],

    function($, Backbone, MyProfileNestedViewPage){
		
		var MyProfileNestedView = Backbone.View.extend({
			el: "#MyProfileNestedViewDiv",
			initialize: function() {
				console.log('initializing MyProfileNestedView.js');
				this.initializeme();
			},
			initializeme: function() {
				console.log('initializeme MyProfileNestedView.js');
				var _thisViewMyProfileNested = this;
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					console.log(status);
					_thisViewMyProfileNested.me = status;
					_thisViewMyProfileNested.render();
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
					if ( _thisViewMyProfileNested.dfd.state() === "pending" ) {
						_thisViewMyProfileNested.dfd.notify( "working... " );
						setTimeout( _thisViewMyProfileNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewMyProfileNested = this;
				console.log('fetchMe MyProfileNestedView.js');
				_thisViewMyProfileNested.dfd = new jQuery.Deferred();
				_thisViewMyProfileNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewMyProfileNested.dfd.resolve(user);
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
				_thisViewMyProfileNested = this;
				console.log('fetching MyProfileNestedView.js');
				this.$el.hide();
			},
			bindEvents: function() {
				var _thisViewMyProfileNested = this;
			},
			render: function() {
				var _thisViewMyProfileNested = this;
				console.log('rendering MyProfileNestedView.js');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				console.log(_thisViewMyProfileNested.me);
				htmlContent = _.template(MyProfileNestedViewPage, {
					id: _thisViewMyProfileNested.me.id
					, pictureurl: _thisViewMyProfileNested.me.pictureurl
					, fullname: _thisViewMyProfileNested.me.fullname
					, slogan: _thisViewMyProfileNested.me.slogan
					, perstext: _thisViewMyProfileNested.me.perstext
				},{variable: 'user'});
				// alert(htmlContent);
				$(this.el).html(htmlContent);
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				return(this);
			}
		});

        return MyProfileNestedView;

    }

);