// VideoView.js
// -------
define(["jquery", "backbone", "text!templates/videoView.html"],

    function($, Backbone, videoView){
		
		var VideoView = Backbone.View.extend({
			el: "#videosList",
			initialize: function() {
				console.log('initializing VideoView.js');
				// location.href( '#blafoopeng' );
			},
			showDetails: function(e) {
				// e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				// window.location.hash = '#videos/details/'+id;
				// Router.navigate( $(this).attr('href') );
				window.location.hash = '#videos/details/'+id;
				// alert('bla');
			},
			bindEvents: function() {
				var _thisView = this;
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisView.clicked(e);});
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					// console.log(e);
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
			insertProfiles: function(model) {
				  // videoView.id = '123';
				  htmlContent = _.template(videoView, {
					id: model.get('id'),
					uploader: model.get('uploader'),
					videourl: model.get('videourl'),
					title: model.get('title'),
					description: model.get('description'),
					price: model.get('price'),
					thumbnailurl: model.get('thumbnailurl')
				},{variable: 'video'});
				$(this.el).append('<a class="detailById" href="#" data-id="'+model.get('id')+'">');
				$(this.el).append(htmlContent);
				// $('.special').attr('id', 'your-id-value');
				$(this.el).append('</a>');
				this.bindEvents();
			},
			render: function() {
				var _thisView = this;
				console.log('rendering in VideoView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					this.id = model.get('id');
					_thisView.insertProfiles(model);
				});
				return this;
				
			}
		});

        return VideoView;

    }

);