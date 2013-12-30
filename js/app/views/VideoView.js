// VideoView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/videoView.html"],

    function($, Backbone, VideoModel, videosCollection, videoPage){
		
		var VideoViewVar = Backbone.View.extend({
			
			el: "#VideosNestedViewDiv",
			initialize: function() {
				console.log('initializing VideoView.js');
				// this.initializeme();
			},
			initializeme: function() {
				console.log('initializing ME in VideoView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					// console.log(status);
					_thisViewVideo.me = status;
					// console.log(_thisViewVideo.me.following);
					_thisViewVideo.render();
				  },
				  function( status ) {
					// console.log( status + ", you fail this time" );
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
				// location.href( '#blafoopeng' );
				// this._videosCollection = new videosCollection();
				// this.fetch();
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewVideo.dfd.state() === "pending" ) {
						_thisViewVideo.dfd.notify( "working... " );
						setTimeout( _thisViewVideo.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewVideo = this;
				console.log('fetchMe VideoView.js');
				_thisViewVideo.dfd = new jQuery.Deferred();
				_thisViewVideo.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewVideo.dfd.resolve(user);
						}, 2000 );
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
				return this.dfd.promise();
			},
			fetch: function() {	
				// alert('bla');
				_thisViewVideo = this;
				console.log('fetching VideoView.js');
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						console.log(_thisViewVideo);
						// _thisViewVideo.render();
						_thisViewVideo.initializeme();
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
					window.location.href = event.currentTarget.hash;
					// system.redirectToUrl(event.currentTarget.hash);
				});
				this.$el.off('click','.isVideoToFavourites').on('click','.isVideoToFavourites',function(event){
					event.preventDefault();
					alert('isVideoToFavourites');
				});
				this.$el.off('click','.addVideoToFavourites').on('click','.addVideoToFavourites',function(event){
					event.preventDefault();
					console.log(event);
					// console.log(this);
					// var videoid = event.currentTarget.attributes['data-link'];
					
					// $(this).removeClass("addVideoToFavourites");
					// $(this).addClass("isVideoToFavourites");
					
					// attr( 'class','isVideoToFavourites');
					// alert($(this).attr('class'));
					// return(false);
					// var _this = this;
					// this.addClass('isVideoToFavourites').removeClass('addVideoToFavourites');
					
					
					$(this).removeClass("addVideoToFavourites");
					$(this).addClass("isVideoToFavourites");
					
					var videoid = $(event.currentTarget).attr('data-link');
					
					// console.log(videoid);
					// var bla = JSON.stringify(["1","5"]);
					// return(false);
					// console.log(dpd.users);

					var _videoid = videoid;
					console.log(_videoid);
					dpd.users.get({id:_thisViewVideo.me.id,following:_videoid}, function(result, error) {
						if (result) {
							console.log(result);
							}
						else {
							// console.log(error);
							dpd.users.put(_thisViewVideo.me.id, {following:{$push:_videoid}}, function(result, error) {
								if (result) {
									console.log(result);
									}
								else {
									// console.log(error);
								}
								// Do something
								// alert('done');
								// console.log(_event);
								// _thisViewVideo.fetch();
							});
						}
					});
					// console.log(_thisViewVideo.me.id);

					// console.log(event.currentTarget.attributes['data-link']);
					// window.location.href = event.currentTarget.hash;
					// system.redirectToUrl(event.currentTarget.hash);
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
				_thisViewVideo = this;
				// console.log(_thisViewVideo.me.following);
				// console.log(_thisViewVideo.me.following);
				console.log(jQuery.inArray(model.id, _thisViewVideo.me.following));
				if (jQuery.inArray(model.id, _thisViewVideo.me.following)==-1) {
					model.set("favclass","addVideoToFavourites");
				}
				else {
					model.set("favclass","isVideoToFavourites");
				}
				console.log(model);
				htmlContent = _.template(videoPage, {
					id: model.get('id'),
					uploader: model.get('uploader'),
					videourl: model.get('videourl'),
					title: model.get('title'),
					description: model.get('description'),
					price: model.get('price'),
					thumbnailurl: model.get('thumbnailurl'),
					favclass: model.get('favclass')
				},{variable: 'video'});
				$(this.el).append(htmlContent);
				this.bindEvents();
			},
			render: function() {
				var _thisViewVideo = this;
				// console.log(this._videosCollection.models);
				var htmlContent = '';
				$(this.el).html(htmlContent);
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