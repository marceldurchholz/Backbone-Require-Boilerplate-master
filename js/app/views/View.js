// View.js
// -------
define(["jquery", "backbone", "models/Profile", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, template, sidebar){

        var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {

				this.profilePictureModel = new Profile;
				
                this.render();

            },
			
            events: {
				
            },

            render: function() {
			
				// Profile Model
				var profilePicture = this.profilePictureModel.attributes;
			
				// sidebar
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				$('#sidebar').html(sidebar);
				// Maintains chainability
				
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});
				template = _.template(template, {src: profilePicture.src}, {variable: 'profilePicture'});
				
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