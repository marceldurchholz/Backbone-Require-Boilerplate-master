// VideoDetailsView.js
// -------
define(["jquery", "backbone", "collections/videosCollection", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, videosCollection, videosDetailsViewHTML, sidemenusList, SidemenuView){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				bindEvents: function() {
					_thisViewVideoDetails = this;
					// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewVideoDetails.createVideo();});

					this.$el.off('click','#connectToLink').on('click','#connectToLink',function(e) { 
						e.preventDefault();
						// var videoid = $(this).attr('data-videoid');
						// _thisViewVideoDetails.buyVideo(videoid); 
						// alert($(this).attr('data-id'));
						var connectionid = $(this).attr('data-id');
						showModal();
						dpd.users.put(connectionid, 
							{"followers": {$push:$.trim(window.me.id)}}, function(result, err) {
							if(err) {
								return console.log(err);
								hideModal();
							}
							// console.log(result, result.id);
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
					// var fileSystem;
					// console.log('starting downloadVideo a');
					// var uri = '';
					// $("#video_player_1_html5_api").attr("src", "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4").get(0).play();
					// hideModal();
					// return(false);
					// console.log('starting downloadVideo b');
					if (isMobile.any()) var ft = new FileTransfer();
					if (isMobile.any()) window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
						// console.log('starting downloadVideo c');
						var downloadPath = fs.root.fullPath + "/"+videoid+".mp4";
						// console.log(downloadPath);
						uri = $('#video_player_1_html5_api').attr("src");
						// alert('uri: ' + uri);
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
							// console.log(entry);
							// var media = new Media(entry.fullPath, null, function(e) { alert(JSON.stringify(e));});
							// media.play();
							// _thisViewVideoDetails.downloadVideoToggle();
							// console.log(downloadPath);
							// doAlert(downloadPath,'Information');
							// $('#camera_file').val(downloadPath);
							// $("#video_player").attr("src", "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4").get(0).play();
							// doAlert(downloadPath);
							// $("#video_player_1_html5_api").attr("src", uri).get(0).play();
							$("#video_player_1_html5_api").attr("src", downloadPath); // .get(0)
							_thisViewVideoDetails.rememberVideoLocation(videoid,downloadPath);
							// window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',uri,0);
							$('#downloadvideobutton').hide();
							hideModal();
						}, 
						function(error) {
							console.log(error);
							$('#downloadvideobutton').hide();
							// doAlert('Da ist etwas schiefgegangen. Die Datei konnte nicht vollständig heruntergeladen werden. Bitte probieren Sie es erneut oder wenden Sie sich an unseren Support. Vielen Dank.','Ups!');						
							// $('#downloadvideobutton').hide();
							hideModal();
						});
					});
					else {
						// doAlert('not mobile action','debug info');
						// _thisViewVideoDetails.rememberVideoLocation(videoid,"file://notmobile/test/path/to/file.mp4");
						$('#downloadvideobutton').hide();
						hideModal();
					}
				},
				rememberVideoLocation: function(videoid,downloadPath) {
					_thisViewVideoDetails = this;
					// doAlert('remenbering location of: '+videoid);
					// doAlert(downloadPath);
					this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
					this.db.transaction(
						function(tx) {
							// sample data 
							// alert('saving into table videos START');
							var query = "INSERT INTO videos (videoid,videourl) VALUES ('"+videoid+"','"+downloadPath+"')"; 
							// alert(query);
							tx.executeSql(query);
							// alert('saving into table videos ENDE');
						},
						function() {
							console.log('ERROR ON entry saving in TABLE videos: '+query);
						},
						function() {
							// alert(query);
							console.log('Entry successfully saved in TABLE videos: '+query);
							// alert('Table videos successfully FILLED WITH SAMPLES in local SQLite database');
							// callback();
						}
					);
				},
				
				initializeCollection:function(options) {
					_thisViewVideoDetails = this;
					dpd.users.me(function(user) {
						if (user) {
							// this._videosCollection.user = user;
							_thisViewVideoDetails.$el.hide();
						}
						else system.redirectToUrl('#login');
					});
					this._videosCollection = new videosCollection([], options);
				},
				fetch: function(options) {
					var _thisViewVideoDetails = this;
					showModal();
					console.log(options.id);
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

					// _thisViewVideoDetails.offlineurl = "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4";
					/*
					else {
						_thisViewVideoDetails.offlineurl = "/var/myurl/nsdfsnk.mp4";
					}
					alert(_thisViewVideoDetails.offlineurl);
					*/
					
					// return(false);
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
							// _thisKnowledgeData.streamData.push(value);
							
							var uploader = value.uploader; // "ed568841af69d94d";
							
							/*
							if (nameArray[uploader]==undefined) {
								$.ajax({
									// type: 'get',
									// timeout: 5000,
									url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
									async: false,
									success: function(data, textStatus, XMLHttpRequest){
										// console.log('Error: ' + textStatus);
										
										nameArray[_thisMessagesDetailsViewNested.messages[key4].sender] = userdata.fullname;
										// _thisKnowledgeData.streamData.push(value);
										
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
							}
							*/
							_thisKnowledgeData.streamData.push(value);
							// _thisMessagesDetailsViewNested.messages[key4].fullname = nameArray[uploader];
							

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
					// console.log(_thisKnowledgeData.streamData);
					return(_thisKnowledgeData.streamData);
					// _thisViewLearningStreamNested.render();
				},
				
				insertVariables: function(model) {
					_thisViewVideoDetails = this;
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
							// console.log(uploaderdata);
							_thisViewVideoDetails.uploaderdata = uploaderdata;
						});
					}
					
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
						console.log('done findVideoById');
						// alert(result);
						// alert(result.videourl);
						// console.log(result);
						_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = "";
						if (result!=null && result!=undefined) {
							_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = result.videourl;
						}
						_thisViewVideoDetails.show();
					});
					// _thisViewVideoDetails.show();
					/*
					_thisViewVideoDetails = this;
					_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = "";
					var $def = $.Deferred();
					if (isMobile.any()) {
						alert('doing mobile query');
						this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
						alert('db opened');
						this.db.transaction(
							function(tx) {
								alert('tx started');
								var sql = "SELECT videourl as videourl FROM videos WHERE videoid = '"+_thisViewVideoDetails.options.id+"' ";
								alert(sql);
								tx.executeSql(
									sql
									, function(tx, rs) {
										alert('sucess');
										alert(rs);
										alert(rs.videourl);
										_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = rs.videourl;
										_thisViewVideoDetails.show();
									}
									, function(tx, error) {
										alert('error');
										_thisViewVideoDetails.show();
									}
								);
								  setTimeout(function() {
									// alert("received url: " + url);
									// alert("received url");
									// success('a','b');
									// alert('not mobile');
									// alert(rs);
									// alert(rs.videourl);
									alert(rs.videourl);
									_thisViewVideoDetails.show();
								  }, 1000);

								alert('tx end');
							}
						);
					}
					else {
						  setTimeout(function() {
							// alert("received url: " + url);
							// alert("received url");
							// success('a','b');
							// _thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl = "file://";
							alert('not mobile');
							_thisViewVideoDetails.show();
						  }, 3000);
					}
					return $def.promise();
					*/
				},
				show: function() {
						console.log('doing show()');
						_thisViewVideoDetails = this;
						_thisViewVideoDetails.$el.show();
						var htmlContent = '';
						$(_thisViewVideoDetails.el).html(htmlContent);
						_.each(_thisViewVideoDetails._videosCollection.models, function(model) {
							_thisViewVideoDetails.id = model.get('id');
							_thisViewVideoDetails.videourl = model.get('id');
							_thisViewVideoDetails.insertVariables(model);
						});
						// console.log('bla');
						// console.log(_thisViewVideoDetails._videosCollection.models[0].attributes);
						// console.log(_thisViewVideoDetails._videosCollection.models[0].attributes);
						// console.log(_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl);
						console.log('_thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl: ' + _thisViewVideoDetails._videosCollection.models[0].attributes.offlineurl);
						console.log('_thisViewVideoDetails._videosCollection.models[0].attributes.videourl: ' + _thisViewVideoDetails._videosCollection.models[0].attributes.videourl);
						
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
						
						_thisViewVideoDetails.$el.fadeIn( 500, function() {
							$('.ui-content').scrollTop(0);
							new FastClick(document.body);
							fontResize();
							// alert($('.readmore').html());
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
					console.log('rendering');
					
					_thisViewVideoDetails.getOfflineUrl();
					
					$(window).resize(function() {
						window.resizeElement('#video_player_1')
					});
					console.log('DOING render VideoDetailsView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					
					hideModal();
					
					// alert(_thisViewVideoDetails.videourl);
					// alert(this._videosCollection.models[0].attributes.videourl);
					
					/*
					_thisViewVideoDetails.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
						fontResize();
						// alert($('.readmore').html());
						$('.readmore').expander({
							slicePoint: 100,
							preserveWords: true,
							expandPrefix: '...',
							expandEffect: 'fadeIn',
							expandSpeed: 250,
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
							expandSpeed: 250,
							collapseEffect: 'fadeOut',
							collapseSpeed: 200,
							expandText: _thisViewVideoDetails.title_shorten,
							userCollapseText: '',
							userCollapse: false
						});
					});
					*/
					_thisViewVideoDetails.bindEvents();
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);