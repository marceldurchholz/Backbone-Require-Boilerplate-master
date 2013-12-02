// Profile.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

function($, Backbone, MobileRouter) {

        var Profile = Backbone.Model.extend({
			defaults: {
				"id": "defaultid",
				"name": "defaultname"
			},
			initialize: function() {
				alert('initializing model profile');
			}
		});
		
		return Profile;

    }

);
