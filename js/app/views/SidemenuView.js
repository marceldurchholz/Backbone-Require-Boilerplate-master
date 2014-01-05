// SidemenuView.js
// -------
define(["jquery", "backbone", "collections/sidemenusCollection", "text!templates/sidemenusList.html", "text!templates/sidemenuView.html"],

    function($, Backbone, sidemenusCollection, sidemenusList, sidemenuPage){
		
		var SidemenuView = Backbone.View.extend({
			
			initialize: function() {
				console.log('initializing SidemenuView.js');
				_thisViewSidemenu = this;
				this._sidemenusCollection = new sidemenusCollection();
			},
			fetch: function() {	
				console.log('fetching SidemenuView.js');
				// this.$el.hide();
				this._sidemenusCollection.fetch({
					success: function(coll, jsoncoll) {
						// console.log('jsoncoll');
						_thisViewSidemenu.collection = new sidemenusCollection(jsoncoll,{});
						// console.log(_thisViewSidemenu._sidemenusCollection.models);
						_thisViewSidemenu.render();
					},
					error: function(action, coll) {
						console.log(action);
						console.log(coll);
						alert('ERROR !!!');
						// _thisViewSidemenu.render();
					}
				});
				// alert('bla');
			},
			showDetails: function(e) {
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				// var item = this.collection;
				// console.log(item);
				console.log('showDetails: '+id);
				window.location.hash = '#sidemenus/details/view/'+id;
				// alert('bla');
			},
			bindEvents: function() {
				var _thisViewSidemenu = this;
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					e.preventDefault();
					_thisViewSidemenu.showDetails(e);
				});
			},
			render: function() {
				// console.log('redering SidemenuView.js');
				var _thisViewSidemenu = this;
				var htmlContent = '';
				// console.log(this._sidemenusCollection);
				var rowContent = '';
				_.each(this._sidemenusCollection.models, function(model) {
					this.id = model.get('id');
					rowContent += _.template(sidemenuPage, {
						id: model.get('id'),
						urloffline: model.get('urloffline'),
						userfriendly: model.get('userfriendly'),
						icon: model.get('icon').substring(1)
					},{variable: 'sidemenu'});
				});
				// console.log(rowContent);
				htmlContent = _.template(sidemenusList, {rowContent:rowContent});
				// console.log(htmlContent);
				$('.ui-page-active').append(htmlContent);
				// $( 'div.ui-page-active #menu' ).html('blablabla');				
				$( 'div.ui-page-active #menu' )
                     .page()
                     .listview();				
				return this;
			}
		});

        return SidemenuView;

    }

);