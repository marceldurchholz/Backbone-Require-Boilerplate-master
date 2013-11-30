// EmployeeCollection.js
// -------------
define(["jquery","backbone","models/Employee"],

  function($, Backbone, Employee) {

    // Creates a new Backbone Collection class object
    var EmployeeCollection = Backbone.Collection.extend({

		model: Employee,
		// url:"../api/employees",
		initialize: function () {
			var data = [
			{ Name: "a", Image: "path1" },
			{ Name: "b", Image: "path2" },
		];
		}
		
		/*
		// Tells the Backbone Collection that all of it's models will be of type Employee (listed up top as a dependency)
		// employee: Employee
		defaults: {
			model: Employee
		},
		model: Employee,
		//override parse due to json format. point to "items"
		parse: function(response, xhr) {
			return response.items;
		},
		// url:"../api/employees",
		findByName:function (key) {
			// var url = (key == '') ? '../api/employees' : "../api/employees/search/" + key;
			console.log('findByName: ' + key);
			var self = this;
			// var data = '[{"id":"10","firstName":"Kathleen","lastName":"Byrne","title":"Sales Representative","reportCount":"0"},{"id":"9","firstName":"Gary","lastName":"Donovan","title":"Marketing","reportCount":"0"}]';
			// self.reset(data);
			$.ajax({
				url:url,
				dataType:"json",
				success:function (data) {
					console.log("search success: " + data.length);
					self.reset(data);
				}
			});
		}
		*/

    });

    // Returns the Employee class
    return EmployeeCollection;

  }

);