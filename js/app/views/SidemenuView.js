// SidemenuView.js
// -------
define(["jquery", "backbone", "collections/sidemenusCollection", "text!templates/sidemenusList.html", "text!templates/sidemenuView.html"],

    function($, Backbone, sidemenusCollection, sidemenusList, sidemenuPage){
		
		var SidemenuView = Backbone.View.extend({
			el: "#menuelement",
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
				// $(this.el).append('aaajshdkj sjdfj sldjflsj dljsl djfklsjd jsklk');
				console.log(this._sidemenusCollection);
				
				htmlContent = _.template(sidemenusList, {});
				$('#sidebarListViewDiv').html(htmlContent);
				_.each(this._sidemenusCollection.models, function(model) {
					this.id = model.get('id');
					// _thisViewSidemenu.insertData(model);
					htmlContent = _.template(sidemenuPage, {
						id: model.get('id'),
						urloffline: model.get('urloffline'),
						userfriendly: model.get('userfriendly'),
						icon: model.get('icon').substring(1)
					},{variable: 'sidemenu'});
					$('#menuelement').append(htmlContent);
				});
				// console.log(mycontent);
				// var bla = _.template(sidemenuPage, {});
				// console.log(this.nestedView);
				// $('.ui-page-active').append('<div id="sidebarListViewDiv" class="sidebarListViewDiv" style="position:fixed;top:0;left:0;text-align:left;height:100%;z-index:0;width:220px;background-color:#222;">testdiv'+bla+'</div>');

				// console.log($('#sidebar'));
				// $("#sidebar").hide();
				// this.$el.fadeIn( 500, function() {
					// alert('3000 secs');
				// });
				// new FastClick(document.body);
				// this.$el.trigger('create');
				// $('#page-content').trigger('create');
				return this;
			}
		});

        return SidemenuView;

    }

);