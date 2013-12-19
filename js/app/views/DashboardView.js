// DashboardView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/usersCollection", "text!templates/DashboardView.html", "views/VideoView", "text!templates/sidebar.html", "views/DashboardView"],

    function($, Backbone, VideoModel, usersCollection, mainView, VideoView, sidebar, DashboardView){
		
			var DashboardView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				createVideo: function () {
					if (this._videosCollection.online==0) {
						// this._videosCollection._localStorage_users.create(new Video({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						// this._videosCollection._localStorage_users.create(new VideoModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/video-thumbnail.jpg"}));
					}
					return(false);
				},
				sendLogout: function() {
					_thisView = this;
					dpd.users.logout(function(err) {
						if (err) console.log(err);
						else {
							document.location.hash = "home";
						}
					});
					return(false);
					/*
					dpd.users.login({"username": "blafoo@digitalverve.de", "password": "blafoo"}, function(user, err) {
					  if(err) return console.log(err);
					  console.log(user);
					});
					*/
					/*
					// _thisView.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/video-thumbnail.jpg"}));
					$.ajax('http://dominik-lohmann.de:5000/users', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						// _thisView.fetch();
						console.log(toso);
					  }, 
					  error: function(xhr) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
					*/
					/*
					if (this._videosCollection.online==0) {
						// this._videosCollection._localStorage_users.create(new Video({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						// this._videosCollection._localStorage_users.create(new VideoModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/video-thumbnail.jpg"}));
					}
					return(false);
					*/
				},
				create: function(model) {
					_thisView = this;
					$.ajax('http://dominik-lohmann.de:5000/videos', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						_thisView.fetch();
					  }, 
					  error: function(xhr) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
				},
				bindEvents: function() {
					var _thisView = this;
					this.$el.off('click','.sendLogoutBtn').on('click','.sendLogoutBtn',function(){_thisView.sendLogout();});
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
					this.render();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(mainView, {});
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
					// this.nestedView = new VideoView({collection: this._usersCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return DashboardView;

    }

);