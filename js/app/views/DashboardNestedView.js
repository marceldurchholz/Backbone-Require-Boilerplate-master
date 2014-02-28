// DashboardNestedView.js
// -------
define(["jquery", "backbone", "text!templates/DashboardNestedViewPage.html"],

    function($, Backbone, DashboardNestedViewPage){
		
		var DashboardNestedViewVar = Backbone.View.extend({
			el: "#DashboardNestedViewDiv",
			initialize: function() {
				_thisViewDashboardNested = this;
				console.log('initialize DashboardNestedView.js');
				this.$el.hide();
				showModal();
				dpd.users.me(function(me) {
					if (me) _thisViewDashboardNested.initializedata();
					else system.redirectToUrl('#login');
				});
			},
			initializedata: function() {
				console.log('initializedata DashboardNestedView.js');
				// $(this.el).html('loading...');
				_thisViewDashboardNested.me = window.me;
				
				var query = {  readby: {$nin: [me.id]},  $fields: {id: 1}, receiver:me.id, $sort:{cdate:1}};
				// dpd.messages.get(query, function (allmessagesdata) {
				// var query = "";
				dpd.messages.get(query, function(messagesdata) {
					if (messagesdata) {
						console.log(messagesdata.length);
						_thisViewDashboardNested.me.newmsgs = messagesdata.length;
						// return(false);
						_thisViewDashboardNested.render();
					}
					else {
						alert('error ? ! ?');
						// console.log('you are not logged in');
					}
				});
			},
			fetch: function() {	
				_thisViewDashboardNested = this;
				console.log('fetching DashboardNestedView.js');
			},
			showDetails: function(e) {
				// e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				// window.location.hash = '#videos/details/'+id;
				// Router.navigate( $(this).attr('href') );
				window.location.hash = '#videos/details/view/'+id;
				// alert('bla');
			},
			bindEvents: function() {
				var _thisViewDashboardNested = this;
				dpd.messages.on('create', function(msgData) {
					_thisViewDashboardNested.initializedata();
					/*
					if (_thisMessagesDetailsViewNested.messages==undefined) _thisMessagesDetailsViewNested.messages= new Array;
					_thisMessagesDetailsViewNested.messages.push(msgData);
					_thisMessagesDetailsViewNested.$el.html(_.template(MessagesDetailsViewNestedPage, {
						data: _thisMessagesDetailsViewNested.messages
					},{variable: 'messages'}));
					_thisMessagesDetailsViewNested.$el.trigger('create');
					new FastClick(document.body);
					$('#page-content').stop().animate({
					  scrollTop: $("#page-content")[0].scrollHeight
					}, 0);
					*/
				});
				dpd.users.me(function(user) {
					if (user) {
						// _thisViewDashboardNested.me = user;
						if (_thisViewDashboardNested.me.active==false || user.fullname=='') {
							$('#showMenu').hide();
							$('#showPageOptions').hide();
							// system.redirectToUrl('#myprofile');
							window.location.href = '#myprofile';
						}
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
			},
			render: function() {
				var _thisViewDashboardNested = this;
				console.log('rendering DashboardNestedView.js');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				if (_thisViewDashboardNested.me.pictureurl==undefined || _thisViewDashboardNested.me.pictureurl.length<=10) {
					_thisViewDashboardNested.me.pictureurl = 'images/avatar.jpg';
				}
				htmlContent = _.template(DashboardNestedViewPage, {
					id: _thisViewDashboardNested.me.id
					, pictureurl: _thisViewDashboardNested.me.pictureurl
					, fullname: _thisViewDashboardNested.me.fullname
					, newmsgs: _thisViewDashboardNested.me.newmsgs
				},{variable: 'user'});
				$(this.el).html(htmlContent);
				hideModal();
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 1000, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				this.bindEvents();
				return(this);
			}
		});

        return DashboardNestedViewVar;

    }

);