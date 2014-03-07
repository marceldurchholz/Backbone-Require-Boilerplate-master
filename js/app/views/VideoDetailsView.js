// VideoDetailsView.js
// -------
define(["jquery", "backbone", "collections/videosCollection", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, videosCollection, videosDetailsViewHTML, sidemenusList, SidemenuView){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				bindEvents: function() {
					_thisViewVideoDetails = this;
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

				downloadVideo: function(videoid) {
					var _thisViewVideoDetails = this;
					showModal();
					if (isMobile.any()) var ft = new FileTransfer();
					if (isMobile.any()) window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
						var downloadPath = fs.root.fullPath + "/"+videoid+".mp4";
						uri = $('#video_player_1_html5_api').attr("src");
						ft.onprogress = function(progressEvent) {
							$('#modaltxt').html(progressEvent.loaded+" / "+progressEvent.total);
						};
						ft.download(uri, downloadPath, function(entry) {
							$("#video_player_1_html5_api").attr("src", downloadPath); // .get(0)
							_thisViewVideoDetails.rememberVideoLocation(videoid,downloadPath);
							$('#downloadvideobutton').hide();
							hideModal();
						}, 
						function(error) {
							console.log(error);
							$('#downloadvideobutton').hide();
							hideModal();
						});
					});
					else {
						$('#downloadvideobutton').hide();
						hideModal();
					}
				},
				rememberVideoLocation: function(videoid,downloadPath) {
					_thisViewVideoDetails = this;
					this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
					this.db.transaction(
						function(tx) {
							tx.executeSql("INSERT INTO videos (videoid,videourl) VALUES ('"+videoid+"','"+downloadPath+"')");
						},
						function() {
							// console.log('ERROR ON entry saving in TABLE videos: '+query);
						},
						function() {
							// console.log('Entry successfully saved in TABLE videos: '+query);
						}
					);
				},
				
				initializeCollection:function(options) {
					_thisViewVideoDetails = this;
					dpd.users.me(function(user) {
						if (user) { }
						else system.redirectToUrl('#login');
					});
					this._videosCollection = new videosCollection([], options);
				},
				fetch: function(options) {
					var _thisViewVideoDetails = this;
					_thisViewVideoDetails.getVideo(options);
				},
				getVideo: function(options) {
					var _thisViewVideoDetails = this;
					var _options = options;
					_thisViewVideoDetails.initializeCollection(options);
					_thisViewVideoDetails._videosCollection.fetch({
						error: function(action, coll) {
							_thisViewVideoDetails.render();
						},
						success: function(coll, jsoncoll) {
							_thisViewVideoDetails.render();
						}
					});
				},
				buyVideo: function(videoid) {
					_thisViewVideoDetails = this;
					var CreditsAfterPurchase = parseFloat(this._videosCollection.user.credits) - parseFloat(this._videosCollection.models[0].attributes.price);
					if (CreditsAfterPurchase<0) {
						doConfirm('Sie haben nicht genügend APPinaut® Coins.', 'Schade...', function (event) { 
							if (event=="1") {
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
					_thisViewVideoDetails = this;
					_thisViewVideoDetails.$el.hide();
					showModal();
					this.fetch(options);
				},

				collectRelatedData: function(topic) {
					var streamData = new Array();
					_thisViewVideoDetails = this;
					_thisViewVideoDetails.streamData = streamData;
					var querystr = "";
					if (topic!='') querystr += "&topic="+topic;
					var url = "http://dominik-lohmann.de:5000/videos?active=true&deleted=false";
					$.ajax({
						url: url+querystr,
						async: false
					}).done(function(videoData) {
						var nameArray = new Array;
						_.each(videoData, function(value, index, list) {
							value.ccat = 'video';
							value.icon = 'images/icon-videos-60.png';
							value.href = '#videos/details/view/'+value.id;
							var uploader = value.uploader;
							_thisViewVideoDetails.streamData.push(value);
						});
					});
					// Sort multidimensional arrays with oobjects by value 
					// http://www.javascriptkit.com/javatutors/arraysort2.shtml
					_thisViewVideoDetails.streamData.sort(function(a, b){
						return b.cdate-a.cdate
					});
					return(_thisViewVideoDetails.streamData);
				},
				
				insertVariables: function(model) {
					_thisViewVideoDetails = this;
					var uploader = model.get('uploader');
					if (uploader==window.me.id) {
						_thisViewVideoDetails.uploaderdata = window.me;
					}
					else {
						$.ajax({
							url: "http://dominik-lohmann.de:5000/users/?id="+uploader,
							async: false
						}).done(function(uploaderdata) {
							_thisViewVideoDetails.uploaderdata = uploaderdata;
						});
					}
					
					var pricetext = '';
					if (model.get('price')==0) pricetext = 'Video kostenlos laden';
					else pricetext = 'Video für '+model.get('price')+' Coins kaufen';
					var provider = '';
					provider = $.inArray( 'provider', window.me.roles );
					var seeker = '';
					seeker = $.inArray( 'seeker', window.me.roles );
					_template = _.template(videosDetailsViewHTML, {
						id: model.get('id'),
						uploaderdata: _thisViewVideoDetails.uploaderdata,
						uploader: _thisViewVideoDetails.uploaderdata.fullname,
						uploaderid: model.get('uploader'),
						me_credits: this._videosCollection.user.credits,
						videourl: model.get('videourl'),
						offlineurl: model.get('offlineurl'),
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
				getOfflineUrl: function() {
					_thisViewVideoDetails = this;
					window.dao.initialize();
					window.dao.findVideoById(_thisViewVideoDetails.options.id).done(function(result) {
						_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = "";
						if (result!=null && result!=undefined) {
							_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = result.videourl;
						}
						_thisViewVideoDetails.show();
					});
				},
				show: function() {
						_thisViewVideoDetails = this;
						$(_thisViewVideoDetails.el).html('');
						_.each(_thisViewVideoDetails._videosCollection.models, function(model) {
							_thisViewVideoDetails.id = model.get('id');
							_thisViewVideoDetails.videourl = model.get('id');
							_thisViewVideoDetails.insertVariables(model);
						});
						if (_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl!='' && _thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl!=undefined) {
							_thisViewVideoDetails._videosCollection.models[0].attributes.videourl = _thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl;
						}
						
						if( $.inArray( _thisViewVideoDetails._videosCollection.models[0].attributes.id , window.me.purchases ) >- 1 ) {
							_thisViewVideoDetails._videosCollection.models[0].attributes.videourl,showVideoLength = 0;
						} else {
							_thisViewVideoDetails._videosCollection.models[0].attributes.videourl,showVideoLength = 60;
						}

						window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',_thisViewVideoDetails._videosCollection.models[0].attributes.videourl,showVideoLength);
						_thisViewVideoDetails.$el.trigger('create');
						new FastClick(document.body);
						
						_thisViewVideoDetails.title_shorten = _thisViewVideoDetails._videosCollection.models[0].attributes.title;
						if (_thisViewVideoDetails.title_shorten.length>25) _thisViewVideoDetails.title_shorten = _thisViewVideoDetails.title_shorten.substr(0,25)+'...';
						
						// _thisViewVideoDetails.$el.show();
						
						_thisViewVideoDetails.$el.fadeIn( 500, function() {
							$('.ui-content').scrollTop(0);
							new FastClick(document.body);
							fontResize();
							$('.readmore').expander({
								slicePoint: 100,
								preserveWords: true,
								expandPrefix: '...',
								expandEffect: 'fadeIn',
								expandSpeed: 500,
								collapseEffect: 'fadeOut',
								collapseSpeed: 400,
								expandText: ' Weiterlesen...',
								userCollapseText: '',
								userCollapse: false
							});
							$('.readmoretitle').expander({
								slicePoint: 0,
								preserveWords: false,
								expandPrefix: '',
								expandEffect: 'fadeIn',
								expandSpeed: 500,
								collapseEffect: 'fadeOut',
								collapseSpeed: 400,
								expandText: _thisViewVideoDetails.title_shorten,
								userCollapseText: '',
								userCollapse: false
							});
						});
						
				},
				render: function() {
					_thisViewVideoDetails = this;
					_thisViewVideoDetails.getOfflineUrl();					
					$(window).resize(function() {
						window.resizeElement('#video_player_1')
					});
					// console.log('DOING render VideoDetailsView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					hideModal();
					_thisViewVideoDetails.bindEvents();
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);