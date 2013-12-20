// SidebarView.js
// -------
define(["jquery", "backbone", "text!templates/SidebarViewPage.html"],

    function($, Backbone, SidebarViewPage){
		
		var SidebarView = Backbone.View.extend({
			el: "#sidebarListViewDiv",
			initialize: function() {
				console.log('initializing SidebarView.js');
				// location.href( '#blafoopeng' );
			},
			insertSidebarData: function(model) {
				htmlContent = '';
				htmlContent = _.template(SidebarViewPage, {
					id: model.get('id')
					, urloffline: model.get('urloffline')
					, userfriendly: model.get('userfriendly')
				},{variable:'sidebar'});
				// $(this.el).append('<a class="detailById" href="#" data-id="'+model.get('id')+'">');
				$(this.el).append(htmlContent);
				// $('.special').attr('id', 'your-id-value');
				// $(this.el).append('</a>');
				// this.bindEvents();
			},
			render: function() {
				var _thisView = this;
				console.log('rendering in SidebarView.js');
				var htmlContent = '';
				_.each(this.collection, function(model) {
					this.id = model.get('id');
					_thisView.insertSidebarData(model);
				});
				return this;
			}
		});

        return SidebarView;

    }

);