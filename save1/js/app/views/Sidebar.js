// Sidebar.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/sidebar.html", "text!templates/testarea.html"],
    function($, Backbone, Model, sidebar, testarea){
        var Sidebar = Backbone.View.extend({
            initialize: function() {
                this.render();
            },
            events: {
            },
            render: function() {
                this.sidebar = _.template(sidebar, {});
                return this;
            }
        });
        return Sidebar;
    }
);