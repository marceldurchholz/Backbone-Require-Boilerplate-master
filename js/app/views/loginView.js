// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView","text!templates/videosList.html", "views/VideoView","text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, videosList, VideoView, loginPage){
		
			var loginView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisView = this;
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
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
						}
					});
				},
				sync: function() {
				},
				fetch: function() {
					this.render();
				},
				initialize: function() {
					// this._videosCollection = new videosCollection();
					// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
					this.fetch();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					_thisViewLogin = this;
					var ani = setTimeout ( function() {
						$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
						_thisViewLogin.nestedView = new SidemenuView().fetch();
						
						// _thisViewLogin._template = _.template(loginPage, {});
						// _thisViewLogin.$el.html(this._template).fetch();
						_thisViewLogin.$el.html(_.template(loginPage, {}));
						// _thisViewLogin.nestedView = new loginNestedView().fetch();
						
						_thisViewLogin.$el.trigger('create');
					}, 500 );
					// this.sidebar = _.template(sidebar, {});
					// $('#sidebar').html(sidebar);
					
					// console.log('this._videosCollection.models');
					// console.log(this._videosCollection.models);
					// this.nestedView = new VideoView({collection: this._videosCollection.models}).render();

					// this.$el.trigger('create');
					return this;
				}

			});

        return loginView;

    }

);