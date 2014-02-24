// MessagesDetailsView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/MessagesDetailsViewPage.html", "views/MessagesDetailsViewNested", "text!templates/FooterPersistentPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, MessagesDetailsViewPage, MessagesDetailsViewNested, FooterPersistentPage){
		
		var MessagesDetailsVar = Backbone.View.extend({
		
			el: "#page-content",
			attributes: {"data-role": 'content'},
			events: {
			},
			bindEvents: function() {
				var _thisMessagesView = this;
			},
			initialize: function() {
				this._thisMessagesView = this;
				this.fetch();
			},
			sync: function() {
			},
			fetch: function() {
				this.render();
			},
			render: function() {
				this.bindEvents();
				_thisMessagesView = this;
				console.log('DOING render MessagesDetailsView.js called');
				$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
				_thisMessagesView.nestedView = new SidemenuView().fetch();
				_thisMessagesView.$el.html(_.template(MessagesDetailsViewPage, {}));
				// alert(this.options.id);
				
				_thisMessagesView.$el.html(_.template(MessagesDetailsViewPage, {}));
				$('#pageFooter').html(_.template(FooterPersistentPage, {})).trigger('create'); // '<div data-role="navbar"><ul><li>blafoo</li></ul></div>'
				// alert($('#pageFooter').html());
				
				_thisMessagesView.nestedView = new MessagesDetailsViewNested().fetch();
				return this;				
			}
		});

        return MessagesDetailsVar;

    }

);