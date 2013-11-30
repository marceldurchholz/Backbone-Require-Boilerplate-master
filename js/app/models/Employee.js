// Employee.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
	function($, Backbone, MobileRouter) {
		var Employee = Backbone.Model.extend( {
			defaults: {
				id: 'default_id',
				firstName: 'default_firstName',
				lastName: 'default_lastName',
				title: 'default_title',
				officePhone: 'default_officePhone',
				deleted: 'default_deleted',
				lastModified: 'default_lastModified',
			},
			initialize: function() {
				if(isMobile.any()) {
					this.set({version: device.version});
					// this.set({version: 'bla'});
				}
			}
		} );
        return Employee;
    }
);
