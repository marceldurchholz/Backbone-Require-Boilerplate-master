// DashboardNestedView.js
// -------
define(["jquery", "backbone", "text!templates/DashboardNestedViewPage.html"],

    function($, Backbone, DashboardNestedViewPage){
		
		var DashboardNestedViewVar = Backbone.View.extend({
			el: "#DashboardNestedViewDiv",
			initialize: function() {
				console.log('initializing DashboardNestedView.js');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					console.log(status);
					_thisViewDashboardNested.me = status;
					_thisViewDashboardNested.render();
				  },
				  function( status ) {
					// console.log( status + ", you fail this time" );
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewDashboardNested.dfd.state() === "pending" ) {
						_thisViewDashboardNested.dfd.notify( "working... " );
						setTimeout( _thisViewDashboardNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewDashboardNested = this;
				console.log('fetchMe DashboardNestedView.js');
				_thisViewDashboardNested.dfd = new jQuery.Deferred();
				_thisViewDashboardNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewDashboardNested.dfd.resolve(user);
						}, 2000 );
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
				return this.dfd.promise();
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
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewDashboardNested.clicked(e);});
				/*
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					// console.log(e);
					// alert('show detail');
					_thisViewDashboardNested.showDetails(e);
				});
				*/
			},
			render: function() {
				var _thisViewDashboardNested = this;
				// alert('rendering DashboardNestedView.js');
				console.log('rendering DashboardNestedView.js');
				// $(this.el).html('bla text');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				htmlContent = _.template(DashboardNestedViewPage, {
					id: _thisViewDashboardNested.me.id
					, pictureurl: _thisViewDashboardNested.me.pictureurl
				},{variable: 'user'});
				$(this.el).html(htmlContent);
				
				_thisViewDashboardNested.$el.trigger('create');
				return(this);
			}
			/*
			,
			clicked: function(e){
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection.get(id);
				// var name = item.get("name");
				// alert(name);
				alert(id);
			},
			insertData: function(model) {
				htmlContent = _.template(DashboardNestedViewPage, {
					id: model.get('id')
					, pictureurl: model.get('pictureurl')
					, cellphone: model.get('cellphone')
					, city: model.get('city')
					, companyname: model.get('companyname')
					, credits: model.get('credits')
					, device: model.get('device')
					, facebook: model.get('facebook')
					, followers: model.get('followers')
					, following: model.get('following')
					, fullname: model.get('fullname')
					, googleplus: model.get('googleplus')
					, homepage: model.get('homepage')
					, lastModified: model.get('lastModified')
					, linkedin: model.get('linkedin')
					, perstext: model.get('perstext')
					, phone: model.get('phone')
					, public: model.get('public')
					, purchases: model.get('purchases')
					, roles: model.get('roles')
					, show: model.get('show')
					, slogan: model.get('slogan')
					, street: model.get('street')
					, twitter: model.get('twitter')
					, username: model.get('username')
					, vimeo: model.get('vimeo')
					, xing: model.get('xing')
					, youtube: model.get('youtube')
					, zip: model.get('zip')
				},{variable: 'user'});
				$(this.el).append(htmlContent);
				this.bindEvents();
			},
			render: function() {
				var _thisViewDashboardNested = this;
				// console.log(this._videosCollection.models);
				console.log(this._usersCollection.models);
				var htmlContent = '';
				$(this.el).html('');
				_.each(this._usersCollection.models, function(model) {
					this.id = model.get('id');
					_thisViewDashboardNested.insertData(model);
				});
				_thisViewDashboardNested.$el.trigger('create');
				return this;
				
			}
			*/
		});

        return DashboardNestedViewVar;

    }

);