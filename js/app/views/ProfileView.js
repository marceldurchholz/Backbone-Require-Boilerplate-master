// ProfileView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html", "text!templates/profileView.html"],

    function($, Backbone, Profile, System, template, sidebar, profileView){
		
		var ProfileView = Backbone.View.extend({
			el: "#profiles",
			// template: _.template($('#profileTemplate').html()),
			// template: _.template(profileView),
			initialize: function() {
				console.log('initializing ProfileView.js');
				// this.render();
			},
			render: function() {
				console.log('loading profileview.js');
				// console.log(this.collection);
				/*
				this.model
				this.model = '[{"id":1,"name":"Lisa"},{"id":2,"name":"Paul"}]';
				*/
				this.bla = new Object ([{"id":1,"name":"Lisa"},{"id":2,"name":"Paul"}]);
				this.foo = [this.bla];
				
				if (!isMobile.any()) {
					alert(JSON.stringify(this.foo));
				}
				else {
					// alert(JSON.stringify(this.foo));
					alert(JSON.stringify(this.collection));
				}
				// this.collection = collection;
				// _.each(this.model.models, function(profile){
				// alert('each function');
				_.each(this.foo, function(profile){
					// var profileTemplate = this.template(profile.toJSON());
					// $(this.el).append(profileTemplate);
					alert(JSON.stringify(profile));
				}, this);
				
				_.each(this.collection, function(profile){
					// var profileTemplate = this.template(profile.toJSON());
					// $(this.el).append(profileTemplate);
					alert(JSON.stringify(profile));
				}, this);

				/*
				*/
				// alert($('#profiles').html());
				// alert($('#profiles').html());

				console.log('rendering in ProfileView.js');
				// var _profileView = _.template((profileView, {}, {}));
				this._profileView = _.template(profileView, {}, {});
				this.$el.html(this._profileView);
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