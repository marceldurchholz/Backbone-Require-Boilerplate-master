// View.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/HomeNestedPage.html", "views/loginView"],

    function($, Backbone, sidemenusList, SidemenuView, HomeNestedPage, LoginViewJS) {

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
				this.$el.off('click','#gotologin').on('click','#gotologin',function(event){
					event.preventDefault();
					// _thisViewRecordVideoNested.savePageOne(event);
					// window.location.href = "#login";
					_thisViewHome.changePageTransition(new LoginViewJS);
				});
				this.fetch();
			},
			changePageTransition: function (page) {
				$(page.el).attr('data-role', 'page');
				page.render();
				$('#page').append($(page.el));
				var transition = page.transition ? page.transition : $.mobile.defaultPageTransition;
				// We don't want to slide the first page
				if (this.firstPage) {
					transition = 'none';
					this.firstPage = false;
				}
				$.mobile.changePage($(page.el), {changeHash:true, transition: 'slideup'});
				// return(false);
			},
			fetch: function() {
				this.render();
			},
			render: function() {
				this.bindEvents();
				var _thisViewHome = this;
				console.log('DOING render Videos.js called');
				// $('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
				// _thisViewHome.nestedView = new SidemenuView().fetch();
				_thisViewHome.$el.html(_.template(HomeNestedPage, {}));
				// _thisViewHome.nestedView = new HomeNestedView().fetch();
				_thisViewHome.$el.trigger('create');

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