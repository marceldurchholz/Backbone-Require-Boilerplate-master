// VideoDetailsView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "views/VideoView", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosCollection, VideoListViewItems, videosDetailsViewHTML, sidemenusList, SidemenuView){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				createVideo: function () {
					if (this._videosCollection.online==0) {
						// this._videosCollection._localStorage_users.create(new Video({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						// this._videosCollection._localStorage_users.create(new VideoModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/video-thumbnail.jpg"}));
					}
					return(false);
				},
				create: function(model) {
					_thisViewVideoDetails = this;
					$.ajax('http://dominik-lohmann.de:5000/videos', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						_thisViewVideoDetails.fetch();
					  }, 
					  error: function(xhr,b) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
				},
				bindEvents: function() {
					_thisViewVideoDetails = this;
					this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewVideoDetails.createVideo();});
				},
				initializeCollection:function(options) {
					// alert(this.id);
					// var myCollection = new Collection([ new Model({id: 'smith'}) ]);
					this._videosCollection = new videosCollection([], options);
					// this._videosCollection = new videosCollection();
				},
				fetch: function(options) {
					this.$el.hide();
					this.initializeCollection(options);
					// this._videosCollection = new videosCollection();
					var _thisViewVideoDetails = this;
					this._videosCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							console.log(coll);
							console.log(jsoncoll);
							_thisViewVideoDetails.render();
						}
					});
				},
				buyVideo: function(successUrl) {
					_thisViewVideoDetails = this;
					// alert('buying video '+this._videosCollection.models[0].attributes.id);
					// console.log(this._videosCollection.models[0].attributes.price);
					// alert(this._videosCollection.user.credits);
					var CreditsAfterPurchase = parseFloat(this._videosCollection.user.credits) - parseFloat(this._videosCollection.models[0].attributes.price);
					// alert(CreditsAfterPurchase);
					if (CreditsAfterPurchase<0) {
						doAlert('Sie haben nicht genügend Credits.','Schade...');
						return(false);
					}
					else {
						purchaseVideoConfirm(this._videosCollection.user,this._videosCollection.models[0].attributes);
					}
					/*
					dpd.users.login({username: username, password: password}, function(user, error) {
						if (error) {
							// doAlert('not logging in');
							// return(false);
							console.log(error.message);
						} else {
							// doAlert('logging in');
							console.log(user);
							if (user==null) { 
								doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Anmeldung!');
								return(false);
								// alert('user =  null');
							}
							else {
								system.redirectToUrl(targetUrl);
							}
						}
					});
					*/
				},
				initialize: function(options) {
					this.initializeCollection(options);
					this.$el.off('click','#loadvideobutton').on('click','#loadvideobutton',function() { _thisViewVideoDetails.buyVideo('#videos/details/view/d6c9268c49a139bf'); } );
					this.fetch(options);
				},
				insertVariables: function(model) {
					_thisViewVideoDetails = this;
					var uploader = model.get('uploader');
					console.log(this.id);
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users/?id="+uploader,
						async: false
					}).done(function(uploaderdata) {
						// $( this ).addClass( "done" );
						console.log(uploaderdata);
						_thisViewVideoDetails.uploaderdata = uploaderdata;
					});					
					// console.log('this._videosCollection.user.credits');
					// console.log(this._videosCollection.user.credits);
					// #cards/start/view/<%= video.id %>/1
					var loadlink = '#cards/start/view/'+model.get('id')+'/1';
					// if (model.get('price')==0) pricetext = 'Video kostenlos laden';
					// else pricetext = 'Video für '+model.get('price')+' Coins kaufen';
					
					_thisViewVideoDetails.me = new Object();
					var pricetext = '';
					if (model.get('price')==0) pricetext = 'Video kostenlos laden';
					else pricetext = 'Video für '+model.get('price')+' Coins kaufen';
					console.log(model.get('videourl'));
					_template = _.template(videosDetailsViewHTML, {
						id: model.get('id'),
						uploader: _thisViewVideoDetails.uploaderdata.fullname,
						// me_credits: _thisViewVideoDetails.me.credits,
						me_credits: this._videosCollection.user.credits,
						videourl: model.get('videourl'),
						title: model.get('title'),
						description: model.get('description'),
						loadlink: loadlink,
						price: model.get('price'),
						pricetext: pricetext,
						thumbnailurl: model.get('thumbnailurl')
					},{variable: 'video'});
					$(this.el).html(_template);
				},
				render: function() {
					_thisViewVideoDetails = this;
					console.log('rendering');
					$(window).resize(function() {
						window.resizeElement('#video_player_1')
					});
					console.log('DOING render VideoDetailsView.js called');
					// this.sidebar = _.template(sidebar, {});
					// $('#sidebar').html(sidebar);
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					var htmlContent = '';
					$(this.el).html(htmlContent);
					// console.log('this._videosCollection.models');
					// console.log(this._videosCollection.models[0].attributes.videourl);
					_.each(this._videosCollection.models, function(model) {
						this.id = model.get('id');
						this.videourl = model.get('id');
						_thisViewVideoDetails.insertVariables(model);
					});
					console.log('this._videosCollection.models[0].attributes.videourl');
					console.log(this._videosCollection.models[0].attributes.videourl);
					window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',this._videosCollection.models[0].attributes.videourl);
					this.$el.trigger('create');
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);