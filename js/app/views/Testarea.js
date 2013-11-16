define(["jquery", "backbone", "models/Model", "text!templates/testarea.html"],

    function($, Backbone, Model, template){

        var Testarea = Backbone.View.extend({

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

        return Testarea;

    }

);