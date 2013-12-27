// Sidebar.js
// -------
define(["jquery", "backbone", "text!templates/sidebar.html"],
    function($, Backbone, sidebar){
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