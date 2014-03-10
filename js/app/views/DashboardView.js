// DashboardView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/DashboardView.html", "views/DashboardNestedView"],

    function($, Backbone, sidemenusList, SidemenuView, DashboardViewPage, DashboardNestedView){
		
		var DashboardViewVar = Backbone.View.extend({
		
			el: "#page-content",
			attributes: {"data-role": 'content'},
			events: {
			},
			bindEvents: function() {
				var _thisViewDashboard = this;
			},
			initialize: function() {
				this.fetch();
			},
			sync: function() {
			},
			fetch: function() {
				this.render();
			},
			render: function() {
				this.bindEvents();
				_thisViewDashboard = this;
				// console.log('DOING render DashboardView.js called');
				// var ani = setTimeout ( function() {
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewDashboard.nestedView = new SidemenuView().fetch();
					_thisViewDashboard.$el.html(_.template(DashboardViewPage, {}));
					_thisViewDashboard.nestedView = new DashboardNestedView().fetch();
					// _thisViewDashboard.$el.trigger('create');
				// }, 0 );
				/*
				this._template = _.template(DashboardViewPage, {});
				this.$el.html(this._template);
				console.log(this._usersCollection);
				this.nestedViewB = new DashboardNestedView({collection: this._usersCollection.models}).render();
				*/

				return this;
			}

		});

        return DashboardViewVar;

    }

);