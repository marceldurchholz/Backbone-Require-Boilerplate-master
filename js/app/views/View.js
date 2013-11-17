// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Model, template, sidebar){

        var View = Backbone.View.extend({

            el: ".example",

            initialize: function() {

                this.render();

            },
			
            events: {
				
            },

            render: function() {
			
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});
                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

				// sidebar
				// $('#sidebar').html();
				var sidebarContent = _.template(sidebar, {}); // this.template(dict);
				// Append the result to the view's element.
				$('#sidebar').html(sidebarContent);
				// Maintains chainability
				
                return this;

            }

        });

        return View;

    }

);