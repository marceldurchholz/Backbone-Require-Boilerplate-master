// VideoDetailsView.js
// -------
define(["jquery", "backbone", "text!templates/videoDetailsView.html"],

    function($, Backbone, videoDetailsViewTemplate){
		
		var VideoDetailsView = Backbone.View.extend({
			el: "#videosList",
			initialize: function() {
				//// console.log('initializing VideoDetailsView.js');
			},
			/*
			insertProfiles: function(model) {
				  htmlContent = _.template(videoDetailsViewTemplate, {
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
			*/
			render: function() {
				var _thisView = this;
				alert('rendering in VideoDetailsView.js');
				var htmlContent = '';
				/*
				_.each(this.collection, function(model) {
					_thisView.insertProfiles(model);
				});
				*/
				$(this.el).append('blafoopeng');
				return this;
			}
		});

        return VideoDetailsView;

    }

);