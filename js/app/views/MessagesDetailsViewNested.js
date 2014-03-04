// MessagesDetailsViewNested.js
// -------
define(["jquery", "backbone", "text!templates/MessagesDetailsViewNestedPage.html", "text!templates/MessagesReceiverPanelViewNestedPage.html", "text!templates/FooterPersistentPage.html"],

    function($, Backbone, MessagesDetailsViewNestedPage, MessagesReceiverPanelViewNestedPage, FooterPersistentPage) {
		
		var MessageViewNestedVar = Backbone.View.extend({
			
			el: "#MessagesDetailsNestedViewDiv",
			initialize: function() {
				_thisMessagesDetailsViewNested = this;
				console.log('initializing MessagesDetailsViewNested.js');
				// this.$el.hide();
				// showModal();
				_thisMessagesDetailsViewNested.bindEvents();
			},
			showReceiverPanel: function() {
				_thisMessagesDetailsViewNested = this;
				// alert('bla');
				$('#innerHeader').html('Empfänger auswählen...');
				var contactsArray = new Array;
				
				/*
				var contact = new Object;
				contact.fullname = "Hans Huber";
				contact.id = "4586545790865689";
				contactsArray.push(contact);
				var contact = new Object;
				contact.fullname = "Eva Musterfrau";
				contact.id = "UIZFTZ76HN84487HGJJ";
				contactsArray.push(contact);
				*/
				console.log(me.id);
				// var query = {"sponsor":me.id,"active":true,"deleted":false};
				// var query = {$fields: {id: 1, fullname: 1}, $or:[{"sponsor":me.id},{"followers":me.id}],$sort:{fullname:1}};
				var query = {$or:[{"sponsor":me.id},{"followers":me.id}],active:true,deleted:false,$sort:{fullname:1}};
				dpd.users.get(query, function (contactsArray,err) {
				// dpd.users.get(function (contactsArray, err) {
					if(err) {
						_thisMessagesDetailsViewNested.render();
						return console.log(err);
					}
					// console.log(contactsArray);
					$('#MessagesDetailsViewDiv').html(_.template(MessagesReceiverPanelViewNestedPage, {
						data: contactsArray
					},{variable: 'contacts'}));
					// console.log(contactsArray);
					// $('#MessagesDetailsViewDiv').height(window.innerHeight-150);
					$('#MessagesDetailsViewDiv').trigger('create');
					_thisMessagesDetailsViewNested.render();
					// fontResize();
				});
			},
			fetch: function() {	
				// alert('bla');
				_thisMessagesDetailsViewNested = this;
				console.log('fetching MessagesDetailsViewNested.js');
				
				var nameArray = new Array;
				// alert(_thisMessagesView.options.id);
				if (_thisMessagesView.options.id==0) {
					// alert('bla');
					_thisMessagesDetailsViewNested.showReceiverPanel();
				}
				else {
					
					/*
					var query = { "id":_thisMessagesView.options.id , $limit: 1 };
					// var query = {  $or:[{"sender":result.sender,"receiver":result.receiver}  ,  {"sender":result.receiver,"receiver":result.sender}] };
					dpd.users.get(query, function (selecteduser) {
					});
					*/
					
					// dpd.messages.get(_thisMessagesView.options.id, function (result) {
					var query = { "id":_thisMessagesView.options.id , $limit: 1 };
					dpd.users.get(query, function (receiver) {
						// console.log(receiver);
						_thisMessagesView.options.id = receiver.id;

						if (receiver) dpd.users.me(function(me) {
							if (me) {
								// console.log(me.id);
								// http://dominik-lohmann.de:5000/messages?{"$or":[{"sender":"009505631619d88e"},{"receiver":"009505631619d88e"}],$sort:{cdate:-1}}
								// var query = {$or:[{"sender":result.sender},{"receiver":result.receiver}],$sort:{cdate:-1}};
								// if (result.receiver==window.me.id) _thisMessagesDetailsViewNested.receiver = result.sender;
								// else _thisMessagesDetailsViewNested.receiver = result.receiver;
								_thisMessagesDetailsViewNested.receiver = receiver.id;
								var query = { $or:[{"sender":receiver.id,"receiver":me.id}  ,  {"sender":me.id,"receiver":receiver.id}]  ,$sort:{cdate:1}};
								// var query = {  $or:[{"sender":result.sender,"receiver":result.receiver}  ,  {"sender":result.receiver,"receiver":result.sender}] };
								dpd.messages.get(query, function (allmessagesdata) {
									// console.log(allmessagesdata);
									_thisMessagesDetailsViewNested.messages = new Array;
									$.each( allmessagesdata, function( key, message ) {
										if (message.unread==undefined) message.unread=0;
										if (message.sender==me.id) message.unread = 0;
										else if ($.inArray(me.id, message.readby)<0) message.unread += 1;
										if (message.unread==1) {
											dpd.messages.put(message.id, {"readby": {$push:$.trim(window.me.id)}} );
										}
										_thisMessagesDetailsViewNested.messages.push(message);
									});
									
									
									
									var displayedGroups = new Array();
									$.each(_thisMessagesDetailsViewNested.messages,function(key4,message) {
										_thisMessagesDetailsViewNested.messages[key4].display = 1;
										var inArray = false;
										$.each( displayedGroups, function( key8, group ) {
											inArray = are_arrs_equal(group, [message.sender,message.receiver]);									
											if (inArray==true) return(false);
										});
										if (inArray==true) _thisMessagesDetailsViewNested.messages[key4].display=1;
										// else {
										if (nameArray[_thisMessagesDetailsViewNested.messages[key4].sender]==undefined) {
											if (_thisMessagesDetailsViewNested.messages[key4].sender==me.id) nameArray[_thisMessagesDetailsViewNested.messages[key4].sender] = me.fullname;
											else {
												$.ajax({
													url: 'http://dominik-lohmann.de:5000/users?id='+_thisMessagesDetailsViewNested.messages[key4].sender,
													async: false
												}).done(function(userdata) {
													nameArray[_thisMessagesDetailsViewNested.messages[key4].sender] = userdata.fullname;
												});
											}
										}
										_thisMessagesDetailsViewNested.messages[key4].fullname = nameArray[_thisMessagesDetailsViewNested.messages[key4].sender];
										// console.log(_thisMessagesDetailsViewNested.messages[key4].fullname);
										
										
										var groupArr = new Array;
										groupArr.push(message.sender);
										groupArr.push(message.receiver);
										displayedGroups.push(groupArr);
										// _thisMessagesDetailsViewNested.messages[key4] = message;
									});
									
									// console.log(nameArray);
										
									
										
									/*
									$.each(_thisMessagesDetailsViewNested.messages,function(key4,message4) {
										var groupArr = new Array();
										if ($.inArray(me.id, _thisMessagesDetailsViewNested.messages[key4].readby)==-1) {
											$.each(_thisMessagesDetailsViewNested.messages,function(key5,message5) {
												if (_thisMessagesDetailsViewNested.messages[key5].receiver == _thisMessagesDetailsViewNested.messages[key4].receiver && _thisMessagesDetailsViewNested.messages[key5].sender == _thisMessagesDetailsViewNested.messages[key4].sender) {
													if (_thisMessagesDetailsViewNested.messages[key5].searchtext == undefined) _thisMessagesDetailsViewNested.messages[key5].searchtext = '';
													_thisMessagesDetailsViewNested.messages[key5].searchtext = _thisMessagesDetailsViewNested.messages[key4].content + _thisMessagesDetailsViewNested.messages[key5].searchtext;
													if (_thisMessagesDetailsViewNested.messages[key4].sender!=me.id) {
														if ($.inArray(me.id, _thisMessagesDetailsViewNested.messages[key5].readby)<0) {
															if (_thisMessagesDetailsViewNested.messages[key5].anzahl == undefined) _thisMessagesDetailsViewNested.messages[key5].anzahl = 0;
															_thisMessagesDetailsViewNested.messages[key5].anzahl += 1;
														}
													}
												}
											});
										}
									});
									*/
									
									// console.log(_thisMessagesDetailsViewNested.messages);
									
									// alert(_thisMessagesDetailsViewNested.messages.length);
									for (i=_thisMessagesDetailsViewNested.messages.length-1;i>_thisMessagesDetailsViewNested.messages.length-20;i--) {
										// _thisMessagesDetailsViewNested.messages.splice (1, i);
										// console.log(i);
										if (_thisMessagesDetailsViewNested.messages[i]!=undefined) _thisMessagesDetailsViewNested.messages[i].visible = '1'; // (1, i);
									}
									_thisMessagesDetailsViewNested.render();
									
								});
							}
							else {
								console.log('You are not logged in!');
								window.location.href = "#noaccess";
							}
						});
					
					
					});
				}
				
			},
			bindEvents: function() {
				var _thisMessagesDetailsViewNested = this;
				/*
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
				*/
				dpd.messages.off('create');
				dpd.messages.on('create', function(msgData) {
					// console.log(msgData.id);
					// console.log(msgData);
					// var messages = new Object;
					// messages.push(msgData);
					/*
					if (_thisMessagesDetailsViewNested.messages==undefined) _thisMessagesDetailsViewNested.messages= new Array;
					_thisMessagesDetailsViewNested.messages.push(msgData);
					// _thisMessagesDetailsViewNested.fetch();
					_thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'}));
					// _thisMessagesDetailsViewNested.$el.trigger('update');
					_thisMessagesDetailsViewNested.$el.trigger('create');
					var bla = _thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'}));
					*/
					console.log(msgData);
					msgArray = new Array;
					msgArray.push(msgData);
					
					_thisMessagesDetailsViewNested.messages.push(msgData);
					_thisMessagesDetailsViewNested.fetch();
					
					/*
					_thisMessagesDetailsViewNested.$el.append(_.template(MessagesDetailsViewNestedPage, {
						data: msgArray
					},{variable: 'messages'}));
					// _thisMessagesDetailsViewNested.$el.trigger('pagecreate');
					// alert(_thisMessagesDetailsViewNested.$el);
					// $('#'+msgData.id+'').listview('update');
					$('#'+msgData.id+'').listview().listview('refresh');
					scrollBottom();
					*/
					
					// MessagesDetailsViewListItem
					// _thisMessagesDetailsViewNested.$el.trigger('create');
					// $('#messagetextarea').focus();
					/*
					alert($("#page-content")[0].scrollHeight);
					$('#page-content').stop().animate({
						scrollTop: $("#page-content")[0].scrollHeight
					}, 8000);
					*/
					
					// console.log(bla);

					// new FastClick(document.body);
					// fontResize();
					// alert($("#page-content")[0].scrollHeight);
					// scrollBottom();
					// $('#MessagesDetailsViewDiv').append( "<p>Test</p>" );
				});

			},
			render: function() {
				var _thisMessagesDetailsViewNested = this;
				console.log('DOING render MessagesDetailsViewNested.js called');
				
				// _thisMessagesDetailsViewNested.htmlContent = '';
				// _thisMessagesDetailsViewNested.htmlContent = _thisMessagesDetailsViewNested.messages;
				if (_thisMessagesView.options.id!=0) {
					// $('#innerHeader').html($('#receiver'));
					$('#messageFooter').html(_.template(FooterPersistentPage, {
						receiver: _thisMessagesDetailsViewNested.receiver
					},{variable: 'data'})).trigger('create'); // '<div data-role="navbar"><ul><li>blafoo</li></ul></div>'
					$('#messagetextarea').css({'max-height':'40px'});
					_thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'})).trigger('create'); // .listview().listview('refresh'); // 
					// alert('a');
					// $('#messagetextarea').height(40);
					// $('#messagetextarea').elastic();
					// $('#messagetextarea').attr("overflow", "scroll");
					// $('#messagetextarea').trigger('update');
				}

				// alert('b');
				hideModal();
				// _thisMessagesDetailsViewNested.$el.trigger('create');
				// fontResize();
				
				/*
				setTimeout(function() {
					_thisMessagesDetailsViewNested.$el.fadeIn( 500, function() {
						// $('.ui-content').scrollTop(0);
						// alert($('#MessagesDetailsNestedViewDiv').height()-$(window).height());
						// alert($('#flexiblecontent').height());
						new FastClick(document.body);
						$('#page-content').attr("height", "auto");
						
						// $('.ui-content').scrollTop($('#MessagesDetailsViewDiv').height()); // $('#MessagesDetailsViewDiv').height()
						// $('#page-content').scroll(function () {
						scrollBottom();
					});
					  // Do something after 2 seconds
				}, 100);
				*/
				new FastClick(document.body);
				scrollBottom();
				return this;				
			}
		});

        return MessageViewNestedVar;

    }

);