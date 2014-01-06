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
				$('#sidemenuDiv').hide();
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
			/*
			showDetails: function(e) {
				e.preventDefault();
				var id = $(e.currentTarget).data("id");
				console.log('showDetails: '+id);
				window.location.hash = '#sidemenus/details/view/'+id;
			},
			bindEvents: function() {
				var _thisViewSidemenu = this;
				this.$el.off('click','.listRow').on('click','.listRow',function(e){
					e.preventDefault();
					_thisViewSidemenu.showDetails(e);
				});
			},
			*/
			render: function() {
				var _thisViewSidemenu = this;
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
				// alert(rowContent);
				var htmlContent = '';
				htmlContent = _.template(sidemenusList, {rowContent:rowContent});
				// alert(htmlContent);
				// alert('SidemenuViewA.js');
				// alert($('#body').html());
				// alert($('.ui-page-active').html());
				
				var hellokong = setTimeout (function() {
					$('#sidemenuDiv').html(htmlContent);
					$('#sidemenuDiv #menu').page().listview();
					// _thisViewSidemenu.$el.trigger('create');
				}, 0);
				// alert('SidemenuViewB.js');
				// console.log('this.nestedView');
				var hellokongb = setTimeout (function() {
					$('#sidemenuDiv').show();
				}, 500);				

				return this;
			}
		});

        return SidemenuView;

    }

);