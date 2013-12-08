// ProfileView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html", "collections/ProfileList", "text!templates/profileView.html"],

    function($, Backbone, Profile, System, template, sidebar, ProfileList, profileView){
		
		var ProfileView = Backbone.View.extend({
			el: "#profileList",
			initialize: function() {
				//// console.log('initializing ProfileView.js');
			},
			insertProfiles: function(profile) {
				  // console.log('profile');
				  // console.log(profile);
				  htmlContent = _.template(profileView, {
					id: profile.get('id'), 
					fullname: profile.get('fullname'),
					device: profile.get('device'),
					credits: profile.get('credits'),
					pictureurl: profile.get('pictureurl'),
					lastModified: profile.get('lastModified')
				},{variable: 'profile'});
				$(this.el).append(htmlContent);
				},
			render: function() {
				var _thisView = this;
				// console.log('rendering in ProfileView.js');
				var htmlContent = '';
				// this.collection.each(this.insertProfiles, this);
				_.each(this.collection, function(model) {
					//// console.log(model);
					_thisView.insertProfiles(model);
				});
				return this;
				
			}
		});

        return ProfileView;

    }

);