// VideoRecordNestedView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/VideoRecordNestedPage.html", "text!templates/VideoRecordNestedPageTwo.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosCollection, VideoRecordNestedPage, VideoRecordNestedPageTwo, sidemenusList, SidemenuView){
		
		var VideoRecordNestedViewVar = Backbone.View.extend({
			
			el: "#VideoRecordNestedViewDiv",
			initialize: function() {
				console.log('initializing VideoRecordNestedView.js');
				this.activePage = VideoRecordNestedPage;
			},
			initializeme: function() {
				console.log('initializing ME in VideoRecordNestedView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					_thisViewRecordVideoNested.me = status;
					_thisViewRecordVideoNested.render();
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
					if ( _thisViewRecordVideoNested.dfd.state() === "pending" ) {
						_thisViewRecordVideoNested.dfd.notify( "working... " );
						setTimeout( _thisViewRecordVideoNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewRecordVideoNested = this;
				console.log('fetchMe VideoRecordNestedView.js');
				_thisViewRecordVideoNested.dfd = new jQuery.Deferred();
				_thisViewRecordVideoNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewRecordVideoNested.dfd.resolve(user);
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
				_thisViewRecordVideoNested = this;
				console.log('fetching VideoRecordNestedView.js');
				this.$el.hide();
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						console.log(_thisViewRecordVideoNested);
						// _thisViewRecordVideoNested.render();
						_thisViewRecordVideoNested.initializeme();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _videosCollection');
						console.log(action);
						console.log(coll);
						// _thisViewRecordVideoNested.render();
					}
				});
			},
			savePageOne: function(event) {
				var _thisViewRecordVideoNested = this;
				// this triggers a RESTFul POST (or PUT) request to the URL specified in the model
				event.preventDefault();
				// console.log('bla');
				_thisViewRecordVideoNested.formValues = new Object;
				_.each(this.$('form').serializeArray(), function(input){
					_thisViewRecordVideoNested.formValues[ input.name ] = input.value;
				})
				console.log(_thisViewRecordVideoNested.formValues);
				this.activePage = VideoRecordNestedPageTwo;
				this.render();
			},
			bindEvents: function() {
				var _thisViewRecordVideoNested = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewRecordVideoNested.clicked(e);});
				this.$el.off('click','#submitbutton').on('click','#submitbutton',function(event){
					event.preventDefault();
					// alert('submitbutton');
					_thisViewRecordVideoNested.savePageOne(event);
					// $('#submitform').submit();
				});
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
					dpd.users.get({id:_thisViewRecordVideoNested.me.id,following:_videoid}, function(result, error) {
						if (result) {
							console.log(result);
							}
						else {
							// console.log(error);
							dpd.users.put(_thisViewRecordVideoNested.me.id, {following:{$push:_videoid}}, function(result, error) {
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
			/*
			insertData: function(model) {
				_thisViewRecordVideoNested = this;
				console.log(jQuery.inArray(model.id, _thisViewRecordVideoNested.me.following));
				if (jQuery.inArray(model.id, _thisViewRecordVideoNested.me.following)==-1) {
					model.set("favclass","addVideoToFavourites");
				}
				else {
					model.set("favclass","isVideoToFavourites");
				}
				console.log(model);
				htmlContent = _.template(VideoRecordNestedPage, {
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
			*/
			render: function() {
				this.bindEvents();
				var _thisViewRecordVideoNested = this;
				console.log('DOING render VideoRecordNestedView.js called');
				// var htmlContent = 'STATIC TEST CONTENT';
				// $(this.el).html(htmlContent);
				/*
				var htmlContent = '';
				$(this.el).html(htmlContent);
				_.each(this._videosCollection.models, function(model) {
					this.id = model.get('id');
					_thisViewRecordVideoNested.insertData(model);
				});
				*/
				// VideoRecordNestedPage
				_thisViewRecordVideoNested.$el.html(_.template(_thisViewRecordVideoNested.activePage, {}));
				// console.log(_thisViewRecordVideoNested.formValues);
				// _.each(_thisViewRecordVideoNested.formValues, function(input){
				var p = _thisViewRecordVideoNested.formValues;
				for (var key in p) {
					if (p.hasOwnProperty(key)) {
						 // _thisViewRecordVideoNested.formValues[ input.name ] = input.value;
						// console.log(input);
						// console.log(input.name);
						// console.log(input.value);
						// alert(key + " -> " + _thisViewRecordVideoNested.formValues[key]);
						console.log(key+' = '+p[key]);
						$('#'+key).val(p[key]);
					}
				}
				this.$el.trigger('create');
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
					// $('#uploadstatusbar').html('bla');
				});
				return this;				
			}
		});

        return VideoRecordNestedViewVar;

    }

);