// DashboardView.js
// -------
define(["jquery", "backbone", "collections/sidemenusCollection", "text!templates/sidemenusList.html", "views/SidemenuView", "collections/sidebarCollection", "views/SidebarListView", "collections/usersCollection", "views/DashboardView", "text!templates/DashboardView.html", "views/DashboardNestedView"],

    function($, Backbone, sidemenusCollection, sidemenusList, SidemenuView, sidebarCollection, SidebarListView, usersCollection, DashboardView, DashboardViewPage, DashboardNestedView){
		
			var DashboardView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				initialize: function() {
					var _thisView = this;
					this._sidemenusCollection = new sidemenusCollection();
					// var me = me || {};
					// this.me = me;
					dpd.users.me(function(user) {
						if (user) {
							_thisView.me = user;
							// later in addition check roles
							_thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id});
							_thisView._sidemenusCollection = new sidemenusCollection();
							_thisView.fetch();
						}
						else {
							location.href = "#noaccess";
						}
					});
					// this.fetch();
				},
				fetch: function() {
					var _thisView = this;
					this._sidemenusCollection = new sidemenusCollection();
					this._sidemenusCollection.fetch({
						success: function(coll, jsoncoll) {
							_thisView.render();
						},
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
							// _thisView.render();
						}
					});
					this._usersCollection = new usersCollection([], {dbid:_thisView.me.id});
					this._usersCollection.fetch({
						success: function(coll, jsoncoll) {
							_thisView.render();
						},
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
							// _thisView.render();
						}
					});					
				},
				render: function() {
					// this.bindEvents();
					console.log('DOING render Videos.js called');
					
					// , "views/SidebarListView"
					// this.sidebar = _.template(sidebar, {});
					// $('#sidebar').html(sidebar);
					// console.log('this._sidebarCollection.models');
					// console.log(this._sidebarCollection.models);
					// this.nestedViewSidebar = new SidebarListView({collection: this._sidebarCollection.models}).render();
					// $('#sidebar').html = new SidebarListView({collection: this._sidebarCollection.models}).render();
					// this.nestedViewSidebar = new SidebarListView({collection: this._sidebarCollection.models}).render();
					
					this._template = _.template(sidemenusList, {});
					$('#sidebarListViewDiv').html(this._template);
					this.nestedView = new SidemenuView({collection: this._sidemenusCollection.models}).render();
					
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