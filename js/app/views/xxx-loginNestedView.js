// VideoView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/videosList.html", "views/VideoView", "text!templates/videoView.html"],

    function($, Backbone, VideoModel, videosCollection, videosList, VideoView, videoView){
		
		var VideoView = Backbone.View.extend({
			el: "#videosList",
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
						console.log(action);
						console.log(coll);
						// _thisViewVideo.render();
					}
				});
			},
			showDetails: function(e) {
				// e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				// window.location.hash = '#videos/details/'+id;
				// Router.navigate( $(this).attr('href') );
				window.location.hash = '#videos/details/view/'+id;
				// alert('bla');
			},
			bindEvents: function() {
				var _thisViewVideo = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewVideo.clicked(e);});
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					// console.log(e);
					// alert('show detail');
					_thisViewVideo.showDetails(e);
				});
			},
			clicked: function(e){
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection.get(id);
				// var name = item.get("name");
				// alert(name);
				alert(id);
			},
			insertData: function(model) {
				htmlContent = _.template(videoView, {
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
				return this;
				
			}
		});

        return VideoView;

    }

);