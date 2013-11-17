// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;

	$( document ).ready(function() {
	  // Handler for .ready() called.
	  report('MobileInit.js','document.ready');
	  app.initialize();
	  /*
	  report('MobileInit.js','document.ready END');
	  */
	});
	
    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);