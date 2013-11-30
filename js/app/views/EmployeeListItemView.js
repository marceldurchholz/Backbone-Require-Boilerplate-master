// EmployeeListItemView.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/EmployeeCollection", "text!templates/employeeListItemView.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, EmployeeCollection, template, sidebar){
	
		var EmployeeListItemView = Backbone.View.extend({
			
			/*
			tagName: "li",
			template: _.template(template, {}),
			model: new Employee(),
			employeeCollection: new EmployeeCollection(),
			*/
            el: "#page-content",
			attributes: {"data-role": 'content'},
			
			initialize:function () {
				// this.collection = colle;
                // this.modelData = new Backbone.Model({systemData: new System(), profileData: new Profile()});
				this.render();
			},
			render:function () {
				/*
				alert('bla');

				var variables = { namee: name };
				if (this.model.butter == false) {
					this.model.deladd = "ADD";
					this.model.icon= "plus";
					// this.el.html( template );
				}
				else {
					this.model.deladd = "DELETE";
					this.model.icon= "minus";
					// this.el.html( template );
				}
				var employeeCollection = {};
				*/
				/*
				var clients = new EmployeeCollection();
				// var clients = new myEmployeeCollection();
				clients.add({FirstName: 'Joe', LastName: 'Blow', Status: 'Active' });
				// var clientsView = new ClientsView({collection: clients});
				
				// this._template = _.template( template, { collectionvar: 'a' });
				this._template = _.template(template, {
					id: this.modelData.get('profileData').get('id'), 
					src: this.modelData.get('profileData').get('src'), 
					first_name: this.modelData.get('profileData').get('first_name'), 
					last_name: this.modelData.get('profileData').get('last_name'), 
					version: this.modelData.get('systemData').get('version'),
					platform: this.modelData.get('systemData').get('platform'),
					uuid: this.modelData.get('systemData').get('uuid'),
					name: this.modelData.get('systemData').get('name'),
					model: this.modelData.get('systemData').get('model'),
					device_internet: this.modelData.get('systemData').get('device_internet')
					}, {variable: 'collection'}
				);
				this._template = _.template(template, { "collection": clients.toJSON() });
				*/
				var myCollection = new EmployeeCollection();
				
				// var client = "{Name: 'Joe', Image: 'Active' }";
				var jsondat = new Object([{"Name":"10","Image":"Kathleen"},{"Name":"9","Image":"Gary"}]);
				// var dat = jsondat.toJSON;
				myCollection.add(jsondat.toJSON);
				alert(myCollection);
				this._template = _.template(template, { collection: myCollection.toJSON() } );
				this.$el.html(this._template);
				$('#body').trigger('create');
                return this;
			}
		});
	
		/*
		var EmployeeListItemView = Backbone.View.extend({
            el: "#page-content",
			attributes: {"data-role": 'content'},
            initialize: function() {
				this.modelData = new Backbone.Model({systemData: new System(), profileData: new Profile()});
                this.render();
            },			
            events: {
				'click .login': 'login',
				'click .logout': 'logout'
            },
			login: function () {
				this.modelData.get('profileData').set( {id: '100000853413637'} );
				this.render();
				return false;
			},
			logout: function () {
				this.modelData.get('profileData').set( {id: ''} );
				this.render();
				return false;
			},
            render: function() {
				this.sidebar = _.template(sidebar, {});
				$('#sidebar').html(sidebar);
				this._template = _.template(template, {
					id: this.modelData.get('profileData').get('id'), 
					src: this.modelData.get('profileData').get('src'), 
					first_name: this.modelData.get('profileData').get('first_name'), 
					last_name: this.modelData.get('profileData').get('last_name'), 
					version: this.modelData.get('systemData').get('version'),
					platform: this.modelData.get('systemData').get('platform'),
					uuid: this.modelData.get('systemData').get('uuid'),
					name: this.modelData.get('systemData').get('name'),
					model: this.modelData.get('systemData').get('model'),
					device_internet: this.modelData.get('systemData').get('device_internet')
					}, {variable: 'modelData'}
				);
				this.$el.html(this._template);
				$('#body').trigger('create');
                return this;
            }
        });
		*/

        return EmployeeListItemView;

    }

);