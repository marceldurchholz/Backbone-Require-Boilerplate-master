// MessagesDetailsViewNested.js
// -------
define(["jquery", "backbone", "text!templates/MessagesDetailsViewNestedPage.html", "text!templates/MessagesReceiverPanelViewNestedPage.html", "text!templates/FooterPersistentPage.html"],

    function($, Backbone, MessagesDetailsViewNestedPage, MessagesReceiverPanelViewNestedPage, FooterPersistentPage) {
		
		var MessageViewNestedVar = Backbone.View.extend({
			
			el: "#MessagesDetailsNestedViewDiv",
			initialize: function() {
				_thisMessagesDetailsViewNested = this;
				_thisMessagesDetailsViewNested.bindEvents();
				showModal();
			},
			showReceiverPanel: function() {
				_thisMessagesDetailsViewNested = this;
				$('#innerHeader').html('Empfänger auswählen...');
				var contactsArray = new Array;
				var query = {$or:[{"sponsor":me.id},{"followers":me.id}],id: {$ne: me.id}, active:true,deleted:false,$sort:{fullname:1}};
				dpd.users.get(query, function (contactsArray,err) {
					if(err) {
						_thisMessagesDetailsViewNested.render();
						return console.log(err);
					}
					$('#MessagesDetailsViewDiv').html(_.template(MessagesReceiverPanelViewNestedPage, {
						data: contactsArray
					},{variable: 'contacts'}));
					$('#MessagesDetailsViewDiv').trigger('create');
					_thisMessagesDetailsViewNested.render();
				});
			},
			fetch: function() {	
				var _thisMessagesDetailsViewNested = this;
				var nameArray = new Array;
				if (_thisMessagesView.options.id==0) {
					_thisMessagesDetailsViewNested.showReceiverPanel();
				}
				else {
					var query = { "id":_thisMessagesView.options.id , $limit: 1 };
					dpd.users.get(query, function (receiver) {
						_thisMessagesView.options.id = receiver.id;
						if (receiver) dpd.users.me(function(me) {
							if (me) {
								_thisMessagesDetailsViewNested.receiver = receiver.id;
								var query = { $or:[{"sender":receiver.id,"receiver":me.id}  ,  {"sender":me.id,"receiver":receiver.id}]  ,$sort:{cdate:1}};
								dpd.messages.get(query, function (allmessagesdata) {
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
										var groupArr = new Array;
										groupArr.push(message.sender);
										groupArr.push(message.receiver);
										displayedGroups.push(groupArr);
									});

									// alert(_thisMessagesDetailsViewNested.messages.length);
									if (_thisMessagesDetailsViewNested.messages.length>20) {
										for (i=0;i>_thisMessagesDetailsViewNested.messages.length-20;i--) {
											if (_thisMessagesDetailsViewNested.messages[i]!=undefined) _thisMessagesDetailsViewNested.messages[i].visible = '1'; // (1, i);
											else _thisMessagesDetailsViewNested.messages[i].visible = '0';
										}
									}
									_thisMessagesDetailsViewNested.render();
									// $('#MessagesDetailsNestedViewDiv').show();
									// _thisMessagesDetailsViewNested.$el.show();
								});
							}
							else {
								// console.log('You are not logged in!');
								window.location.href = "#noaccess";
							}
						});
					
					
					});
				}
				
			},
			bindEvents: function() {
				var _thisMessagesDetailsViewNested = this;
				dpd.messages.off('create');
				dpd.messages.on('create', function(msgData) {
					msgArray = new Array;
					msgArray.push(msgData);					
					_thisMessagesDetailsViewNested.messages.push(msgData);
					_thisMessagesDetailsViewNested.fetch();
				});

			},
			render: function() {
				var _thisMessagesDetailsViewNested = this;
				if (_thisMessagesView.options.id!=0) {
					// $('#receiverHeader').html(_thisMessagesDetailsViewNested.receiver);

					var sql = { id: _thisMessagesDetailsViewNested.receiver };
					dpd.users.get(sql, function (receiverData,err) {
						if(err) { }
						$('#receiverHeader').html(receiverData.fullname);
					});
					
					$('#messageFooter').html(_.template(FooterPersistentPage, {
						receiver: _thisMessagesDetailsViewNested.receiver
					},{variable: 'data'})).trigger('create'); // '<div data-role="navbar"><ul><li>blafoo</li></ul></div>'
					$('#messagetextarea').css({'max-height':'40px'});
					// $('#messageFooter').css({'position':'absolute'});
					// $('#messageFooter').css({'bottom':'80px'});

					$('#MessagesDetailsNestedViewDiv').html('');
					$('#MessagesDetailsNestedViewDiv').html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'})); // .listview().listview('refresh'); // 
					// $('#MessagesDetailsNestedViewDiv').css({'border':'1px solid #909090'});
					$('#MessagesDetailsNestedViewDiv').css({'z-index':'999'});
					

				}
				if (_thisMessagesDetailsViewNested.alreadyinitialized==undefined) {
					$('#dyndiv').css({'height':$(window).height()}); // -200
				}
				// this.$el.show();
				setTimeout(function() {
					$('#page-content').animate({
						scrollTop: $("#page-content")[0].scrollHeight
					}, "fast", function() {
						// animation done
						$('#page-content').focus();
						// $('#dyndiv').css({'height':'auto'});
						$('#dyndiv').css({'height':'auto'});
						hideModal();
						_thisMessagesDetailsViewNested.alreadyinitialized = true;
						new FastClick(document.body);
					});
				}, 0);
				
				return this;				
			}
		});

        return MessageViewNestedVar;

    }

);