// Videos.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/videosList.html", "views/VideoView"],

    function($, Backbone, sidemenusList, SidemenuView, videosList, VideoView){
		
		var VideosVar = Backbone.View.extend({
		
			el: "#page-content",
			attributes: {"data-role": 'content'},
			events: {
			},
			bindEvents: function() {
				var _thisViewVideos = this;
			},
			initialize: function() {
				this.fetch();
			},
			sync: function() {
			},
			fetch: function() {
				this.render();
			},
			render: function() {
				this.bindEvents();
				_thisViewVideos = this;
				console.log('DOING render Videos.js called');
				var ani = setTimeout ( function() {
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideos.nestedView = new SidemenuView().fetch();
					_thisViewVideos.$el.html(_.template(videosList, {}));
					_thisViewVideos.nestedView = new VideoView().fetch();
					_thisViewVideos.$el.trigger('create');
				}, 0 );
				return this;				
			}
		});

        return VideosVar;

    }

);