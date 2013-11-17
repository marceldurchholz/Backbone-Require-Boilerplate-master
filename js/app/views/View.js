// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/view.html", "text!templates/testarea.html"],

    function($, Backbone, Model, template, testarea){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },
			
            // View Event Handlers
            events: {
				
            },

            // Renders the view's template to the UI
            render: function() {
			
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});
                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

				// sidebar
				var testareahtml = _.template(testarea, {}); // this.template(dict);
				// Append the result to the view's element.
				$(this.el).append(testareahtml);
				
                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return View;

    }

);