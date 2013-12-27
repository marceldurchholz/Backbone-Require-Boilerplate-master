// SidebarListView.js
// -------
define(["jquery", "backbone", "models/SidebarModel", "text!templates/sidebar.html", "collections/sidebarCollection", "text!templates/SidebarListViewPage.html", "views/SidebarView"],

    function($, Backbone, SidebarModel, sidebarPage, sidebarCollection, SidebarListViewPage, SidebarView){
		
			var SidebarListView = Backbone.View.extend({
			
				el: "#sidebar",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisView = this;
					// this.$el.off('click','.sendLogoutBtn').on('click','.sendLogoutBtn',function(){_thisView.sendLogout();});
				},
				fetch: function() {
					var _thisView = this;
					// console.log('fetching user');
					this._sidebarCollection = new sidebarCollection([], {dbid:_thisView.me.id});
					this._sidebarCollection.fetch({
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
					var me = me || {};
					// this.me = me;
					dpd.users.me(function(user) {
						if (user) {
							_thisView.me = user;
							console.log('_thisView.me');
							console.log(_thisView.me);
							// later in addition check roles
							_thisView._sidebarCollection = new sidebarCollection([], {dbid:_thisView.me.id});
							console.log('_thisView._sidebarCollection.models');
							console.log(_thisView._sidebarCollection.models);
							// _thisView.nestedView = new SidebarView({collection: _thisView._sidebarCollection.models}).render();
							// _thisView.sidebar = new SidebarView({collection: _thisView._sidebarCollection.models}).render();
							_thisView.nestedView = new SidebarView({collection: _thisView._sidebarCollection.models}).render();

							_thisView.fetch();
						}
						else {
							// location.href = "#noaccess";
						}
					});
					// this.render();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render SidebarListView.js called');
					
					this._template = _.template(SidebarListViewPage, {});
					this.$el.html(this._template);
					
					
					
					
					this.$el.trigger('create');
					return this;
				}

			});

        return SidebarListView;

    }

);