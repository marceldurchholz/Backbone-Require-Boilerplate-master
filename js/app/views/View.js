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
			/*
            render: function() {
				// alert('rendering view.js');
				
				_thisViewHome = this;
				var ani = setTimeout ( function() {
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewHome.nestedView = new SidemenuView().fetch();					
				}, 500 );

					
				// this.sidebar = _.template(sidebar, {});
				// $('#sidebar').html(sidebar);
				
				// this._viewPage = _.template(viewPage, {});
				// this.$el.html(this._viewPage);
				
				this._viewPage = _.template(viewPage, {
					id: this.modelData.get('profileData').get('id'), 
					src: this.modelData.get('profileData').get('src'), 
					first_name: this.modelData.get('profileData').get('first_name'), 
					last_name: this.modelData.get('profileData').get('last_name'), 
					version: this.modelData.get('systemData').get('version'),
					platform: this.modelData.get('systemData').get('platform'),
					uuid: this.modelData.get('systemData').get('uuid'),
					name: this.modelData.get('systemData').get('name'),
					model: this.modelData.get('systemData').get('model'),
					device_internet: this.modelData.get('systemData').get('device_internet')
					}, {variable: 'modelData'}
				);
				this.$el.html(this._viewPage);
				// alert('create');
				this.$el.trigger('create');
				// console.log(this);
                return this;
            }
			*/

        });

        return ViewVar;

    }

);