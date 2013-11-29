// View.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, template, sidebar){
		
		var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {

				this.modelData = new Backbone.Model();
				// alert(this.modelData);
				// this.model = model;
				this.modelData.set({systemData: new System(), profileData: new Profile()});
				// var obj = this.modelData;
				// alert(this.modelData.get('systemData').get('version'));
				// alert(JSON.stringify(obj, null, 4));
				// var view = new GridView({model: model});
				this.modelData.bind("change", this.render);
				/*
				this.systemData = new System();
				this.profileData = new Profile();
				this.profileData.bind("change", this.changeHandler);
				this.systemData.bind("change", this.changeHandler);
				*/
				
				// _.bindAll(this, 'render');
				// this.modelData.on('change',this.render, this);
				
                this.render();

            },
			
		    changeHandler: function(val) {
				// this.render();
				// this.profileData.set({ src: 'Enter color value' });
				alert('model has changed in view');
				// alert(val.attributes.id);
			},
			
            events: {
				'click .login': 'login',
				'click .logout': 'logout'
            },
			
			login: function () {
				$(document).trigger('login');
				return false;
			},
			logout: function () {
				$(document).trigger('logout');
				return false;
			},

            render: function() {
				// this.modelData.set({ src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg', id: '100000853413637' });
				
				// sidebar
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				$('#sidebar').html(sidebar);
				// Maintains chainability
				
				$('.scrollable').pullToRefresh({
					callback: function() {
						var def = $.Deferred();
						setTimeout(function() {
							def.resolve();      
						}, 3000); 
						return def.promise();
					}
				});
				
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});
				// template = _.template(template, {src: this.profileData.attributes.src, id: this.profileData.attributes.id, first_name: this.profileData.attributes.first_name, last_name: this.profileData.attributes.last_name}, {variable: 'profileData'});
				template = _.template(template, {
					id: this.modelData.get('profileData').get('id'), 
					src: this.modelData.get('profileData').get('src'), 
					first_name: this.modelData.get('profileData').get('first_name'), 
					last_name: this.modelData.get('profileData').get('last_name'), 
					version: this.modelData.get('systemData').get('version')
					}, {variable: 'modelData'}
				);
				// template = _.template(template, {version: this.modelData.attributes.version}, {variable: 'modelData'});
				
                // Dynamically updates the UI with the view's template
                // this.$el.html(this.template);
				$('#page-content').html(template);

				// this.$el.trigger('create');
				$('#body').trigger('create');

                return this;

            }

        });

        return View;

    }

);