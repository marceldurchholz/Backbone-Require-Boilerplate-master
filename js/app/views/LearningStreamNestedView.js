// LearningStreamNestedView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/LearningStreamNestedPage.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosCollection, LearningStreamNestedPage, sidemenusList, SidemenuView){
		
		var LearningStreamNestedViewVar = Backbone.View.extend({
			
			el: "#LearningStreamNestedViewDiv",
			initialize: function() {
				console.log('initializing LearningStreamNestedView.js');
			},
			initializeme: function() {
				console.log('initializing ME in LearningStreamNestedView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					_thisViewLearningStreamNested.me = status;
					_thisViewLearningStreamNested.render();
				  },
				  function( status ) {
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewLearningStreamNested.dfd.state() === "pending" ) {
						_thisViewLearningStreamNested.dfd.notify( "working... " );
						setTimeout( _thisViewLearningStreamNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewLearningStreamNested = this;
				console.log('fetchMe LearningStreamNestedView.js');
				_thisViewLearningStreamNested.dfd = new jQuery.Deferred();
				_thisViewLearningStreamNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewLearningStreamNested.dfd.resolve(user);
						}, 0 );
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
				_thisViewLearningStreamNested = this;
				console.log('fetching LearningStreamNestedView.js');
				this.$el.hide();
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						console.log(_thisViewLearningStreamNested);
						// _thisViewLearningStreamNested.render();
						_thisViewLearningStreamNested.initializeme();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _videosCollection');
						console.log(action);
						console.log(coll);
						// _thisViewLearningStreamNested.render();
					}
				});
			},
			bindEvents: function() {
				var _thisViewLearningStreamNested = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewLearningStreamNested.clicked(e);});
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
				this.$el.off('click','.isVideoToFavourites').on('click','.isVideoToFavourites',function(event){
					event.preventDefault();
					alert('isVideoToFavourites');
				});
				this.$el.off('click','.addVideoToFavourites').on('click','.addVideoToFavourites',function(event){
					event.preventDefault();
					console.log(event);
					$(this).removeClass("addVideoToFavourites");
					$(this).addClass("isVideoToFavourites");
					var videoid = $(event.currentTarget).attr('data-link');
					var _videoid = videoid;
					console.log(_videoid);
					dpd.users.get({id:_thisViewLearningStreamNested.me.id,following:_videoid}, function(result, error) {
						if (result) {
							console.log(result);
							}
						else {
							// console.log(error);
							dpd.users.put(_thisViewLearningStreamNested.me.id, {following:{$push:_videoid}}, function(result, error) {
								if (result) {
									console.log(result);
									}
								else {
									// console.log(error);
								}
							});
						}
					});
				});
			},
			insertData: function(model) {
				_thisViewLearningStreamNested = this;
				console.log(jQuery.inArray(model.id, _thisViewLearningStreamNested.me.following));
				if (jQuery.inArray(model.id, _thisViewLearningStreamNested.me.following)==-1) {
					model.set("favclass","addVideoToFavourites");
				}
				else {
					model.set("favclass","isVideoToFavourites");
				}
				console.log(model);
				htmlContent = _.template(LearningStreamNestedPage, {
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
			},
			fetchUpdate: function() {
				// var updateContent = "bla foo peng <br>";
				// $(this.el).append('bla');
				// alert('bla');
				this.$el.hide();
				this.render();
			},
			render: function() {
				this.bindEvents();
				var _thisViewLearningStreamNested = this;
				console.log('DOING render LearningStreamNestedView.js called');
				
				// var htmlContent = 'STATIC TEST CONTENT';
				// $(this.el).html(htmlContent);
				/*
				var htmlContent = '';
				$(this.el).html(htmlContent);
				_.each(this._videosCollection.models, function(model) {
					this.id = model.get('id');
					_thisViewLearningStreamNested.insertData(model);
				});
				*/
				_thisViewLearningStreamNested.$el.html(_.template(LearningStreamNestedPage, {}));
				this.$el.trigger('create');
				// _thisViewLearningStream.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 5000, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
					setTimeout(function() {
						_thisViewLearningStreamNested.fetchUpdate();
						// alert('bla');
					},2000)
					/*
					var LearningStreamUpdateInterval = setInterval(function(){
						// alert("Hello");
						// _thisViewLearningStreamNested.fetch();
					},2000);
					*/
				});
				return this;				
			}
		});

        return LearningStreamNestedViewVar;

    }

);