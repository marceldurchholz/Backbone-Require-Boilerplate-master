// Aboutus.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/aboutus.html", "text!templates/testarea.html"],

    function($, Backbone, Model, template, testarea){

        var Aboutus = Backbone.View.extend({

            el: ".example",

            initialize: function() {

                this.render();

            },

            events: {

            },

            render: function() {

				// page
                this.template = _.template(template, {});
                this.$el.html(this.template);

				// sidebar
				var testareahtml = _.template(testarea, {}); // this.template(dict);
				// Append the result to the view's element.
				$(this.el).append(testareahtml);

				// Maintains chainability
                return this;

            }

        });

        return Aboutus;

    }

);