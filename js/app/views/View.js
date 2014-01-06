// View.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/HomeNestedPage.html", "text!templates/testpage.html", "views/loginView"],

    function($, Backbone, sidemenusList, SidemenuView, HomeNestedPage, testpage, LoginViewJS) {

		"use strict";
	
		var ViewVar = Backbone.View.extend({
		
			events: {
			},
			bindEvents: function() {
				var _thisViewHome = this;
				// this.$el.off('click','.createVideo').on('click','.createVideo',function(){_thisViewHome.createVideo();});
			},
			sync: function() {
			},
			initialize: function() {
				var _thisViewHome = this;
				// this.fetch();
			},
			fetch: function() {
				// this.render();
			},
			render: function() {
				this.bindEvents();
				console.log('DOING render View.js called');
				this.$el.html(_.template(HomeNestedPage, {}));
				this.nestedView = new SidemenuView().fetch();
				this.$el.trigger('create');
				return this;
				
			}
        });

        return ViewVar;

    }

);