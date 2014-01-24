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
			alertInputValue: function(e) {
				/*
				console.log(e);
				console.log(e.currentTarget.id);
				console.log(e.currentTarget.defaultValue);
				console.log(e.currentTarget.value);
				*/
				var obj = e.currentTarget;
				if (obj.defaultValue != obj.value && obj.value!='') {
					console.log(_thisViewMyProfileNested.me.id);
					console.log(obj.id);
					if (obj.id=='username') {
						console.log(checkEmail(obj.value));
						if (checkEmail(obj.value)==true) { }
						else return false;
					}
					// if (obj.id=='fullname') {
						var o = new Object();
						o.id = obj.id;
						o.value = obj.value;
						if (obj.id=='fullname') dpd.users.put(_thisViewMyProfileNested.me.id, {"fullname":obj.value}, function(result, err) { if(err) return console.log(err); console.log(result, result.id); });
						if (obj.id=='username') dpd.users.put(_thisViewMyProfileNested.me.id, {"username":obj.value}, function(result, err) { if(err) return console.log(err); console.log(result, result.id); });
					// }
				}
			},
			bindEvents: function() {
				var _thisViewMyProfileNested = this;
				$('#showMenu').hide();
				$('#showPageOptions').hide();
				$("#fullname").blur(this.alertInputValue);
				$("#username").blur(this.alertInputValue);
				// $("#username").blur(this.alertInputValue);
			},
			render: function() {
				var _thisViewMyProfileNested = this;
				console.log('rendering MyProfileNestedView.js');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				console.log(_thisViewMyProfileNested.me);
				if (!_thisViewMyProfileNested.me.coins) _thisViewMyProfileNested.me.coins = "0";
				htmlContent = _.template(MyProfileNestedViewPage, {
					id: _thisViewMyProfileNested.me.id
					, pictureurl: _thisViewMyProfileNested.me.pictureurl
					, fullname: _thisViewMyProfileNested.me.fullname
					, slogan: _thisViewMyProfileNested.me.slogan
					, perstext: _thisViewMyProfileNested.me.perstext
					, username: _thisViewMyProfileNested.me.username
					, coins: _thisViewMyProfileNested.me.coins
				},{variable: 'user'});
				// alert(htmlContent);
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

        return MyProfileNestedView;

    }

);