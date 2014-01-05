// DashboardView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/DashboardView.html", "views/DashboardNestedView"],

    function($, Backbone, sidemenusList, SidemenuView, DashboardViewPage, DashboardNestedView){
		
		"use strict";
		
		var DashboardViewVar = Backbone.View.extend({
		
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
				var _thisViewDashboard = this;
				console.log('DOING render DashboardView.js called');
				this.$el.html(_.template(DashboardViewPage, {}));
				_thisViewDashboard.nestedView = new DashboardNestedView().fetch();
				this.nestedView = new SidemenuView().fetch();
				this.$el.trigger('create');				
				return this;
			}

		});

        return DashboardViewVar;

    }

);