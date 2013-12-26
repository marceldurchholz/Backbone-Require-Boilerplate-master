// Videos.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/videosList.html", "views/VideoView", "text!templates/sidebar.html"],

    function($, Backbone, VideoModel, videosCollection, videosList, VideoView, sidebar){
		
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
				fetch: function() {
					this._videosCollection = new videosCollection(); var _thisView = this; this._videosCollection.fetch({ error: function(action, coll) { alert('ERROR: fetch _videosCollection'); _thisView.render(); console.log(action); console.log(coll); }, success: function(coll, jsoncoll) { _thisView.render(); } });
					/*
					this._videosCollection = new videosCollection();
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
					*/
				},
				initialize: function() {
					this._videosCollection = new videosCollection();
					this.fetch();
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(videosList, {});
					this.$el.html(this._template);
					console.log('this._videosCollection.models');
					console.log(this._videosCollection.models);
					this.nestedView = new VideoView({collection: this._videosCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return Videos;

    }

);