// VideoView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/videoView.html"],

    function($, Backbone, VideoModel, videosCollection, videoPage){
		
		var VideoViewVar = Backbone.View.extend({
			el: "#VideosNestedViewDiv",
			initialize: function() {
				console.log('initializing VideoView.js');
				// location.href( '#blafoopeng' );
				// this._videosCollection = new videosCollection();
				// this.fetch();
			},
			fetch: function() {	
				// alert('bla');
				_thisViewVideo = this;
				console.log('fetching VideoView.js');
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						console.log(_thisViewVideo);
						_thisViewVideo.render();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _videosCollection');
						console.log(action);
						console.log(coll);
						// _thisViewVideo.render();
					}
				});
			},
			bindEvents: function() {
				var _thisViewVideo = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewVideo.clicked(e);});
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					system.redirectToUrl(event.currentTarget.hash);
				});
				this.$el.off('click','.addVideoToFavourites').on('click','.addVideoToFavourites',function(event){
					event.preventDefault();
					system.redirectToUrl(event.currentTarget.hash);
				});
			},
			/*
			clicked: function(e){
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection.get(id);
				// var name = item.get("name");
				// alert(name);
				alert(id);
			},
			*/
			insertData: function(model) {
				htmlContent = _.template(videoPage, {
					id: model.get('id'),
					uploader: model.get('uploader'),
					videourl: model.get('videourl'),
					title: model.get('title'),
					description: model.get('description'),
					price: model.get('price'),
					thumbnailurl: model.get('thumbnailurl')
				},{variable: 'video'});
				$(this.el).append(htmlContent);
				this.bindEvents();
			},
			render: function() {
				var _thisViewVideo = this;
				console.log(this._videosCollection.models);
				var htmlContent = '';
				_.each(this._videosCollection.models, function(model) {
					this.id = model.get('id');
					_thisViewVideo.insertData(model);
				});
				_thisViewVideo.$el.trigger('create');
				return this;				
			}
		});

        return VideoViewVar;

    }

);