// MessagesDetailsViewNested.js
// -------
define(["jquery", "backbone", "text!templates/MessagesDetailsViewNestedPage.html", "text!templates/FooterPersistentPage.html"],

    function($, Backbone, MessagesDetailsViewNestedPage, FooterPersistentPage) {
		
		var MessageViewNestedVar = Backbone.View.extend({
			
			el: "#MessagesDetailsNestedViewDiv",
			initialize: function() {
				console.log('initializing MessagesDetailsViewNested.js');
				this.$el.hide();
				showModal();
			},
			fetch: function() {	
				// alert('bla');
				_thisMessagesDetailsViewNested = this;
				console.log('fetching MessagesDetailsViewNested.js');
				
				var nameArray = new Array;
				// alert(_thisMessagesView.options.id);
				dpd.messages.get(_thisMessagesView.options.id, function (result) {
					// console.log(result);

					if (result) dpd.users.me(function(me) {
						if (me) {
							// console.log(me.id);
							// http://dominik-lohmann.de:5000/messages?{"$or":[{"sender":"009505631619d88e"},{"receiver":"009505631619d88e"}],$sort:{cdate:-1}}
							// var query = {$or:[{"sender":result.sender},{"receiver":result.receiver}],$sort:{cdate:-1}};
							if (result.receiver==window.me.id) _thisMessagesDetailsViewNested.receiver = result.sender;
							else _thisMessagesDetailsViewNested.receiver = result.receiver;
							var query = {  $or:[{"sender":result.sender,"receiver":result.receiver}  ,  {"sender":result.receiver,"receiver":result.sender}]  ,$sort:{cdate:1}};
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
								
								console.log(nameArray);
									
								
									
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
								
								// console.log(_thisMessagesDetailsViewNested.messages);
								
								_thisMessagesDetailsViewNested.render();
								
							});
						}
						else {
							console.log('You are not logged in!');
							window.location.href = "#noaccess";
						}
					});
				
				
				});

				
			},
			bindEvents: function() {
				var _thisMessagesDetailsViewNested = this;
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
				dpd.messages.on('create', function(msgData) {
					// console.log(msgData.id);
					console.log(msgData);
					// var messages = new Object;
					// messages.push(msgData);
					_thisMessagesDetailsViewNested.messages.push(msgData);
					// _thisMessagesDetailsViewNested.fetch();
					_thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'}));
					// _thisMessagesDetailsViewNested.$el.trigger('update');
					_thisMessagesDetailsViewNested.$el.trigger('create');
					new FastClick(document.body);
					fontResize();
					$('#page-content').stop().animate({
					  scrollTop: $("#page-content")[0].scrollHeight
					}, 0);
					// $('#MessagesDetailsViewDiv').append( "<p>Test</p>" );
				});

			},
			render: function() {
				this.bindEvents();
				var _thisMessagesDetailsViewNested = this;
				console.log('DOING render MessagesDetailsViewNested.js called');
				
				_thisMessagesDetailsViewNested.htmlContent = '';
				// _thisMessagesDetailsViewNested.htmlContent = _thisMessagesDetailsViewNested.messages;
				_thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
					data: _thisMessagesDetailsViewNested.messages
				},{variable: 'messages'}));
				
				$('#pageFooter').html(_.template(FooterPersistentPage, {
					receiver: _thisMessagesDetailsViewNested.receiver
				},{variable: 'data'})).trigger('create'); // '<div data-role="navbar"><ul><li>blafoo</li></ul></div>'
				// $('#messagetextarea').height(40);
				
				// $('#messagetextarea').elastic();
				// $('#messagetextarea').attr("overflow", "scroll");
				// $('#messagetextarea').trigger('update');


				hideModal();
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					// $('.ui-content').scrollTop(0);
					new FastClick(document.body);
					fontResize();
					// alert($('#MessagesDetailsNestedViewDiv').height()-$(window).height());
					// alert($('#flexiblecontent').height());
					// $('#flexiblecontent').attr("height", "auto");
					
					// $('.ui-content').scrollTop($('#MessagesDetailsViewDiv').height()); // $('#MessagesDetailsViewDiv').height()
					// $('#page-content').scroll(function () {
					$('#page-content').stop().animate({
					  scrollTop: $("#page-content")[0].scrollHeight
					}, 1000);
					
				});
				return this;				
			}
		});

        return MessageViewNestedVar;

    }

);