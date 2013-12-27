// DashboardNestedView.js
// -------
define(["jquery", "backbone", "collections/usersCollection", "text!templates/DashboardNestedViewPage.html"],

    function($, Backbone, usersCollection, DashboardNestedViewPage){
		
		var DashboardNestedViewVar = Backbone.View.extend({
			el: "#DashboardNestedViewDiv",
			initialize: function() {
				console.log('initializing DashboardNestedView.js');
				// console.log(this.options.user);
				// var user = this.user = this.options.user;
			},
			fetch: function() {	
				_thisViewDashboardNested = this;
				console.log('fetching DashboardNestedView.js');
				/*
				this._videosCollection = new videosCollection();
				this._videosCollection.fetch({
					success: function(coll, jsoncoll) {
						// console.log(_thisViewDashboardNested);
						_thisViewDashboardNested.render();
					},
					error: function(action, coll) {
						console.log(action);
						console.log(coll);
						// _thisViewDashboardNested.render();
					}
				});
				*/
				// console.log(_thisViewDashboardNested.user.id);
				this._usersCollection = new usersCollection([],{dbid:_thisViewDashboardNested.options.user.id});
				this._usersCollection.fetch({
					success: function(coll, jsoncoll) {
						// console.log(_thisViewDashboardNested);
						_thisViewDashboardNested.render();
					},
					error: function(action, coll) {
						console.log(action);
						console.log(coll);
						// _thisViewDashboardNested.render();
					}
				});
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
		});

        return DashboardNestedViewVar;

    }

);