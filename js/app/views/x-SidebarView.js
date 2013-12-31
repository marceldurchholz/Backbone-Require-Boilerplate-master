// SidebarView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/videosList.html", "views/VideoView", "text!templates/sidebar.html"],

    function($, Backbone, VideoModel, videosCollection, videosList, VideoView, sidebarPage){
		
			var sidebarView = Backbone.View.extend({
			
				el: "#sidebarListViewDiv",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					// var _thisView = this;
					// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisView.createVideo();});
				},
				fetch: function() {
					this._videosCollection = new videosCollection(); 
					var _thisView = this; 
					this._videosCollection.fetch({ 
						error: function(action, coll) { 
							alert('ERROR: fetch _videosCollection'); 
							// _thisView.render(); 
							// console.log(action); 
							// console.log(coll); 
						}, 
						success: function(coll, jsoncoll) { 
							// _thisView.render(); 
							// _thisView.$el.trigger('create');
						} 
					});
				},
				initialize: function() {
					this._videosCollection = new videosCollection();
					this.fetch();
				},
				render: function() {
					// this.bindEvents();
					var _thisView = this;

					console.log('rendering in SidebarView.js');
					
					// this._sidebarPage = _.template(sidebarPage, {});
					// $('#sidebar').html(_.template(sidebarPage, {}));
					
					// this._template = _.template(videosList, {});
					// this.$el.html(this._template);
					
					var htmlContent = '';
					_.each(this.collection, function(model) {
						this.id = model.get('id');
						_thisView.insertProfiles(model);
					});
					
					/*
					console.log('this._videosCollection.models');
					console.log(this._videosCollection.models);
					this.nestedView = new VideoView({collection: this._videosCollection.models}).render();
					*/

					// this.$el.trigger('create');
					return this;
				}

			});

        return sidebarView;

    }

);