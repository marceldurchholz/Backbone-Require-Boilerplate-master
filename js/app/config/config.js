// Require.js Configurations
// -------------------------
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js/app",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

      // Core Libraries
      // --------------
      "jquery": "../libs/jquery-1.9.1",

      // "jqueryui": "../libs/jqueryui",

      "jquerymobile": "../libs/jquery.mobile-1.3.2",
	  
      // "jquerypulltorefresh": "../libs/jquery.plugin.pullToRefresh",

      // "backbone.LocalStorage": "../libs/backbone.localStorage",

      "backbone.LocalStorage": "../libs/backbone.localStorage",
	  
      "underscore": "../libs/lodash",

      "functions": "../functions",

      "videojs": "../video-js/video",

      "backbone": "../libs/backbone",
	  
	  "jqmconfig": "../jqm-config",

	  "deployd": "../dpd",

      // Plugins
      // -------
      "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

      "bootstrap": "../libs/plugins/bootstrap",

      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // jQuery pull to refresh
      // "jquerypulltorefresh": ["jquery"],

	  "jqmconfig": ["jquery","underscore","backbone"],
	  
      // jQuery Mobile
      "jquerymobile": ["jqmconfig", "deployd"],
	  
      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      // jQueryUI
      // "jqueryui": ["jquery"],

	  "functions": ["jquery", "videojs"],
	  
	  // VideoJS
      "videojs": {
		"deps": ["jquery"],
		"exports": "videojs"
	  },

      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery // "jquerypulltorefresh", 
        "deps": ["underscore", "jquery", "functions"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      },

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"],

      // local storage
	  // "backbone.LocalStorage": ["backbone"],
	  
      // local storage
	  // "backbone.LocalStorage": ["backbone"],
	  "backbone.LocalStorage": {
		"deps": ["backbone"],
		"exports": "backbone.LocalStorage"
	  },
	  
      // Jasmine-jQuery plugin
      "jasminejquery": ["jquery"]

  }

});