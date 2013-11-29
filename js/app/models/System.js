// System.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
	function($, Backbone, MobileRouter) {
		var System = Backbone.Model.extend( {
			defaults: {
				version: 'defaultversion'
			},
			initialize: function() {
				if(isMobile.any()) {
					this.set({version: device.version});
					// this.set({version: 'bla'});
				}
			}
		} );
        return System;
    }
);
