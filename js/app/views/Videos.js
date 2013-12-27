// Videos.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "models/VideoModel", "text!templates/videosList.html", "views/VideoView"],

    function($, Backbone, sidemenusList, SidemenuView, VideoModel, videosList, VideoView){
		
			var VideosVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisView = this;
					// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisView.createVideo();});
				},
				sync: function() {
				},
				fetch: function() {
					this.render();
				},
				initialize: function() {
					// this._videosCollection = new videosCollection();
					this.fetch();
				},
				createVideo: function () {
					/*
					if (this._videosCollection.online==0) {
						// this._videosCollection._localStorage_users.create(new Video({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						// var username = ''+Math.floor((Math.random()*10000)+1);
						// var password = ''+Math.floor((Math.random()*10000)+1);
						// this._videosCollection._localStorage_users.create(new VideoModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/video-thumbnail.jpg"}));
					}
					return(false);
					*/
				},
				create: function(model) {
					/*
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
					*/
				},
				render: function() {
					this.bindEvents();
					console.log('DOING render Videos.js called');
					
					/*
					$("#flexiblecontent").animate({
						marginLeft: "0px",
					}, 1000, function () {
						// menuStatus = false;
						// menuSwitched(false);
						// alert('getURLParameter(window.location.href): ' + getURLParameter(window.location.href));
						// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
						// $.mobile.changePage( "#aboutus" , { reverse: false, changeHash: false } );
					});
					*/
					_thisViewVideos = this;
					var ani = setTimeout ( function() {
						$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
						_thisViewVideos.nestedView = new SidemenuView().fetch();
						_thisViewVideos.$el.html(_.template(videosList, {}));
						_thisViewVideos.nestedView = new VideoView().fetch();
						_thisViewVideos.$el.trigger('create');
					}, 500 );

					return this;
					
				}
			});

        return VideosVar;

    }

);