// MyProfileNestedView.js
// -------
define(["jquery", "backbone", "text!templates/MyProfileNestedViewPage.html"],

    function($, Backbone, MyProfileNestedViewPage){
		
		var MyProfileNestedView = Backbone.View.extend({
			el: "#MyProfileNestedViewDiv",
			initialize: function() {
				console.log('initializing MyProfileNestedView.js');
				// location.href( '#blafoopeng' );
			},
			/*
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
				var _thisView = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisView.clicked(e);});
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					// console.log(e);
					// alert('show detail');
					_thisView.showDetails(e);
				});
			},
			clicked: function(e){
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection.get(id);
				// var name = item.get("name");
				// alert(name);
				alert(id);
			},
			*/
			insertUserData: function(model) {
				htmlContent = '';
				htmlContent = _.template(MyProfileNestedViewPage, {
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
				// $(this.el).append('<a class="detailById" href="#" data-id="'+model.get('id')+'">');
				$(this.el).append(htmlContent);
				// $('.special').attr('id', 'your-id-value');
				// $(this.el).append('</a>');
				// this.bindEvents();
			},
			render: function() {
				var _thisView = this;
				console.log('rendering in MyProfileNestedView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					this.id = model.get('id');
					_thisView.insertUserData(model);
				});
				return this;
			}
		});

        return MyProfileNestedView;

    }

);