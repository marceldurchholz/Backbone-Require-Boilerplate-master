// EmployeeListItemView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/EmployeeCollection", "text!templates/employeeListItemView.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, EmployeeCollection, template, sidebar){
	
		var EmployeeListItemView = Backbone.View.extend({
            el: "#page-content",
			attributes: {"data-role": 'content'},
            initialize: function() {
                this.render();
            },
            render: function() {
				this.sidebar = _.template(sidebar, {});
				$('#sidebar').html(sidebar);
				/*
				var _this = this;
				log('model.render() called');
				// this.collection is passed in on instantiation
				this.collection.deferred.done(function() {
					log('data returned and rendered');
					var data = _this.collection.toJSON();
					// Lets just output the response into the DOM
					$('pre').html( JSON.stringify( data, '', '  ' ) );
				});
				*/
				alert('rendering');
				var myCollection = new EmployeeCollection();
				// myCollection.bind("change", this.render, this);

				myCollection.fetch({
				  error: function(e) {
					alert('error');
				  },
				  success: function() {
					alert('success');
					// Do Something
					// This is called when all add, remove and update operations have been done
				  }
				});
				
				// printObject(myCollection);
				// myCollection.add({id: 'bla'});
				
				/*
				myCollection.fetch({
					success: function(response,xhr) {
						console.log("Inside success");
						alert('success');
						console.log(response);
					},
						error: function (errorResponse) {
						alert('error');
						console.log(errorResponse)
					}
				});
				*/
				
				alert(myCollection.toJSON());
				// alert(myCollection);
				printObject(myCollection);
				
				this._template = _.template(template, {myCollection: myCollection});				
				this.$el.html(this._template);
				$('#body').trigger('create');
                return this;

            }

		});
		
        return EmployeeListItemView;

    }

);