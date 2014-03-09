// MyProfileView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "models/VideoModel", "text!templates/sidebar.html", "collections/usersCollection", "views/MyProfileView", "text!templates/MyProfileView.html", "views/MyProfileNestedView", "models/VideoModel", "text!templates/videosList.html", "views/VideoView"],

    function($, Backbone, sidemenusList, SidemenuView, VideoModel, sidebar, usersCollection, MyProfileView, MyProfilePage, MyProfileNestedView, VideoModel, videosList, VideoView){
		
			var MyProfileViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisViewProfile = this;
					// this.$el.off('click','.sendLogoutBtn').on('click','.sendLogoutBtn',function(){_thisView.sendLogout();});
				},
				sync: function() {
				},
				fetch: function() {
					// this.$el.hide();
					this.render();
				},
				initialize: function() {
					/*
					_thisViewProfile = this;
					var me = me || {};
					// this.me = me;
					dpd.users.me(function(user) {
						if (user) {
							_thisView.me = user;
							// later in addition check roles
							_thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id});
							_thisView.fetch();
						}
						else {
							location.href = "#noaccess";
						}
					});
					// this.render();
					*/
					var _thisViewProfile = this;
					// this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
					// this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(){_thisView.sendRegister();});
					this.fetch();
				},
				/*
				fetch: function() {
					var _thisViewProfile = this;
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
				*/
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					_thisViewProfile = this;
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewProfile.nestedView = new SidemenuView().fetch();
					
					_thisViewProfile.$el.html(_.template(MyProfilePage, {}));
					_thisViewProfile.nestedView = new MyProfileNestedView().fetch();

					_thisViewProfile.$el.trigger('create');
					
					/*
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(DashboardViewPage, {});
					this.$el.html(this._template);
					dpd.users.me(function(user) {
						if (user) {
							// console.log(user);
							// alert(user.pictureurl);
							$('#myImage').attr('src',user.pictureurl);
							// location.href = "/welcome.html";
						}
					});
					// console.log('this._usersCollection.models');
					// console.log(this._usersCollection.models);
					console.log('this._usersCollection.models');
					console.log(this._usersCollection.models);
					this.nestedView = new MyProfileNestedView({collection: this._usersCollection.models}).render();

					this.$el.trigger('create');
					*/
					
					return this;
				}

			});

        return MyProfileViewVar;

    }

);
