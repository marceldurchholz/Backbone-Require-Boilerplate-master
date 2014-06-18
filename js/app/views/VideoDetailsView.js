// VideoDetailsView.js
// -------
define(["jquery", "backbone", "collections/videosCollection", "text!templates/videoDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/usergroupsPopupPage.html", "text!templates/pricePopupPage.html"],

    function($, Backbone, videosCollection, videosDetailsViewHTML, sidemenusList, SidemenuView, usergroupsPopupPage, pricePopupPage){
		
			var VideoDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				bindEvents: function() {
					_thisViewVideoDetails = this;
					this.$el.off('click','#showOptionsBtn').on('click','#showOptionsBtn',function(e) { 
						e.preventDefault();
						$('#toggleDiv').fadeIn();
						$('#functionBar').hide();
						window.setTimeout(function() {
							$('#functionBar').show();
							$('#toggleDiv').fadeOut();
						}, 10000);
					});
					this.$el.off('click','#sendMessageBtn').on('click','#sendMessageBtn',function(e) { 
						e.preventDefault();
						window.location.href = "#messages/details/view/"+_thisViewVideoDetails.uploaderdata.id;
					});
					
					this.$el.off('click','#loadvideobutton').on('click','#loadvideobutton',function(e) { 
						var videoid = $(this).attr('data-videoid');
						dpd('users').get(window.system.uid, function(me, err) {
							if (me) {
								_thisViewVideoDetails.buyVideo(videoid);
							}
							else {
								doConfirm('Um diese Funktion zu nutzen, registrieren Sie sich bitte.', 'Video kaufen', function (event) { 
									if (event=="1") {
										window.location.href = '#noaccess';
									}
								}, ('Okay,Abbruch').split(","));
							}
						});						
					});
					
					this.$el.off('click','#complainvideolink').on('click','#complainvideolink',function(e) { 
						e.preventDefault();
						var videoid = $(this).attr('data-videoid');
						window.location.href = "mailto:support@appinaut.de?subject=Meldung%20eines%20Videos%20oder%20eines%20Verstosses%20-%20"+videoid+"&body=Bitte%20teilen%20Sie%20uns%20den%20Hintergrund%20Ihrer%20Meldung%20oder%20des%20Verstosses%20detailliert%20mit.";
					});
					this.$el.off('click','#reportvideolink').on('click','#reportvideolink',function(e) { 
						e.preventDefault();
						var videoid = $(this).attr('data-videoid');
						addVideoReport(me, videoid);
						// var tgt = event.target;
						$(this).remove();
						$('#toggleDiv').hide();
						$('#functionBar').show();
						// window.location.href = "mailto:support@appinaut.de?subject=Meldung%20eines%20Videos%20oder%20eines%20Verstosses%20-%20"+videoid+"&body=Bitte%20teilen%20Sie%20uns%20den%20Hintergrund%20Ihrer%20Meldung%20oder%20des%20Verstosses%20detailliert%20mit.";
					});
					this.$el.off('click','#detailsvideolink').on('click','#detailsvideolink',function(e) { 
						e.preventDefault();
						$('#videodetailsdiv').toggle();
						$('#detailsvideolink').toggle();
					});
					/*
					this.$el.off('click','#downloadvideobutton').on('click','#downloadvideobutton',function(e) { 
						e.preventDefault();
						var videoid = $(this).attr('data-videoid');
						_thisViewVideoDetails.downloadVideo(videoid); 
					});
					*/

					_thisViewVideoDetails.$el.off('click','#setusergroupbtn').on('click','#setusergroupbtn',function(e){
						e.preventDefault();
						var streamdata = new Object();
						var videoid = $(this).attr('data-videoid');						
						streamdata.videoid = _thisViewVideoDetails._videosCollection.models[0].attributes.id;

						var requestUrl = "http://s299455960.online.de:5000/usergroups/?deleted=false";
						if (window.me.master!=true) requestUrl = requestUrl+"&owner="+window.me.id;
						$.ajax({
							url: requestUrl,
							async: false
						}).done(function(allusergroups) {
							streamdata.allusergroups = allusergroups;
						});
						$.ajax({
							url: "http://s299455960.online.de:5000/videos/"+videoid,
							async: false
						}).done(function(video) {
							streamdata.dbtype = 'video';
							streamdata.objid = video.id;
							streamdata.activeusergroups = video.usergroups;
							if (video.usergroups==undefined) video.usergroups=new Array();
							_thisViewVideoDetails._videosCollection.models[0].attributes.usergroups = streamdata.activeusergroups;
							if (video.active==undefined) video.active=false;
							streamdata.objactive = video.active;
							_thisViewVideoDetails._videosCollection.models[0].attributes.active = streamdata.objactive;
							if (video.public==undefined) video.public=false;
							streamdata.objpublic = video.public;
							_thisViewVideoDetails._videosCollection.models[0].attributes.public = streamdata.objpublic;
						});
						var popupid = 'popupBasic';
						$('#pageoverlay').append('<div style="z-index:9999;b/ackground-color:#000;width:'+($(window).width()-60)+'px;min-width:200px !important;max-width:650px !important;" data-role="popup" data-dismissible="true" data-overlay-theme="a" class="ui-corner-all" data-theme="a" id="'+popupid+'"></div>');
						$('#'+popupid).html('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>');			
						$('#'+popupid).append('<div class="ui-corner-bottom ui-content" style="z-index:9999;b/ackground-color:#000;" id="popupcontent" data-role="content"></div>');
						$( "#"+popupid ).bind({
							popupafterclose: function(event, ui) { 
								$('#body').find('.ui-popup-container').each(function() {
									$(this).remove();
								});
								$('#pageoverlay').find('#popupBasic').each(function() {
									$(this).remove();
								});
								$('#videoboxinnerdiv').css({"visibility":"visible"});
							}
						});
						var popupcontent = _.template(usergroupsPopupPage, {
							data: streamdata
						},{variable:'streamdata'});
						$('#popupcontent').html(popupcontent);
						$('#videoboxinnerdiv').css({"visibility":"hidden"});
						var el = $( "#"+popupid );
						el.popup().trigger('create');
						el.popup( "open", {transition: 'fade'} );
					});
					
					$('#body').off('change','.usergroupcb').on('change','.usergroupcb',function(e) { 
						e.preventDefault();
						var id = $(this).attr('data-id');
						// alert(_thisViewVideoDetails._videosCollection.models[0].attributes.id);
						// return(false);
						var usergroupid = $(this).attr('data-usergroupid');
						if (e.currentTarget.checked==false) status = "";
						else status = "checked";
						// return(false);
						dpd('videos').get(id, function(video, err) {
							var exists = $.inArray( $.trim(usergroupid), video.usergroups )
							if (status=="checked" && exists==-1) dpd.videos.put(id, {"usergroups": {$push:$.trim(usergroupid)}} );
							else dpd.videos.put(id, {"usergroups": {$pull:$.trim(usergroupid)}} );
						});
						return(false);
					});
					
					_thisViewVideoDetails.$el.off('click','#changePriceBtn').on('click','#changePriceBtn',function(e){
						e.preventDefault();
						var streamdata = new Object();
						var id = $(this).attr('data-id');
						_thisViewVideoDetails._videosCollection.models[0].attributes.id = id;
						streamdata.id = _thisViewVideoDetails._videosCollection.models[0].attributes.id;
						
						$.ajax({
							url: "http://s299455960.online.de:5000/videos/"+id,
							async: false
						}).done(function(video) {
							streamdata.dbtype = 'video';
							streamdata.objid = video.id;
							streamdata.activeusergroups = video.usergroups;
							_thisViewVideoDetails._videosCollection.models[0].attributes.usergroups = streamdata.activeusergroups;
							streamdata.objactive = video.active;
							_thisViewVideoDetails._videosCollection.models[0].attributes.active = streamdata.objactive;
							streamdata.objpublic = video.public;
							_thisViewVideoDetails._videosCollection.models[0].attributes.public = streamdata.objpublic;
							streamdata.slider_price = video.price;
							_thisViewVideoDetails._videosCollection.models[0].attributes.price = streamdata.slider_price;		
							console.log(streamdata);
						});
						var popupid = 'popupBasic';
						$('#pageoverlay').append('<div style="z-index:9999;b/ackground-color:#000;width:'+($(window).width()-60)+'px;min-width:200px !important;max-width:650px !important;" data-role="popup" data-dismissible="true" data-overlay-theme="a" class="ui-corner-all" data-theme="a" id="'+popupid+'"></div>');
						$('#'+popupid).html('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>');			
						$('#'+popupid).append('<div class="ui-corner-bottom ui-content" style="z-index:9999;b/ackground-color:#000;" id="popupcontent" data-role="content"></div>');
						$( "#"+popupid ).bind({
							popupafterclose: function(event, ui) { 
								$('#body').find('.ui-popup-container').each(function() {
									$(this).remove();
								});
								$('#pageoverlay').find('#popupBasic').each(function() {
									$(this).remove();
								});
								$('#videoboxinnerdiv').css({"visibility":"visible"});
								_thisViewVideoDetails.fetch(_thisViewVideoDetails.options);
							}
						});
						var popupcontent = _.template(pricePopupPage, {
							data: streamdata
						},{variable:'streamdata'});
						$('#popupcontent').html(popupcontent);
						$('#videoboxinnerdiv').css({"visibility":"hidden"});
						var el = $( "#"+popupid );
						el.popup().trigger('create');
						$("#sliderprice").val(streamdata.slider_price).slider("refresh");
						$("#sliderprice").focus();
						$("#sliderprice").blur();
						el.popup( "open", {transition: 'fade'} );
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
							doAlert('Da ist etwas schiefgegangen. Die Datei konnte nicht vollständig heruntergeladen werden. Bitte probieren Sie es erneut oder wenden Sie sich an unseren Support. Vielen Dank.','Ups!');						
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
							alert('ERROR ON entry saving in TABLE videos');
						},
						function() {
							// alert('Entry successfully saved in TABLE videos');
							// alert('Table videos successfully FILLED WITH SAMPLES in local SQLite database');
							// callback();
						}
					);
				},
				
				initializeCollection:function(options) {
					var _thisViewVideoDetails = this;
					_thisViewVideoDetails._videosCollection = new videosCollection([], options);
					// console.log(options);
					// console.log(this._videosCollection);
				},
				fetch: function(options) {
					var _thisViewVideoDetails = this;
					showModal();
					// console.log(options.id);
					_thisViewVideoDetails.getVideo(options);
				},
				getVideo: function(options) {
					var _thisViewVideoDetails = this;
					// _thisViewVideoDetails.offlineurl = "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4";
					_thisViewVideoDetails.offlineurl = "";
					if (isMobile.any()) {
						this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
						this.db.transaction (
							function(tx) {
								var sql = "SELECT videourl as videourl FROM videos WHERE videoid='"+options.id+"'";
								tx.executeSql(sql, 
									function() {
										alert('ERROR ON SELECT videourl');
									},
									function(tx, results) {
										var offlineurl = results.rows.item(0).videourl;
										_thisViewVideoDetails.offlineurl = offlineurl;
									}
								);
							}
						);
					}
					/*
					else {
						_thisViewVideoDetails.offlineurl = "/var/myurl/nsdfsnk.mp4";
					}
					alert(_thisViewVideoDetails.offlineurl);
					*/
					
					// return(false);
					_thisViewVideoDetails.initializeCollection(options);
					_thisViewVideoDetails._videosCollection.fetch({
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
					this.$el.hide();
					this.fetch(options);
				},

				collectRelatedData: function(topic) {
					var streamData = new Array();
					_thisKnowledgeData = this;
					_thisKnowledgeData.streamData = streamData;
					var querystr = "";
					// if (topic!='') querystr += "&topic="+topic;
					var url = "http://s299455960.online.de:5000/videos?active=true&deleted=false";
					if (window.system.master!=true) url = url+"&uploader="+window.system.aoid;
					var anzahl = 0;
					$.ajax({
						url: url,
						async: false
					}).done(function(videoData) {
						// console.log(videoData);
						// return(false);
						_.each(videoData, function(value, index, list) {
							
							var exists = 1;
							// exists = $.inArray( value.topic, _thisViewCards.me.interests );
							// if (_thisViewCards.me.interests == undefined) exists=1;
							// else if (_thisViewCards.me.interests.length==0) exists=1;

							if (value.usergroups == undefined) value.usergroups = new Array();
							if (window.me.usergroups == undefined) window.me.usergroups = new Array();
							if (value.usergroups.length>0) {
								var exists=-1;
								$.each( value.usergroups, function( key, role ) {
									$.each( window.me.usergroups, function( keyme, valueme ) {
										if (role==valueme) {
											exists=1;
											return(false);
										}
									});
								});
							}
							
							// console.log(value.title+''+exists);

							if (exists>-1 || value.uploader == me.id) {
									anzahl = anzahl + 1;
									value.ccat = 'video';
									value.icon = 'images/icon-multimedia-60.png';
									value.href = '#videos/details/view/'+value.id;
									var uploader = value.uploader;
									if ((window.system.master==true && value.public==true) || window.system.master==false) { 
										_thisKnowledgeData.streamData.push(value);
									}
							}
							if (anzahl > 4) return(false);
						});
					});
					var url = "http://s299455960.online.de:5000/cards?active=true&deleted=false";
					if (window.system.master!=true) url = url+"&uploader="+window.system.aoid;
					$.ajax({
						url: url,
						async: false
					}).done(function(cardData) {
						_.each(cardData, function(value, index, list) {
							
							var exists = 1;
							// exists = $.inArray( value.topic, _thisViewCards.me.interests );
							// if (_thisViewCards.me.interests == undefined) exists=1;
							// else if (_thisViewCards.me.interests.length==0) exists=1;

							if (value.usergroups == undefined) value.usergroups = new Array();
							if (window.me.usergroups == undefined) window.me.usergroups = new Array();
							if (value.usergroups.length>0) {
								var exists=-1;
								$.each( value.usergroups, function( key, role ) {
									$.each( window.me.usergroups, function( keyme, valueme ) {
										if (role==valueme) {
											exists=1;
											return(false);
										}
									});
								});
							}
							
							if (exists>-1 || value.uploader == me.id) {

								anzahl = anzahl + 1;
								value.ccat = 'card';
								value.icon = 'images/icon-cards-60.png';
								value.href = '#cards/details/view/'+value.id;
								if ((window.system.master==true && value.public==true) || window.system.master==false) { 
									_thisKnowledgeData.streamData.push(value);
								}
								
							}
							
							
							if (anzahl > 4) return(false);
						});
					});
					/*
					var url = "http://s299455960.online.de:5000/planer?active=true&deleted=false";
					$.ajax({
						url: url,
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
							url: "http://s299455960.online.de:5000/users/?id="+uploader,
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
					provider = $.inArray( 'provider', window.me.roles );
					var seeker = '';
					seeker = $.inArray( 'seeker', window.me.roles );
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
						offlineurl: model.get('offlineurl'),
						topic: model.get('topic'),
						title: model.get('title'),
						description: model.get('description'),
						price: model.get('price'),
						seeker: seeker,
						provider: provider,
						cdate: model.get('cdate'),
						vlength: model.get('vlength'),
						vsize: model.get('vsize'),
						purchases: this._videosCollection.user.purchases,
						pricetext: pricetext,
						ireported: $.inArray( me.id, model.get('reportedby')), // model.get('reportedby')
						thumbnailurl: model.get('thumbnailurl'),
						related: _thisViewVideoDetails.collectRelatedData(model.get('topic'))
					},{variable: 'video'});
					$(this.el).html(_template);
				},
				render: function() {
					_thisViewVideoDetails = this;
					// console.log('rendering');
					// console.log('DOING render VideoDetailsView.js called');
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewVideoDetails.nestedView = new SidemenuView().fetch();
					
					dpd('users').get(window.system.uid, function(me, err) {
						if (me) {
							window.me = me;
						}
						else {
						}
					});
					
					// video.uploaderdata.id
					// console.log(this._videosCollection);
					if ( 
						($.inArray( this._videosCollection.models[0].attributes.id , window.me.purchases ) >- 1) 
						|| (Math.round(this._videosCollection.models[0].attributes.price)==0) 
						|| (this._videosCollection.models[0].attributes.uploader==window.me.id) 
					) {
						this._videosCollection.models[0].attributes.showVideoLength = 0;
					} else {
						this._videosCollection.models[0].attributes.showVideoLength = 60;
						// alert('not buyed');
					}
					// alert(this._videosCollection.models[0].attributes.showVideoLength);
					// _thisViewVideoDetails.offlineurl
					// alert(showVideoLength);
					/*
					if (_thisViewVideoDetails.offlineurl!='') {
						// alert(_thisViewVideoDetails.offlineurl);
						this._videosCollection.models[0].attributes.videourl = _thisViewVideoDetails.offlineurl;
						$('#downloadvideobutton').hide();
					}
					*/
					this._videosCollection.models[0].attributes.offlineurl = _thisViewVideoDetails.offlineurl;

					var htmlContent = '';
					$(this.el).html(htmlContent);
					_.each(this._videosCollection.models, function(model) {
						this.id = model.get('id');
						this.videourl = model.get('videourl');
						_thisViewVideoDetails.insertVariables(model);
					});
					// console.log('this._videosCollection.models[0].attributes.videourl');
					// console.log(this._videosCollection.models[0].attributes.videourl);
					// alert(showVideoLength);
					// console.log(window.me.purchases);
					// console.log(this._videosCollection.models[0].attributes.id);
					// alert($.inArray( this._videosCollection.models[0].attributes.id , window.me.purchases ));
					
					// var isyoutube = false;
					var youtubeid = "";
					
					// var youtubeurl = "http://www.youtube-nocookie.com/embed/FTcmgUKjOEc?modestbranding=1&showsearch=0&showinfo=0&theme=light&iv_load_policy=3&enablejsapi=1&loop=0&autoplay=0&controls=0&rel=0";
					// var youtubeurl = "http://www.youtube.com/watch?v=FTcmgUKjOEc";
					// this._videosCollection.models[0].attributes.videourl = youtubeurl;
					
					var youtubeEmbedObject = new Object();
					
					// youtubeEmbedObject = checkYoutubeUrl(this._videosCollection.models[0].attributes.videourl);
					// console.log(youtubeEmbedObject);
					var ytcheck = new Object();
					ytcheck = checkYoutubeUrl(this._videosCollection.models[0].attributes.videourl);
					// console.log(ytcheck);
					// var isyoutube = this._videosCollection.models[0].attributes.videourl).isyoutube;
					if (ytcheck.isyoutube == true) {
						// alert('isyoutubeurl');
						$('#videobox').hide();
						$('#youtubebox').show();
						this._videosCollection.models[0].attributes.videourl = "http://www.youtube.com/embed/"+ytcheck.youtubeid+"?modestbranding=1&showsearch=0&showinfo=0&theme=light&iv_load_policy=3&enablejsapi=1&loop=0&autoplay=0&controls=0&rel=0";
						$('#youtube_player_1').attr("src", this._videosCollection.models[0].attributes.videourl);
						// isyoutube = true;
						// console.log(youtubeEmbedObject.v);
						// youtubeid = ytcheck.youtubeid;					
					}
					else {
						$('#videobox').show();
						$('#youtubebox').hide();
						if (this._videosCollection.models[0].attributes.offlineurl!='') this._videosCollection.models[0].attributes.videourl = this._videosCollection.models[0].attributes.offlineurl;
						window.createVideoPreview(_thisViewVideoDetails.$('#video_player_1'),'video_player_1',this._videosCollection.models[0].attributes.videourl,this._videosCollection.models[0].attributes.showVideoLength);
						$('video_player_1_html5_api').css("z-index","2147483647");
						// alert(_thisViewVideoDetails.videourl);
						// alert(this._videosCollection.models[0].attributes.videourl);
					}
					
					this.$el.trigger('create');
					new FastClick(document.body);
					
					var slicePoint = Math.round($(window).width()/10-14);
					// alert(slicePoint);
					_thisViewVideoDetails.title_shorten = this._videosCollection.models[0].attributes.title;
					if (_thisViewVideoDetails.title_shorten.length>slicePoint) _thisViewVideoDetails.title_shorten = _thisViewVideoDetails.title_shorten.substr(0,slicePoint)+'...';

					_thisViewVideoDetails.fullname_shorten = _thisViewVideoDetails.uploaderdata.fullname;
					if (_thisViewVideoDetails.fullname_shorten.length>slicePoint) _thisViewVideoDetails.fullname_shorten = _thisViewVideoDetails.fullname_shorten.substr(0,slicePoint*2)+'...';
					
					window.resizeWideScreen('#video_player_1');
					window.resizeWideScreen('#youtube_player_1');
					window.resizeWideScreen('#youtubebox');
					window.resizeWideScreen('#videobox');
					$(window).resize(function() {
						window.resizeWideScreen('#video_player_1');
						window.resizeWideScreen('#youtube_player_1');
						window.resizeWideScreen('#youtubebox');
						window.resizeWideScreen('#videobox');
					});

					fontResize();
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
						$('.readmore').expander({
							slicePoint: slicePoint*10,
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
						$('.readmorename').expander({
							slicePoint: 0,
							preserveWords: false,
							expandPrefix: '',
							expandEffect: 'fadeIn',
							expandSpeed: 500,
							collapseEffect: 'fadeOut',
							collapseSpeed: 200,
							expandText: _thisViewVideoDetails.fullname_shorten,
							userCollapseText: '',
							userCollapse: false
						});
					hideModal();
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						// alert($('.readmore').html());
						new FastClick(document.body);
					});
					_thisViewVideoDetails.bindEvents();
					return this;
				}

			});

        return VideoDetailsViewVar;

    }

);