// DashboardView.js
// -------
define(["jquery", "backbone", "collections/sidemenusCollection", "text!templates/sidemenusList.html", "views/SidemenuView", "collections/usersCollection", "views/DashboardView", "text!templates/DashboardView.html", "views/DashboardNestedView", "models/VideoModel", "collections/videosCollection", "text!templates/videosList.html"],

    function($, Backbone, sidemenusCollection, sidemenusList, SidemenuView, usersCollection, DashboardView, DashboardViewPage, DashboardNestedView, VideoModel, videosCollection, videosList){
		
			var DashboardView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					// _thisViewDashboard = this;
					// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewDashboard.createVideo();});
				},
				initialize: function() {
					_thisViewDashboard = this;
					dpd.users.me(function(user) {
						if (user) {
							// alert(user.roles);
							// console.log(user);
							_thisViewDashboard.user = user;
							_thisViewDashboard.fetch();
							// _thisCollectionVideos.user = user;
							// console.log(user.roles);
						}
						else {
							// location.href = "#noaccess";
							// console.log('you are not logged in');
						}
					});

					/*
					var _thisViewDashboard = this;
					// this._sidemenusCollection = new sidemenusCollection();
					// var me = me || {};
					// this.me = me;
					dpd.users.me(function(user) {
						if (user) {
							_thisViewDashboard.me = user;
							// later in addition check roles
							_thisViewDashboard._usersCollection = new usersCollection([], {dbid:_thisViewDashboard.me.id});
							_thisViewDashboard._sidemenusCollection = new sidemenusCollection();
							_thisViewDashboard.fetch();
						}
						else {
							location.href = "#noaccess";
						}
					});
					// this.fetch();
					*/
					// this._videosCollection = new videosCollection();
					// this.fetch();
				},
				fetch: function() {
					var _thisViewDashboard = this;
					_thisViewDashboard.render();
					/*
					var _thisViewDashboard = this;
					this._sidemenusCollection = new sidemenusCollection([],{parentView:_thisViewDashboard});
					this._sidemenusCollection.fetch({
						success: function(coll, jsoncoll) {
							_thisViewDashboard.render();
						},
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
							// _thisViewDashboard.render();
						}
					});
					this._usersCollection = new usersCollection([], {dbid:_thisViewDashboard.me.id});
					this._usersCollection.fetch({
						success: function(coll, jsoncoll) {
							// _thisViewDashboard.render();
						},
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
							// _thisViewDashboard.render();
						}
					});	
					*/					
				},
				render: function() {
					// this.bindEvents();
					_thisViewDashboard = this;
					console.log('DOING render DashboardView.js called');
					// console.log(_thisViewDashboard.user);
					
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					this.nestedView = new SidemenuView().fetch();
					
					this.$el.html(_.template(DashboardViewPage, {}));
					this.nestedView = new DashboardNestedView({user:_thisViewDashboard.user}).fetch();
					
					/*
					this._template = _.template(DashboardViewPage, {});
					this.$el.html(this._template);
					console.log(this._usersCollection);
					this.nestedViewB = new DashboardNestedView({collection: this._usersCollection.models}).render();
					*/

					this.$el.trigger('create');
					return this;
				}

			});

        return DashboardView;

    }

);