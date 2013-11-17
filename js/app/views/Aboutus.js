// Aboutus.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/aboutus.html", "text!templates/sidebar.html"],

    function($, Backbone, Model, template, sidebar){

        var Aboutus = Backbone.View.extend({

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
				var testareahtml = _.template(sidebar, {}); // this.template(dict);
				// Append the result to the view's element.
				$(this.el).append(testareahtml);
				// Maintains chainability
                return this;

            }

        });

        return Aboutus;

    }

);