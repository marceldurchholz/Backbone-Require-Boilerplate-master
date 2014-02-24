// MessagesViewNested.js
// -------
define(["jquery", "backbone", "text!templates/MessagesViewNestedPage.html"],

    function($, Backbone, MessagesViewNestedPage){
		
		var MessageViewNestedVar = Backbone.View.extend({
			
			el: "#MessagesNestedViewDiv",
			initialize: function() {
				console.log('initializing MessagesViewNested.js');
			},
			fetch: function() {	
				// alert('bla');
				_thisMessagesViewNested = this;
				console.log('fetching MessagesViewNested.js');
				this.$el.hide();
				showModal();
				dpd.users.me(function(me) {
					if (me) {
						// console.log(me.id);
						// http://dominik-lohmann.de:5000/messages?{"$or":[{"sender":"009505631619d88e"},{"receiver":"009505631619d88e"}],$sort:{cdate:-1}}
						var query = {$or:[{"sender":me.id},{"receiver":me.id}],$sort:{cdate:-1}};
						dpd.messages.get(query, function (allmessagesdata) {
							_thisMessagesViewNested.messages = new Array;
							$.each( allmessagesdata, function( key, message ) {
								if (message.unread==undefined) message.unread=0;
								if (message.sender==me.id) message.unread = 0;
								else if (jQuery.inArray(me.id, message.readby)<0) message.unread += 1;
								
								
								_thisMessagesViewNested.messages.push(message);
							});							
							
							var displayedGroups = new Array();
							$.each(_thisMessagesViewNested.messages,function(key4,message) {
								_thisMessagesViewNested.messages[key4].display = 1;
								var inArray = false;
								$.each( displayedGroups, function( key8, group ) {
									inArray = are_arrs_equal(group, [message.sender,message.receiver]);									
									if (inArray==true) return(false);
								});
								if (inArray==true) _thisMessagesViewNested.messages[key4].display=0;
								else {
									if (_thisMessagesViewNested.messages[key4].sender==me.id) _thisMessagesViewNested.messages[key4].fullname = me.fullname;
									else {
										$.ajax({
											url: 'http://dominik-lohmann.de:5000/users?id='+_thisMessagesViewNested.messages[key4].sender,
											async: false
										}).done(function(userdata) {
											_thisMessagesViewNested.messages[key4].fullname = userdata.fullname;
										});
									}
								}
								var groupArr = new Array;
								groupArr.push(message.sender);
								groupArr.push(message.receiver);
								displayedGroups.push(groupArr);
								// _thisMessagesViewNested.messages[key4] = message;
							});
								
							$.each(_thisMessagesViewNested.messages,function(key4,message4) {
								var groupArr = new Array();
								if ($.inArray(me.id, _thisMessagesViewNested.messages[key4].readby)==-1) {
									$.each(_thisMessagesViewNested.messages,function(key5,message5) {
										if (_thisMessagesViewNested.messages[key5].receiver == _thisMessagesViewNested.messages[key4].receiver && _thisMessagesViewNested.messages[key5].sender == _thisMessagesViewNested.messages[key4].sender) {
											if (_thisMessagesViewNested.messages[key5].searchtext == undefined) _thisMessagesViewNested.messages[key5].searchtext = '';
											_thisMessagesViewNested.messages[key5].searchtext = _thisMessagesViewNested.messages[key4].content + _thisMessagesViewNested.messages[key5].searchtext;
											if (_thisMessagesViewNested.messages[key4].sender!=me.id) {
												if ($.inArray(me.id, _thisMessagesViewNested.messages[key5].readby)<0) {
													if (_thisMessagesViewNested.messages[key5].anzahl == undefined) _thisMessagesViewNested.messages[key5].anzahl = 0;
													_thisMessagesViewNested.messages[key5].anzahl += 1;
												}
											}
										}
									});
								}
							});
														
							_thisMessagesViewNested.render();
							
						});
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
			},
			bindEvents: function() {
				var _thisMessagesViewNested = this;
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
			},
			render: function() {
				this.bindEvents();
				var _thisMessagesViewNested = this;
				console.log('DOING render MessagesViewNested.js called');
				
				_thisMessagesViewNested.htmlContent = '';
				_thisMessagesViewNested.htmlContent = _thisMessagesViewNested.messages;
				_thisMessagesViewNested.$el.html(_.template(MessagesViewNestedPage, {
					data: _thisMessagesViewNested.messages
				},{variable: 'messages'}));

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