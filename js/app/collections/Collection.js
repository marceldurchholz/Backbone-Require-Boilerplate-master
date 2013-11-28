// Collection.js
// -------------
define(["jquery","backbone","models/Profile"],

  function($, Backbone, Profile) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Profile (listed up top as a dependency)
      profile: Profile

    });

    // Returns the Profile class
    return Collection;

  }

);