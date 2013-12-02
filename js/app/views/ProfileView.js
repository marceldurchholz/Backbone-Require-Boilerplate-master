// ProfileView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html", "collections/ProfileList", "text!templates/profileView.html"],

    function($, Backbone, Profile, System, template, sidebar, ProfileList, profileView){
		
		var ProfileView = Backbone.View.extend({
			el: "#profiles",
			// template: _.template($('#profileTemplate').html()),
			// template: _.template(profileView),
			initialize: function() {
				console.log('initializing ProfileView.js');
				// this.render();
			},
			paintThings: function() {
				alert('paintThings');
			},
			insertProfiles: function(profile) {
				  // book.publish();
				  console.log(profile);
				  alert(profile.get('name'));
				  htmlContent = _.template(profileView, {id: profile.get('id'), name: profile.get('name')}, {variable: 'profile'});
				  // alert(htmlContent);
				  $(this.el).append(htmlContent);
				},
			render: function() {
				console.log('rendering in ProfileView.js');
				// console.log('loading profileview.js');
				// console.log(this.collection);
				/*
				this.model
				this.model = '[{"id":1,"name":"Lisa"},{"id":2,"name":"Paul"}]';
				*/
				
				if (isMobile.any()) {
					// alert(JSON.stringify(this.foo));
					alert(JSON.stringify(this.collection));
				}
				else {
					// var transformed = JSON.parse('{"p": 5}', function(k, v) { if (k === "") return v; return v * 2; });
					// // var bla = JSON.parse('{"id":"1","name":"Lisa"},{"id":"2","name":"Paul"}');
					var xxx = eval( '[{"id":"1","name":"Vanessa"},{"id":"2","name":"Connie"}]' );
					alert(xxx);
					alert(JSON.stringify(xxx));
					this.profil1 = new Profile({ id: "1", name: "Vanessa" });
					this.profil2 = new Profile({ id: "2", name: "Connie" });
					this.collection = new ProfileList([ this.profil1, this.profil2 ]);
					// this.bla = new Object ([{"id":1,"name":"Lisa"},{"id":2,"name":"Paul"}]);
					// this.foo = [this.bla];
					alert(JSON.stringify(this.collection));
				}
				
				// this.collection = collection;
				// _.each(this.model.models, function(profile){
				// alert('each function');
				
				var htmlContent = '';
				
				if (isMobile.any()) {
					this.collection.each(this.insertProfiles, this);
					/*
					_.each(this.collection, function(profile){
						// var profileTemplate = this.template(profile.toJSON());
						// $(this.el).append(profileTemplate);
						alert(JSON.stringify(profile));
					}, this);
					*/
				} else {
					// this.collection.models.each(this.paintThings);
					this.collection.each(this.insertProfiles, this);
					/*
					_.each(this.collection, function(profile){
						// var profileTemplate = this.template(profile.toJSON());
						// $(this.el).append(profileTemplate);
						// htmlContent = _.template(profileView, {id: this.collection.get(profile)}, {variable: 'profile'});
						console.log(this.collection);
						console.log('xxx');
						// alert('each');
						alert(htmlContent);
						// alert(JSON.stringify(profile));
					}, this);
					*/
				}
			  // var x = this.$el.append('dsfsdfsd');
			  // x.innerHTML = 'jkdkfjsd';
			  // alert(x);

				/*
				*/
				// alert($('#profiles').html());
				// alert($('#profiles').html());

				// var _profileView = _.template((profileView, {}, {}));
				
				// this._profileView = _.template(profileView, {}, {});
				// this.$el.html(this._profileView);
				
				// this.$el.html(profileView);
				// $('#body').html( "nothing" );
				// this.nestedView.setElement( this.$el.find('.selector') ).render();
				
				// $( "page-content" ).html( "blafoo" );
				// $('#body').trigger('create');
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