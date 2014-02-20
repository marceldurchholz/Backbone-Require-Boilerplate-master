// VideoDetailsView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "views/VideoView", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosCollection, VideoListViewItems, videosDetailsViewHTML, sidemenusList, SidemenuView){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				/*
				createVideo: function () {
					if (this._videosCollection.online==0) {
						// this._videosCollection._localStorage_users.create(new Video({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						// this._videosCollection._localStorage_users.create(new VideoModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new VideoModel({"uploader": "042cb1572ffbea5d", "videourl": "http://xyz.de.com.uk", "title": "This is a video title", "description": "This is a description", "price": "35", "thumbnailurl": ""}));
					}
					return(false);
				},
				*/
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
					// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewVideoDetails.createVideo();});

					this.$el.off('click','#loadvideobutton').on('click','#loadvideobutton',function(e) { 
						e.preventDefault();
						var videoid = $(this).attr('data-videoid');
						_thisViewVideoDetails.buyVideo(videoid); 
					});
					
					this.$el.off('click','#downloadvideobutton').on('click','#downloadvideobutton',function(e) { 
						e.preventDefault();
						var videoid = $(this).attr('data-videoid');
						_thisViewVideoDetails.downloadVideo(videoid); 
					});

				},

				downloadVideo: function() {
					var _thisViewVideoDetails = this;
					showModal();
					// var fileSystem;
					// console.log('starting downloadVideo a');
					var ft = new FileTransfer();
					// console.log('starting downloadVideo b');
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
						// console.log('starting downloadVideo c');
						var downloadPath = fs.root.fullPath + "/download.mp4";
						// console.log(downloadPath);
						var uri = $('#video_player_1_html5_api').attr("src");
						alert('uri: ' + uri);
						// if (!isMobile.any()) uri = encodeURI("http://management-consulting.marcel-durchholz.de/secure/4444444444.mp4");
						// else uri =  $('#downloadVideoUrl').val();
						// console.log('starting downloadVideo d');
						// console.log(uri);
						// console.log(downloadPath);
						ft.onprogress = function(progressEvent) {
							// $('#uploadstatusbar').html(round((progressEvent.loaded/progressEvent.total)*100)+' %');
							// $('#uploadstatusbar').html(round((progressEvent.loaded/progressEvent.total)*10000)+' % (' + progressEvent.loaded + ' / ' + progressEvent.total + ')');
							// console.log(progressEvent.loaded + " / " + progressEvent.total);
							$('#modaltxt').html(progressEvent.loaded+" / "+progressEvent.total);
						};
						ft.download(uri, downloadPath, function(entry) {
							console.log(entry);
							// var media = new Media(entry.fullPath, null, function(e) { alert(JSON.stringify(e));});
							// media.play();
							_thisViewVideoDetails.downloadVideoToggle();
							// console.log(downloadPath);
							doAlert(downloadPath,'Information');
							// $('#camera_file').val(downloadPath);
							hideModal();
						}, 
						function(error) {
							console.log(error);
							doAlert('Da ist etwas schiefgegangen. Die Datei konnte nicht vollständig heruntergeladen werden. Bitte probieren Sie es erneut oder wenden Sie sich an unseren Support. Vielen Dank.','Ups!');						
							hideModal();
						});
						
					});
				},

				save1downloadVideo: function(videoid) {
					_thisViewVideoDetails = this;
					alert('bla');
					// _thisConfirmButtonLabels = ('Preise anzeigen,Abbrechen').split(",");
					/*
					var CreditsAfterPurchase = parseFloat(this._videosCollection.user.credits) - parseFloat(this._videosCollection.models[0].attributes.price);
					if (CreditsAfterPurchase<0) {
						// doAlert('Sie haben nicht genügend Credits.','Schade...');
						doConfirm('Sie haben nicht genügend APPinaut® Coins.', 'Schade...', function (event) { 
							if (event=="1") {
								// doAlert('1','ok');
								window.location.href = '#myprofile';
							}
						}, ('Preise anzeigen,Abbrechen').split(","));
						return(false);
					}
					else {
						purchaseVideoConfirm(this._videosCollection.user,this._videosCollection.models[0].attributes);
					}
					*/
				},
				
				initializeCollection:function(options) {
					dpd.users.me(function(user) {
						if (user) {
							// this._videosCollection.user = user;
						}
						else system.redirectToUrl('#login');
					});
					this._videosCollection = new videosCollection([], options);
				},
				fetch: function(options) {
					_thisKnowledgeData = this;
					var _thisViewVideoDetails = this;
					var streamData = new Array();
					_thisKnowledgeData.streamData = streamData;
					this.$el.hide();
					showModal();
					this.initializeCollection(options);
					this._videosCollection.fetch({
						error: function(action, coll) {
							// console.log(action);
							// console.log(coll);
						},
						success: function(coll, jsoncoll) {
							// console.log(coll);
							// console.log(jsoncoll);
							_thisViewVideoDetails.render();
						}
					});
				},
				buyVideo: function(videoid) {
					_thisViewVideoDetails = this;
					// _thisConfirmButtonLabels = ('Preise anzeigen,Abbrechen').split(",");
					var CreditsAfterPurchase = parseFloat(this._videosCollection.user.credits) - parseFloat(this._videosCollection.models[0].attributes.price);
					if (CreditsAfterPurchase<0) {
						// doAlert('Sie haben nicht genügend Credits.','Schade...');
						doConfirm('Sie haben nicht genügend APPinaut® Coins.', 'Schade...', function (event) { 
							if (event=="1") {
								// doAlert('1','ok');
								window.location.href = '#myprofile';
							}
						}, ('Preise anzeigen,Abbrechen').split(","));
						return(false);
					}
					else {
						purchaseVideoConfirm(this._videosCollection.user,this._videosCollection.models[0].attributes);
					}
				},
				initialize: function(options) {
					_thisKnowledgeData = this;
					this.fetch(options);
				},

				collectRelatedData: function(topic) {
					var _thisKnowledgeData = this;
					var querystr = "";
					if (topic!='') querystr += "&topic="+topic;
					var url = "http://dominik-lohmann.de:5000/videos?active=true&deleted=false";
					$.ajax({
						url: url+querystr,
						async: false
					}).done(function(videoData) {
						_.each(videoData, function(value, index, list) {
							value.ccat = 'video';
							value.icon = 'images/icon-videos-60.png';
							value.href = '#videos/details/view/'+value.id;
							// _thisKnowledgeData.streamData.push(value);
							
							var uploader = value.uploader; // "ed568841af69d94d";
							$.ajax({
								// type: 'get',
								// timeout: 5000,
								url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
								async: false,
								success: function(data, textStatus, XMLHttpRequest){
									// console.log('Error: ' + textStatus);
									_thisKnowledgeData.streamData.push(value);
									// console.log(data);
								},
								error:function (xhr, ajaxOptions, thrownError){
									// console.log('error');
									// console.log(index);
									// alert(xhr.status);
									// alert(xhr.statusText);
									// alert(xhr.responseText);
								}
							});

						});
					});
					/*
					var url = "http://dominik-lohmann.de:5000/cards?active=true&deleted=false";
					$.ajax({
						url: url+querystr,
						async: false
					}).done(function(cardData) {
						_.each(cardData, function(value, index, list) {
							value.ccat = 'card';
							value.icon = 'images/icon-cards-60.png';
							value.href = '#cards/details/view/'+value.id;
							_thisKnowledgeData.streamData.push(value);
						});
					});
					var url = "http://dominik-lohmann.de:5000/planer?active=true&deleted=false";
					$.ajax({
						url: url+querystr,
						async: false
					}).done(function(planData) {
						_.each(planData, function(value, index, list) {
							value.ccat = 'plan';
							value.icon = 'images/icon-planer-60.png';
							value.href = '#planer/details/view/'+value.id;
							_thisKnowledgeData.streamData.push(value);
						});
					});
					*/
					// Sort multidimensional arrays with oobjects by value 
					// http://www.javascriptkit.com/javatutors/arraysort2.shtml
					_thisKnowledgeData.streamData.sort(function(a, b){
						return b.cdate-a.cdate
					});
					console.log(_thisKnowledgeData.streamData);
					return(_thisKnowledgeData.streamData);
					// _thisViewLearningStreamNested.render();
				},
				
				insertVariables: function(model) {
					_thisViewVideoDetails = this;
					var uploader = model.get('uploader');
					console.log(this.id);
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users/?id="+uploader,
						async: false
					}).done(function(uploaderdata) {
						console.log(uploaderdata);
						_thisViewVideoDetails.uploaderdata = uploaderdata;
					});					
					
					var pricetext = '';
					if (model.get('price')==0) pricetext = 'Video kostenlos laden';
					else pricetext = 'Video für '+model.get('price')+' Coins kaufen';
					var provider = '';
					provider = jQuery.inArray( 'provider', window.me.roles );
					var seeker = '';
					seeker = jQuery.inArray( 'seeker', window.me.roles );
					// console.log('purchases');
					// console.log(model.get('purchases'));
					/*
					var _thumbnailurl = '';
					if () {
						_thumbnailurl = '';
					}
					*/
					_template = _.template(videosDetailsViewHTML, {
						id: model.get('id'),
						uploaderdata: _thisViewVideoDetails.uploaderdata,
						uploader: _thisViewVideoDetails.uploaderdata.fullname,
						me_credits: this._videosCollection.user.credits,
						videourl: model.get('videourl'),
						topic: model.get('topic'),
						title: model.get('title'),
						description: model.get('description'),
						price: model.get('price'),
						seeker: seeker,
						provider: provider,
						purchases: this._videosCollection.user.purchases,
						pricetext: pricetext,
						thumbnailurl: model.get('thumbnailurl'),
						related: _thisViewVideoDetails.collectRelatedData(model.get('topic'))
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
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					var htmlContent = '';
					$(this.el).html(htmlContent);
					_.each(this._videosCollection.models, function(model) {
						this.id = model.get('id');
						this.videourl = model.get('id');
						_thisViewVideoDetails.insertVariables(model);
					});
					// console.log('this._videosCollection.models[0].attributes.videourl');
					// console.log(this._videosCollection.models[0].attributes.videourl);
					var showVideoLength = 0;
					// alert(showVideoLength);
					if( _.indexOf(this._videosCollection.models[0].attributes.purchases, this._videosCollection.models[0].attributes.id)==-1 ) {
						showVideoLength = 60;
					} else {
						// alert('not buyed');
					}
					// alert(showVideoLength);
					window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',this._videosCollection.models[0].attributes.videourl,showVideoLength);
					hideModal();
					this.$el.trigger('create');
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					_thisViewVideoDetails.bindEvents();
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);