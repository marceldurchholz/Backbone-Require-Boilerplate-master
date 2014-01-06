// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, loginPage){
		
			var loginView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					// var _thisView = this;
					// this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
				},
				sendLogin: function() {
					_thisView = this;
					var username = $('#username').val();
					var password = $('#password').val();
					dpd.users.login({username: username, password: password}, function(session, error) {
						if (error) {
							console.log(error.message);
						} else {
							// location.href = "/welcome.html";
							// alert('login ok');
							// _thisView.changePage(DashboardView);
							document.location.hash = "dashboard";
							$('.ui-header').show();
						}
					});
				},
				sync: function() {
				},
				fetch: function() {
					this.$el.hide();
					this.render();
				},
				initialize: function() {
					// this._videosCollection = new videosCollection();
					// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
					var _thisView = this;
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
					this.fetch();
				},
				render: function() {
					// this.bindEvents();
					console.log('DOING render Videos.js called');
					_thisViewLogin = this;
					
					$('.ui-header').hide();
					
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewLogin.nestedView = new SidemenuView().fetch();
					_thisViewLogin.$el.html(_.template(loginPage, {}));
					this.$el.trigger('create');
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					return this;
				}

			});

        return loginView;

    }

);