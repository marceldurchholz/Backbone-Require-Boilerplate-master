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
				/*
				_thisViewDashboard = this;
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						// console.log(user);
						_thisViewDashboard.user = user;
						_thisViewDashboard.fetch();
						// _thisCollectionVideos.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
				*/
			},
			fetch: function() {
				var _thisViewDashboard = this;
				_thisViewDashboard.render();
			},
			render: function() {
				this.bindEvents();
				_thisViewDashboard = this;
				console.log('DOING render DashboardView.js called');
				// console.log(_thisViewDashboard.user);
				
				var ani = setTimeout ( function() {
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewDashboard.nestedView = new SidemenuView().fetch();
					_thisViewDashboard.$el.html(_.template(DashboardViewPage, {}));
					// _thisViewDashboard.nestedView = new DashboardNestedView({user:_thisViewDashboard.user}).fetch();
					_thisViewDashboard.nestedView = new DashboardNestedView().fetch();
					_thisViewDashboard.$el.trigger('create');
				}, 500 );
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