// ProfileView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html", "text!templates/profileView.html"],

    function($, Backbone, Profile, System, template, sidebar, profileView){
		
                var ProfileView = Backbone.View.extend({
                    el: "#profiles",
                    // template: _.template($('#profileTemplate').html()),
					template: _.template(profileView),
                    render: function(eventName) {
                        _.each(this.model.models, function(profile){
                            var profileTemplate = this.template(profile.toJSON());
                            $(this.el).append(profileTemplate);
                        }, this);

                        return this;
/*
				this.sidebar = _.template(sidebar, {});
				$('#sidebar').html(sidebar);
				
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
				
				$('#body').trigger('create');
                return this;
*/
						
                    }
                });

        return ProfileView;

    }

);