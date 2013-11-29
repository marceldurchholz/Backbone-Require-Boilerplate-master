// View.js
// -------
define(["jquery", "backbone", "models/Profile", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, template, sidebar){

		var profilePictureModel;
		
        var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {
				
				this.profilePictureModel = new Profile();
			    // this.listenTo(this.profilePictureModel, 'change', this.render);
				// this.profilePictureModel.bind('change', this.render, this);
				this.profilePictureModel.bind("change", this.changeHandler);
				
                this.render();

            },
			
		    changeHandler: function(val) {
				// this.render();
				// this.profilePictureModel.set({ src: 'Enter color value' });
				alert('model has changed in view');
			},
			
            alertHandler: function() {
				alert('alertHandler');
            },

            events: {
				
            },

            render: function() {
			
				// alert('rendering view');
				
				// Profile Model
				// var profilePicture = this.profilePictureModel.attributes;
			
				// alert('1');
				// alert(aaa);
				// profilePicture.set({src: 'aaa'});
				// $('#profilePicture').src = '';
				// profilePicture.src = '';
				
				// this.changeHandler('a');
				// this.profilePictureModel.set({ src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg' });
				
				// alert('2');
				// $('#body').trigger('create');
				
				// sidebar
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				$('#sidebar').html(sidebar);
				// Maintains chainability
				

				
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});
				template = _.template(template, {src: this.profilePictureModel.attributes.src}, {variable: 'profilePicture'});
				
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