// MessagesViewNested.js
// -------
define(["jquery", "backbone", "text!templates/MessagesViewNestedPage.html"],

    function($, Backbone, MessagesViewNestedPage){
		
		var MessageViewNestedVar = Backbone.View.extend({
			
			el: "#MessagesNestedViewDiv",
			initialize: function() {
				console.log('initializing MessagesViewNested.js');
			},
			/*
			initializeme: function() {
				console.log('initializing ME in MessagesViewNested.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					_thisMessagesViewNested.me = status;
					_thisMessagesViewNested.render();
				  },
				  function( status ) {
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			/*
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisMessagesViewNested.dfd.state() === "pending" ) {
						_thisMessagesViewNested.dfd.notify( "working... " );
						setTimeout( _thisMessagesViewNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisMessagesViewNested = this;
				console.log('fetchMe MessagesViewNested.js');
				_thisMessagesViewNested.dfd = new jQuery.Deferred();
				_thisMessagesViewNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisMessagesViewNested.dfd.resolve(user);
						}, 0 );
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
				return this.dfd.promise();
			},
			*/
			fetch: function() {	
				// alert('bla');
				_thisMessagesViewNested = this;
				console.log('fetching MessagesViewNested.js');
				this.$el.hide();
				showModal();
				dpd.users.me(function(me) {
					if (me) {
						/*
						var fetchMe = setTimeout ( function() {
							// _thisViewRecordVideoNested.dfd.resolve(user);
						}, 0 );
						*/
						console.log(me.id);
						// http://dominik-lohmann.de:5000/messages?{"$or":[{"sender":"009505631619d88e"},{"receiver":"009505631619d88e"}],$sort:{cdate:-1}}
						// var identArr = new Array;
						var query = {$or:[{"sender":me.id},{"receiver":me.id}],$sort:{cdate:-1}};
						dpd.messages.get(query, function (allmessagesdata) {
							// console.log(allmessagesdata);
							// _thisMessagesViewNested.messages = allmessagesdata;
							_thisMessagesViewNested.messages = new Array;
							// _thisMessagesViewNested.displaymessages = new Array;
							$.each( allmessagesdata, function( key, message ) {
								if (message.unread==undefined) message.unread=0;
								// console.log(displayedGroups;
								var identObj = new Object;
								// console.log(identArr[message.sender]);
								// console.log(message.sender, message.receiver, message.sender.group);
								// var inArray = _.contains([message.sender, message.receiver], message.sender.group); // jQuery.inArray( "John", arr ); // _.find([message.sender, message.receiver], function(num){ return num % 2 == 0; });
								// console.log(inArray);
								
								// console.log('message.readby' + message.readby);
								
								// var haveRead = false;
								// groupArr['haveRead'] = true;
								// var _key = key;
								$.ajax({
									// url: 'http://dominik-lohmann.de:5000/users?{"$or":[{"id":"'+message.sender+'"},{"id":"'+message.receiver+'"}]}',
									url: 'http://dominik-lohmann.de:5000/users?id='+message.sender,
									async: false
								}).done(function(userdata) {
									// message.fullname = userdata.fullname;
									message.fullname = userdata.fullname;
									
									// _thisMessagesViewNested.messages.push(message);
								});					



								if (message.sender==me.id) {
									message.unread = 0;
								}
								else if (jQuery.inArray(me.id, message.readby)<0) {
									// console.log(message.sender);
									// console.log('not read by ' + me.id);
									// alert('foo');
									message.unread += 1;
								}
								
								
								
								// message.push(displayedGroups);

								/*
								else {
									// console.log(message);
									// _thisMessagesViewNested.messages[key].sender = identObj;
								}
								*/
								_thisMessagesViewNested.messages.push(message);
							});
							
							
							var displayedGroups = new Array();
							$.each(_thisMessagesViewNested.messages,function(key4,message) {
								message.display = 1;
								var inArray = false;
								$.each( displayedGroups, function( key8, group ) {
									inArray = are_arrs_equal(group, [message.sender,message.receiver]);									
									if (inArray==true) return(false);
								});
								// console.log(inArray);
								if (inArray==true) {
									message.display=0;
								}
								
								var groupArr = new Array;
								groupArr.push(message.sender);
								groupArr.push(message.receiver);
								// displayedGroups.push(groupArr);
								displayedGroups.push(groupArr);
								// console.log(displayedGroups);
								_thisMessagesViewNested.messages[key4] = message;
							});
								
							
							$.each(_thisMessagesViewNested.messages,function(key4,message4) {
								// console.log(message4);
								
								
								var groupArr = new Array();
								
								

								// console.log(_thisMessagesViewNested.messages[key4].id);
								// console.log($.inArray(me.id, _thisMessagesViewNested.messages[key4].readby));
								
								
								if ($.inArray(me.id, _thisMessagesViewNested.messages[key4].readby)==-1) {
									
									// _thisMessagesViewNested.messages[key4].display = 1;
									
									
									
									// _thisMessagesViewNested.messages[key4].anzahl += 1;
									// console.log(_thisMessagesViewNested.messages[key4]);
									
									// finde jeden eintrag wo ich in den empfängern bin 
									// und setze anzahl + 1
									$.each(_thisMessagesViewNested.messages,function(key5,message5) {
										
										// _thisMessagesViewNested.messages[key4].display = 1;
											
										if (_thisMessagesViewNested.messages[key5].receiver == _thisMessagesViewNested.messages[key4].receiver && _thisMessagesViewNested.messages[key5].sender == _thisMessagesViewNested.messages[key4].sender) {
										
											if (_thisMessagesViewNested.messages[key5].searchtext == undefined) _thisMessagesViewNested.messages[key5].searchtext = '';
											_thisMessagesViewNested.messages[key5].searchtext = _thisMessagesViewNested.messages[key4].content + _thisMessagesViewNested.messages[key5].searchtext;

										
											if (_thisMessagesViewNested.messages[key4].sender!=me.id) {
											
												
												// var inArray = _.contains([message.sender, message.receiver], message.sender.group); // jQuery.inArray( "John", arr ); // _.find([message.sender, message.receiver], function(num){ return num % 2 == 0; });
												// console.log(_thisMessagesViewNested.messages[key5]);
												if ($.inArray(me.id, _thisMessagesViewNested.messages[key5].readby)<0) {
													if (_thisMessagesViewNested.messages[key5].anzahl == undefined) _thisMessagesViewNested.messages[key5].anzahl = 0;
													_thisMessagesViewNested.messages[key5].anzahl += 1;
												}
												
												
											}
											

										}
										
									});
									
								
								}
									
								
							});
							
							
							
							console.log(_thisMessagesViewNested.messages);
							_thisMessagesViewNested.render();
							
						});
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
				/*
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						// console.log(_thisMessagesViewNested);
						// _thisMessagesViewNested.render();
						_thisMessagesViewNested.initializeme();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _videosCollection');
						// console.log(action);
						// console.log(coll);
						// _thisMessagesViewNested.render();
					}
				});
				*/
			},
			bindEvents: function() {
				var _thisMessagesViewNested = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisMessagesViewNested.clicked(e);});
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
				/*
				this.$el.off('click','.isVideoToFavourites').on('click','.isVideoToFavourites',function(event){
					event.preventDefault();
					// alert('isVideoToFavourites');
					doAlert('Das Medienobjekt befindet sich bereits in Ihren Favoriten.','Information');
				});
				this.$el.off('click','.addVideoToFavourites').on('click','.addVideoToFavourites',function(event){
					event.preventDefault();
					console.log(event);
					$(this).removeClass("addVideoToFavourites");
					$(this).addClass("isVideoToFavourites");
					var videoid = $(event.currentTarget).attr('data-link');
					var _videoid = videoid;
					console.log(_videoid);
					dpd.users.get({id:_thisMessagesViewNested.me.id,following:_videoid}, function(result, error) {
						if (result) {
							console.log(result);
							}
						else {
							// console.log(error);
							dpd.users.put(_thisMessagesViewNested.me.id, {following:{$push:_videoid}}, function(result, error) {
								if (result) {
									console.log(result);
									doAlert('Das Medienobjekt befindet sich nun in Ihren Favoriten.','Favorit gespeichert!');
									}
								else {
									// console.log(error);
								}
							});
						}
					});
				});
				*/
			},
			insertData: function(model) {
				_thisMessagesViewNested = this;
				var uploader = model.get('uploader');
				if ( typeof( _thisMessagesViewNested.uploaderdata ) == "undefined") {
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users/?id="+uploader,
						async: false
					}).done(function(uploaderdata) {
						// $( this ).addClass( "done" );
						// console.log(uploaderdata);
						_thisMessagesViewNested.uploaderdata = uploaderdata;
					});
				}
				// console.log(jQuery.inArray(model.id, _thisMessagesViewNested.me.following));
				/*
				if (jQuery.inArray(model.id, _thisMessagesViewNested.me.following)==-1) {
					model.set("favclass","addVideoToFavourites");
				}
				else {
					model.set("favclass","isVideoToFavourites");
				}
				*/
				// console.log(model);
				rowContent = _.template(MessageRowElementPage, {
					id: model.get('id'),
					// uploader: model.get('uploader'),
					uploader: _thisMessagesViewNested.uploaderdata.fullname,
					videourl: model.get('videourl'),
					title: model.get('title'),
					description: model.get('description'),
					price: model.get('price'),
					thumbnailurl: model.get('thumbnailurl'),
					topic: model.get('topic'),
					favclass: model.get('favclass')
				},{variable: 'video'});
				return(rowContent);
			},
			render: function() {
				this.bindEvents();
				var _thisMessagesViewNested = this;
				console.log('DOING render MessagesViewNested.js called');
				
				
				/*
				// Sort multidimensional arrays with oobjects by value 
				// http://www.javascriptkit.com/javatutors/arraysort2.shtml
				this._videosCollection.sort(function(a, b){
				 var nameA=a.attributes.topic.toLowerCase(), nameB=b.attributes.topic.toLowerCase()
				 if (nameA < nameB) //sort string ascending
				  return -1 
				 if (nameA > nameB)
				  return 1
				 return 0 //default return value (no sorting)
				});
				*/
				
				_thisMessagesViewNested.htmlContent = '';
				_thisMessagesViewNested.rowContent = '';
				_thisMessagesViewNested.htmlContent = _thisMessagesViewNested.messages;
				// console.log(_thisMessagesViewNested.messages);
				_thisMessagesViewNested.$el.html(_.template(MessagesViewNestedPage, {
					data: _thisMessagesViewNested.messages
				},{variable: 'messages'}));

				/*
				_.each(this._videosCollection.models, function(model) {
					// this.id = model.get('id');
					// console.log(model);
					var uploader = model.attributes.uploader; // "ed568841af69d94d";
					$.ajax({
						// type: 'get',
						// timeout: 5000,
						url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
						async: false,
						success: function(data, textStatus, XMLHttpRequest){
							_thisMessagesViewNested.rowContent = _thisMessagesViewNested.rowContent + _thisMessagesViewNested.insertData(model);
						},
						error:function (xhr, ajaxOptions, thrownError){
							// console.log('error');
							// console.log(xhr.status);
							// console.log(xhr.statusText);
							// console.log(xhr.responseText);
							// console.log(ajaxOptions);
							// console.log(thrownError);
							if (xhr.responseText=='{"message":"not found","statusCode":404,"status":404}') {
								console.log('deactivating');
								
								dpd.videos.put(model.attributes.id, {"active":false}, function(result, err) {
								  if(err) return console.log(err);
								  console.log(result, result.id);
								});


								
							}
						}
					});
				});
				_thisMessagesViewNested.htmlContent = '<ul id="videosListView" data-filter="true" data-filter-placeholder="Suchfilter..." data-filter-theme="a" data-role="listview" data-theme="a" data-divider-theme="b" data-autodividers="true">'+_thisMessagesViewNested.rowContent+'</ul>';
				$(this.el).html(_thisMessagesViewNested.htmlContent);
				$("#videosListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					// console.log(li);
					var rowTopic = li.data( "topic" );
					var out = rowTopic;
					return out;
				  }
				});
				*/
				hideModal();
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					// $('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				return this;				
			}
		});

        return MessageViewNestedVar;

    }

);