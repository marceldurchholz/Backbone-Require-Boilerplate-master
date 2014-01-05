// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, loginPage){
		
		"use strict";
	
		var loginView = Backbone.View.extend({
		
			events: {
			},
			bindEvents: function() {
				// var _thisView = this;
				// this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
			},
			sendLogin: function() {
				var _thisView = this;
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
				// this.render();
			},
			initialize: function() {
				// this._videosCollection = new videosCollection();
				// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
				var _thisView = this;
				this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
				// this.fetch();
			},
			render: function() {
				this.bindEvents();
				console.log('DOING render loginView.js called');
				this.$el.html(_.template(loginPage, {}));
				this.nestedView = new SidemenuView().fetch();
				this.$el.trigger('create');				
				return this;
			}

		});

        return loginView;

    }

);