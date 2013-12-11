// Videos.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "views/VideoView", "text!templates/videosDetails.html", "views/videoDetailsView", "text!templates/sidebar.html"],

    function($, Backbone, VideoModel, videosCollection, Video, videos, videoDetailsView, sidebar){
		
			var Videos = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				initialize: function(options) {
					// console.log('models');
					// console.log(models);
					// console.log('options');
					// console.log(options);
					// this.initializeCollection(options);
					// this._videosCollection = new videosCollection();
					// this.fetch(options);
					this.render();
				},
				render: function() {
					// this.bindEvents();
					console.log('DOING render Videos.js called');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(videos, {});
					this.$el.html(this._template);
					// console.log('this._videosCollection.models');
					// console.log(this._videosCollection.models);
					// this.nestedView = new videoDetailsView({collection: this._videosCollection.models}).render();



					
					
					this.$el.trigger('create');
					return this;
				}

			});

        return Videos;

    }

);