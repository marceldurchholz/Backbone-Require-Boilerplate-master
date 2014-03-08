// SidemenuView.js
// -------
define(["jquery", "backbone", "collections/sidemenusCollection", "text!templates/sidemenuView.html"],

    function($, Backbone, sidemenusCollection, sidemenuPage){
		
		var SidemenuView = Backbone.View.extend({
			el: "#menuelement",
			initialize: function() {
				// console.log('initializing SidemenuView.js');
				_thisViewSidemenu = this;
				this._sidemenusCollection = new sidemenusCollection();
			},
			fetch: function() {	
				// console.log('fetching SidemenuView.js');
				this.$el.hide();
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
						// alert('ERROR !!!');
						doAlert('Eine Offlinefunktion wurde noch nicht in diesen APPinaut integriert. Sollte die Internetfunktion Ihres Smartphones deaktiviert sein, aktivieren Sie diese bitte wieder über die Einstellungen.','Oh Oh. Keine Internetverbindung?');
						$(this.el).html('Fehler beim Laden des Seitenmenüs.');
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
				$(this.el).html(htmlContent);
				_.each(this._sidemenusCollection.models, function(model) {
					this.id = model.get('id');
					// _thisViewSidemenu.insertData(model);
					htmlContent = _.template(sidemenuPage, {
						id: model.get('id'),
						urloffline: model.get('urloffline'),
						userfriendly: model.get('userfriendly'),
						icon: model.get('icon').substring(1)
					},{variable: 'sidemenu'});
					_thisViewSidemenu.$el.append(htmlContent);
				});
				// console.log($('#sidebar'));
				// $("#sidebar").hide();
				this.$el.fadeIn( 500, function() {
					// alert('3000 secs');
				});
				// new FastClick(document.body);
				// this.$el.trigger('create');
				// $('#page-content').trigger('create');
				return this;
			}
		});

        return SidemenuView;

    }

);