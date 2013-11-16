// Aboutus.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/aboutus.html"],

    function($, Backbone, Model, template){

        var Aboutus = Backbone.View.extend({

            el: ".example",

            initialize: function() {

                this.render();

            },

            events: {

            },

            render: function() {

                this.template = _.template(template, {});

                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        return Aboutus;

    }

);