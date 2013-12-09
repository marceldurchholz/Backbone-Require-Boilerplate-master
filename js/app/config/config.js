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
      "jquery": "../libs/jquery",

      "jqueryui": "../libs/jqueryui",

      "jquerymobile": "../libs/jquery.mobile",
	  
      "jquerypulltorefresh": "../libs/jquery.plugin.pullToRefresh",
	  
	  "videojs": "../video-js/video",

      // "backbone.LocalStorage": "../libs/backbone.localStorage",

      "backbone.LocalStorage": "../libs/backbone.localStorage",
	  
      "underscore": "../libs/lodash",

      "functions": "../functions",

      "backbone": "../libs/backbone",

      // Plugins
      // -------
      "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

      "bootstrap": "../libs/plugins/bootstrap",

      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // jQuery Mobile
      "jquerypulltorefresh": ["jquery"],

      "videojs": ["jquery"],
	  
	  // jQuery pull to refresh
      "jquerymobile": ["jquery"],
	  
      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      // jQueryUI
      "jqueryui": ["jquery"],

      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery
        "deps": ["functions", "underscore", "jquery", "jquerypulltorefresh", "videojs", "jquerymobile"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      },

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"],

      // local storage
	  // "backbone.LocalStorage": ["backbone"],
	  
      // local storage
	  "backbone.LocalStorage": ["backbone"],
	  
      // Jasmine-jQuery plugin
      "jasminejquery": ["jquery"]

  }

});