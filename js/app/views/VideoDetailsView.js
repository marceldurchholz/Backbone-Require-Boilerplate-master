// VideoDetailsView.js
// -------
define(["jquery", "backbone", "models/videoModel", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosDetailsViewHTML, sidemenusList, SidemenuView){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				bindEvents: function() {
					_thisViewVideoDetails = this;
					this.$el.off('click','#connectToLink').on('click','#connectToLink',function(e) { 
						e.preventDefault();
						alert($(this).attr('data-id'));
						var connectionid = $(this).attr('data-id');
						showModal();
						dpd.users.put(connectionid, 
							{"followers": {$push:$.trim(window.me.id)}}, function(result, err) {
							if(err) {
								return console.log(err);
								hideModal();
							}
							hideModal();
						});
					});

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
						// console.log('starting downloadVideo c');
						var downloadPath = fs.root.fullPath + "/"+videoid+".mp4";
						alert(downloadPath);
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
							doAlert('Da ist etwas schiefgegangen. Die Datei konnte nicht vollständig heruntergeladen werden. Bitte probieren Sie es erneut oder wenden Sie sich an unseren Support. Vielen Dank.','Ups!');						
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
							var query = "INSERT INTO videos (videoid,videourl) VALUES ('"+videoid+"','"+downloadPath+"')"; 
							tx.executeSql(query);
						},
						function() {
							alert('ERROR ON entry saving in TABLE videos');
						},
						function() {
						}
					);
				},
				fetch: function(options) {
					var _thisViewVideoDetails = this;
					showModal();
					_thisViewVideoDetails.getVideo(options);
				},
				getVideo: function(options) {
					var _thisViewVideoDetails = this;
					_thisViewVideoDetails.getCollection(_thisViewVideoDetails.options);
				},
				getOfflineUrl: function(options) {
					_thisViewVideoDetails = this;
					alert(options.id);
					_thisViewVideoDetails.offlineurl = "";
					_thisViewVideoDetails.videosArray[0].offlineurl = "";
					if (isMobile.any()) {
						this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
						this.db.transaction (
							function(tx) {
								var sql = "SELECT videourl as videourl FROM videos WHERE videoid='"+_thisViewVideoDetails.options.id+"'";
								alert(sql);
								tx.executeSql(sql, 
									function() {
										alert('ERROR ON SELECT videourl');
									},
									function(tx, results) {
										var offlineurl = results.rows.item(0).videourl;
										_thisViewVideoDetails.offlineurl = offlineurl;
										_thisViewVideoDetails.videosArray[0].offlineurl = _thisViewVideoDetails.offlineurl;
										alert('gotten _thisViewVideoDetails.offlineurl ' + _thisViewVideoDetails.offlineurl);
										_thisViewVideoDetails.render();
									}
								);
							}
						);
					}
					else {
						_thisViewVideoDetails.render();
					}
				},
				getCollection: function(options) {
					_thisViewVideoDetails = this;
					// var query = {  active: true, followers: {$in: [me.id]}, id:toid };
					var query = { id: options.id, active:true, deleted:false };
					dpd.videos.get(query, function (result,err) {
						if(err) {
							console.log('dpd videos get failure');
						}
						_thisViewVideoDetails.videosArray = new Array;
						_thisViewVideoDetails.videosArray.push(result);
						_thisViewVideoDetails.getOfflineUrl(_thisViewVideoDetails.options);
					});
				},
				buyVideo: function(videoid) {
					_thisViewVideoDetails = this;
					var CreditsAfterPurchase = parseFloat(window.me.credits) - parseFloat(_thisViewVideoDetails.videosArray[0].price);
					if (CreditsAfterPurchase<0) {
						doConfirm('Sie haben nicht genügend APPinaut® Coins.', 'Schade...', function (event) { 
							if (event=="1") window.location.href = '#myprofile';
						}, ('Preise anzeigen,Abbrechen').split(","));
						return(false);
					}
					else {
						purchaseVideoConfirm(window.me,_thisViewVideoDetails.videosArray[0]);
					}
				},
				initialize: function(options) {
					_thisKnowledgeData = this;
					this.fetch(options);
				},

				collectRelatedData: function(topic) {
					var streamData = new Array();
					_thisKnowledgeData = this;
					_thisKnowledgeData.streamData = streamData;
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
							var uploader = value.uploader; // "ed568841af69d94d";
							_thisKnowledgeData.streamData.push(value);
						});
					});
					// Sort multidimensional arrays with oobjects by value 
					// http://www.javascriptkit.com/javatutors/arraysort2.shtml
					_thisKnowledgeData.streamData.sort(function(a, b){
						return b.cdate-a.cdate
					});
					return(_thisKnowledgeData.streamData);
				},
				
				insertVariables: function(videoarray) {
					_thisViewVideoDetails = this;
					var model = new VideoModel(videoarray);
					var uploader = model.get('uploader');
					// console.log(this.id);
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
						me_credits: window.me.credits,
						videourl: model.get('videourl'),
						offlineurl: model.get('offlineurl'),
						topic: model.get('topic'),
						title: model.get('title'),
						description: model.get('description'),
						price: model.get('price'),
						seeker: seeker,
						provider: provider,
						purchases: window.me.purchases,
						pricetext: pricetext,
						thumbnailurl: model.get('thumbnailurl'),
						related: _thisViewVideoDetails.collectRelatedData(model.get('topic'))
					},{variable: 'video'});
					$(this.el).html(_template);
				},
				render: function() {
					_thisViewVideoDetails = this;
					$(window).resize(function() {
						window.resizeElement('#video_player_1')
					});
					console.log('DOING render VideoDetailsView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					
					if( $.inArray( _thisViewVideoDetails.videosArray[0].id , window.me.purchases ) >- 1 ) {
						_thisViewVideoDetails.videosArray[0].videourl,showVideoLength = 0;
					} else {
						_thisViewVideoDetails.videosArray[0].videourl,showVideoLength = 60;
					}
					
					alert(_thisViewVideoDetails.videosArray[0].offlineurl);
					_thisViewVideoDetails.videosArray[0].offlineurl = _thisViewVideoDetails.offlineurl;

					var htmlContent = '';
					$(this.el).html(htmlContent);
					
					_thisViewVideoDetails.insertVariables(_thisViewVideoDetails.videosArray[0]);
					
					if (_thisViewVideoDetails.videosArray[0].offlineurl!='') _thisViewVideoDetails.videosArray[0].videourl = _thisViewVideoDetails.videosArray[0].offlineurl;
					window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',_thisViewVideoDetails.videosArray[0].videourl,showVideoLength);

					hideModal();
					this.$el.trigger('create');
					new FastClick(document.body);
					
					var maxstrings = 0;
					maxstrings = Math.round($(window).width()/11)-3;
					
					_thisViewVideoDetails.title_shorten = _thisViewVideoDetails.videosArray[0].title;
					if (_thisViewVideoDetails.title_shorten.length>maxstrings) _thisViewVideoDetails.title_shorten = _thisViewVideoDetails.title_shorten.substr(0,maxstrings)+'...';
					
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
						fontResize();
						$('.readmore').expander({
							slicePoint: maxstrings*5,
							preserveWords: true,
							expandPrefix: '...',
							expandEffect: 'fadeIn',
							expandSpeed: 500,
							collapseEffect: 'fadeOut',
							collapseSpeed: 200,
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
							collapseSpeed: 200,
							expandText: _thisViewVideoDetails.title_shorten,
							userCollapseText: '',
							userCollapse: false
						});
					});
					_thisViewVideoDetails.bindEvents();
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);