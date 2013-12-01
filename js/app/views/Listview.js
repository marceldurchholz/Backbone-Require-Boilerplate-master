// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/ProfileList", "views/ProfileView", "text!templates/view.html", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, ProfileList, ProfileView, template, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				template: _.template(),

				initialize: function() {
					this.modelData = new Backbone.Model({systemData: new System(), profileData: new Profile()});
					
					var profiles = new ProfileList();
					var profilesView = new ProfileView({
						model: profiles
					});
					// When profiles have been successfully grabbed, display them using profile template
					profiles.bind('all', function (e) {
						alert(e);
						alert('a');
						profilesView.render();
					});
					profiles.fetch({
						success: function(response,xhr) {
							console.log("Inside success");
							alert('success');
							alert(response);
							console.log(response);
							this.render();
						},
							error: function (errorResponse) {
							alert('error');
							alert(errorResponse);
							console.log(errorResponse);
							this.render();
						}
					});

					// profiles.fetch();
					
					// this.render();
				},
				render: function() {
					alert('rendering');
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, 
						{}, 
						{}
					);

					this.$el.html(this._template);

					
					/*
					this._template = _.template(template, {
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
					this.$el.html(this._template);
					*/
					
					$('#body').trigger('create');
					return this;
				}
				
				
			});

        return Listview;

    }

);