// MobileInit.js
// -------------
report('MobileInit.js','start');

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	report('MobileInit.js','inner');
	
    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
	
	// DOMloaded();
	// report($.mobile.loaded);

    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);