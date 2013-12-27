// SidemenuView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenuView.html"],

    function($, Backbone, sidemenuView){
		
		var SidemenuView = Backbone.View.extend({
			el: "#menuelement",
			initialize: function() {
				// console.log('initializing SidemenuView.js');
				// location.href( '#blafoopeng' );
			},
			showDetails: function(e) {
				// e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				window.location.hash = '#sidemenus/details/view/'+id;
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
			insertData: function(model) {
				htmlContent = _.template(sidemenuView, {
					id: model.get('id'),
					urloffline: model.get('urloffline'),
					userfriendly: model.get('userfriendly')
				},{variable: 'sidemenu'});
				// $(this.el).append('<a class="detailById" href="#" data-id="'+model.get('id')+'">');
				$(this.el).append(htmlContent);
				// $('.special').attr('id', 'your-id-value');
				// $(this.el).append('</a>');
				this.bindEvents();
			},
			render: function() {
				var _thisView = this;
				// console.log('rendering in SidemenuView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					this.id = model.get('id');
					_thisView.insertData(model);
				});
				return this;
				
			}
		});

        return SidemenuView;

    }

);