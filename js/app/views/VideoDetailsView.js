// VideoDetailsView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "views/VideoView", "text!templates/videoDetailsView.html", "text!templates/sidebar.html"],

    function($, Backbone, VideoModel, videosCollection, VideoListViewItems, videosDetailsViewHTML, sidebar){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
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
					_thisViewVideoDetails = this;
					$.ajax('http://dominik-lohmann.de:5000/videos', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						_thisViewVideoDetails.fetch();
					  }, 
					  error: function(xhr,b) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
				},
				bindEvents: function() {
					var _thisViewVideoDetails = this;
					this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewVideoDetails.createVideo();});
				},
				initializeCollection:function(options) {
					// alert(this.id);
					// var myCollection = new Collection([ new Model({id: 'smith'}) ]);
					this._videosCollection = new videosCollection([], options);
					// this._videosCollection = new videosCollection();
				},
				fetch: function(options) {
					this.initializeCollection(options);
					// this._videosCollection = new videosCollection();
					var _thisViewVideoDetails = this;
					this._videosCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							_thisViewVideoDetails.render();
						}
					});
				},
				initialize: function(options) {
					this.initializeCollection(options);
					this.fetch(options);
				},
				insertVariables: function(model) {
					_template = _.template(videosDetailsViewHTML, {
						id: model.get('id'),
						uploader: model.get('uploader'),
						videourl: model.get('videourl'),
						title: model.get('title'),
						description: model.get('description'),
						price: model.get('price'),
						thumbnailurl: model.get('thumbnailurl')
					},{variable: 'video'});
					$(this.el).html(_template);
				},
				render: function() {
					var _thisViewVideoDetails = this;
					console.log('rendering');
					$(window).resize(function() {
						window.resizeElement('#video_player_1')
					});
					console.log('DOING render VideoDetailsView.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
				var htmlContent = '';
				$(this.el).html(htmlContent);
				
					_.each(this._videosCollection.models, function(model) {
						// console.log(model);
						this.id = model.get('id');
						_thisViewVideoDetails.insertVariables(model);
					});
						window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'));
					this.$el.trigger('create');
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);