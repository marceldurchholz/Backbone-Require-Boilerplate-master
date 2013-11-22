// Sidebar.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/sidebar.html", "text!templates/testarea.html"],

    function($, Backbone, Model, template, testarea){

        var Sidebar = Backbone.View.extend({

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

				// Maintains chainability
                return this;

            }

        });

        return Sidebar;

    }

);