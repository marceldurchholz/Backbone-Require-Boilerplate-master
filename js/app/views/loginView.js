// loginView.js
// -------
define(["jquery", "backbone", "collections/videosCollection", "text!templates/loginPage.html", "text!templates/sidebar.html"],

    function($, Backbone, videosCollection, loginPage, sidebar){
		
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
				fetch: function() {
					this._videosCollection = new videosCollection(); var _thisView = this; this._videosCollection.fetch({ error: function(action, coll) { console.log(action); console.log(coll); }, success: function(coll, jsoncoll) { _thisView.render(); } });
				},
				initialize: function() {
					this._videosCollection = new videosCollection();
					// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
					this.fetch();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(loginPage, {});
					this.$el.html(this._template);
					// console.log('this._videosCollection.models');
					// console.log(this._videosCollection.models);
					// this.nestedView = new VideoView({collection: this._videosCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return loginView;

    }

);