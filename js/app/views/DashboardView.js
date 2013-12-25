// DashboardView.js
// -------
define(["jquery", "backbone", "collections/sidebarCollection", "text!templates/sidebar.html", "views/SidebarListView", "collections/usersCollection", "views/DashboardView", "text!templates/DashboardView.html", "views/DashboardNestedView"],

    function($, Backbone, sidebarCollection, sidebar, SidebarListView, usersCollection, DashboardView, DashboardViewPage, DashboardNestedView){
		
			var DashboardView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisView = this;
					// this.$el.off('click','.sendLogoutBtn').on('click','.sendLogoutBtn',function(){_thisView.sendLogout();});
				},
				fetch: function() {
					var _thisView = this;
					console.log('fetching user');
					this._usersCollection = new usersCollection([], {dbid:_thisView.me.id});
					this._usersCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							_thisView.render();
						}
					});
				},
				initialize: function() {
					_thisView = this;
					_thisView._sidebarCollection = new sidebarCollection([], {});
					console.log('_thisView._sidebarCollection.models');
					console.log(_thisView._sidebarCollection.models);
					// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
					var me = me || {};
					dpd.users.me(function(user) {
						if (user) {
							_thisView.me = user;
							_thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id});
							_thisView.fetch();
						}
						else {
							location.href = "#noaccess";
						}
					});
					// this.render();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					// , "views/SidebarListView"
					// this.sidebar = _.template(sidebar, {});
					// $('#sidebar').html(sidebar);
					console.log('this._sidebarCollection.models');
					console.log(this._sidebarCollection.models);
					this.nestedViewSidebar = new SidebarListView({collection: this._sidebarCollection.models}).render();
					
					this._template = _.template(DashboardViewPage, {});
					this.$el.html(this._template);
					/*
					dpd.users.me(function(user) {
						if (user) {
							// console.log(user);
							// alert(user.pictureurl);
							// $('#myImage').attr('src',user.pictureurl);
							// location.href = "/welcome.html";
						}
					});
					*/
					// console.log('this._usersCollection.models');
					// console.log(this._usersCollection.models);
					// console.log('this._usersCollection.models');
					// console.log(this._usersCollection.models);
					this.nestedView = new DashboardNestedView({collection: this._usersCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return DashboardView;

    }

);