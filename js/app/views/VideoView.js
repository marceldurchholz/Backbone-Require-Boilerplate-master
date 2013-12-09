// VideoView.js
// -------
define(["jquery", "backbone", "text!templates/videoView.html"],

    function($, Backbone, videoView){
		
		var VideoView = Backbone.View.extend({
			el: "#videosList",
			initialize: function() {
				//// console.log('initializing VideoView.js');
			},
			showDetails: function() {
				alert('showDetails: '+videoView.id);
			},
			bindEvents: function() {
				var _thisView = this;
				this.$el.off('click','.listRow').on('click','.listRow',function(){_thisView.showDetails();});
			},
			insertProfiles: function(model) {
				  videoView.id = '123';
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
				var _thisView = this;
				console.log('rendering in VideoView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					this.id = model.get('id');
					_thisView.insertProfiles(model);
				});
				return this;
				
			}
		});

        return VideoView;

    }

);