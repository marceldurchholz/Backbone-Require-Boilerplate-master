// Videos.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "views/VideoView", "text!templates/videosDetails.html", "views/videoDetailsView", "text!templates/sidebar.html"],

    function($, Backbone, VideoModel, videosCollection, Video, videos, videoDetailsView, sidebar){
		
			var Videos = Backbone.View.extend({
			
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
					this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisView.createVideo();});
				},
				initializeCollection:function(models,options) {
					// alert(this.id);
					// var myCollection = new Collection([ new Model({id: 'smith'}) ]);
					this._videosCollection = new videosCollection([], options);
					// this._videosCollection = new videosCollection();
				},
				fetch: function(models,options) {
					this.initializeCollection(models,options);
					// this._videosCollection = new videosCollection();
					var _thisView = this;
					this._videosCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							_thisView.render();
						}
					});
				},
				initialize: function(models, options) {
					// console.log('models');
					// console.log(models);
					// console.log('options');
					// console.log(options);
					this.initializeCollection(models,options);
					// this._videosCollection = new videosCollection();
					this.fetch(models,options);
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(videos, {});
					this.$el.html(this._template);
					// console.log('this._videosCollection.models');
					// console.log(this._videosCollection.models);
					this.nestedView = new videoDetailsView({collection: this._videosCollection.models}).render();


					videojs("video_player_1", { "controls": true, "autoplay": false, "preload": "off" }, function(){});
					var aspectRatio = 9/16; // Make up an aspect ratio
					var width = $(window).width();
					var myPlayer = _V_("video_player_1");
					// $(document).ready(function() {
					_V_("video_player_1").ready(function(){
						myPlayer.src([
							{ type: "video/mp4", src: "http://video-js.zencoder.com/oceans-clip.mp4" },
							{ type: "video/webm", src: "http://video-js.zencoder.com/oceans-clip.webm" },
							{ type: "video/ogg", src: "http://video-js.zencoder.com/oceans-clip.ogv" }
						]);
						// alert('bla');
						// myPlayer.currentTime(0);  
						myPlayer.posterImage.show();  
						myPlayer.controlBar.show();  
						myPlayer.bigPlayButton.hide();  
						myPlayer.pause();
						myPlayer.on('timeupdate', function() {
							if (myPlayer.currentTime() > 2) {
								// $(".video-js")[0].player.pause();
								// Paypal-Buy-Now-button.png
								// $("#video_player_1 .vjs-poster").css('background-image', 'url(/Paypal-Buy-Now-button.png)').show();
								myPlayer.currentTime(0);  
								myPlayer.posterImage.show();  
								// myPlayer.controlBar.hide();  
								myPlayer.bigPlayButton.hide();  
								myPlayer.cancelFullScreen();  
								myPlayer.pause();
								// $("#videocontainerlink").attr("href", "/blafoopeng/")
								// myPlayer.currentTime(0);
								// myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
								// $("#video_player_1.vjs-poster").css('background-image', 'url(http://video-js.zencoder.com/oceans-clip.jpg)').show();
							}
						});
					});

					
					
					this.$el.trigger('create');
					return this;
				}

			});

        return Videos;

    }

);