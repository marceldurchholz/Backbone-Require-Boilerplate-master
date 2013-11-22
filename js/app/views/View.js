// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Model, template, sidebar){

        var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {

                this.render();

            },
			
            events: {
				
            },

            render: function() {
			
				// sidebar
				// $('#sidebar').html();
				// var sidebarContent = _.template(bsidebar, {}); // this.template(dict);
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				$('#sidebar').html(sidebar);
				// Maintains chainability

				
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});
                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                return this;

            }

        });

        return View;

    }

);