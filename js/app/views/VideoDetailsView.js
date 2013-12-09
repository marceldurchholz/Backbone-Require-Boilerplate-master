// VideoDetailsView.js
// -------
define(["jquery", "backbone", "text!templates/videoDetailsView.html"],

    function($, Backbone, videoDetailsView){
		
		var VideoDetailsView = Backbone.View.extend({
			el: "#videosList",
			initialize: function() {
				//// console.log('initializing VideoDetailsView.js');
			},
			insertProfiles: function(model) {
				  htmlContent = _.template(videoDetailsView, {
					id: model.get('id'),
					uploader: model.get('uploader'),
					videourl: model.get('videourl'),
					title: model.get('title'),
					description: model.get('description'),
					price: model.get('price'),
					thumbnailurl: model.get('thumbnailurl')
				},{variable: 'video'});
				$(this.el).append(htmlContent);
				},
			render: function() {
				var _thisView = this;
				console.log('rendering in VideoDetailsView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					_thisView.insertProfiles(model);
				});
				return this;
				
			}
		});

        return VideoDetailsView;

    }

);