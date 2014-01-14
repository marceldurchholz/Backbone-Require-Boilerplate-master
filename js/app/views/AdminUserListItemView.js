// AdminUserListItemView.js
// -------
define(["jquery", "backbone", "models/AdminUserModel", "collections/AdminUserCollection", "text!templates/AdminUserListItemPage.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, AdminUserModel, AdminUserCollection, AdminUserListItemPage, sidemenusList, SidemenuView){
		
		var AdminUserListItemViewVar = Backbone.View.extend({
			
			el: "#AdminUserListViewNestedDiv",
			initialize: function() {
				console.log('initializing AdminUserListItemView.js');
			},
			initializeme: function() {
				console.log('initializing ME in AdminUserListItemView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					_thisViewAdminUser.me = status;
					_thisViewAdminUser.render();
				  },
				  function( status ) {
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewAdminUser.dfd.state() === "pending" ) {
						_thisViewAdminUser.dfd.notify( "working... " );
						setTimeout( _thisViewAdminUser.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewAdminUser = this;
				console.log('fetchMe AdminUserListItemView.js');
				_thisViewAdminUser.dfd = new jQuery.Deferred();
				_thisViewAdminUser.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewAdminUser.dfd.resolve(user);
						}, 0 );
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
				return this.dfd.promise();
			},
			fetch: function() {	
				// alert('bla');
				_thisViewAdminUser = this;
				console.log('fetching AdminUserListItemView.js');
				this.$el.hide();
				this._AdminUserCollection = new AdminUserCollection();
				this._AdminUserCollection.fetch({
					success: function(coll, jsoncoll) {
						console.log(_thisViewAdminUser);
						// _thisViewAdminUser.render();
						_thisViewAdminUser.initializeme();
					},
					error: function(action, coll) {
						console.log('ERROR fetching _AdminUserCollection');
						console.log(action);
						console.log(coll);
						// _thisViewAdminUser.render();
					}
				});
			},
			bindEvents: function() {
				var _thisViewAdminUser = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewAdminUser.clicked(e);});
				this.$el.off('click','.showAdminUserDetailsLink').on('click','.showAdminUserDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
			},
			insertData: function(model) {
				_thisViewAdminUser = this;
				var sponsor = model.get('sponsor');
				console.log(this.id);
				if ( typeof( _thisViewAdminUser.sponsordata ) == "undefined") {
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users/?id="+sponsor,
						async: false
					}).done(function(sponsordata) {
						// $( this ).addClass( "done" );
						console.log(sponsordata);
						_thisViewAdminUser.sponsordata = sponsordata;
					});
				}
				console.log(jQuery.inArray(model.id, _thisViewAdminUser.me.following));
				console.log(model);
				var rowContent = _.template(AdminUserListItemPage, {
					id: model.get('id'),
					// sponsor: _thisViewAdminUser.sponsordata.fullname,
					username: model.get('username'),
					slogan: model.get('slogan'),
					perstext: model.get('perstext'),
					pictureurl: model.get('pictureurl'),
					lastModified: model.get('lastModified'),
					registered: model.get('registered'),
					show: model.get('show'),
					credits: model.get('credits'),
					active: model.get('active')
				},{variable: 'user'});
				return(rowContent);
			},
			render: function() {
				this.bindEvents();
				var _thisViewAdminUser = this;
				console.log('DOING render AdminUserListItemView.js called');
				_thisViewAdminUser.htmlContent = '';
				_thisViewAdminUser.rowContent = '';
				$(this.el).html(_thisViewAdminUser.htmlContent);
				_.each(this._AdminUserCollection.models, function(model) {
					this.id = model.get('id');
					_thisViewAdminUser.rowContent = _thisViewAdminUser.rowContent + _thisViewAdminUser.insertData(model);
				});
				_thisViewAdminUser.htmlContent = '<ul data-filter="true" data-filter-placeholder="Suchfilter..." data-role="listview" data-theme="a" data-divider-theme="f" data-filter-theme="a" data-autodividers="true" id="AdminUserListView">'+_thisViewAdminUser.rowContent+'</ul>';
				$(this.el).html(_thisViewAdminUser.htmlContent);
				$("#AdminUserListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					console.log(li);
					var rowTopic = li.data( "topic" );
					var out = rowTopic;
					return out;
				  }
				});				
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				return this;				
			}
		});

        return AdminUserListItemViewVar;

    }

);