// View.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, template, sidebar){
		
		var View = Backbone.View.extend({

            el: "#page-content",
			attributes: {"data-role": 'content'},

            initialize: function() {
			
				LocalStorageAdapter.findById(2).done(function (response) {
					console.log(response);
				});
				
				/*
				dao.findAll(doAlert);
				function doAlert() {
					alert('bla');
				}
				*/
				
				this.modelData = new Backbone.Model({systemData: new System(), profileData: new Profile()});
				// alert('initialize');
				// this.modelData.set({systemData: new System(), profileData: new Profile()});
				// alert(this.modelData);
				// this.model = model;
				// var obj = this.modelData;
				// alert(this.modelData.get('systemData').get('version'));
				// alert(JSON.stringify(obj, null, 4));
				// var view = new GridView({model: model});
				// this.modelData.bind("change", this.render);
				// this.modelData.bind('change', this.update);
				// this.listenTo( this.modelData, 'change', this.render );
				// this.modelData.bind('reset', this.render, this);
				// this.modelData.on("change", this.render, this);
				/*
				this.systemData = new System();
				this.profileData = new Profile();
				this.profileData.bind("change", this.changeHandler);
				this.systemData.bind("change", this.changeHandler);
				*/
				// _.bindAll(this, 'render');
				// this.modelData.on('change',this.render, this);
				
                this.render();
            },			
            events: {
				'click .login': 'login',
				'click .logout': 'logout'
            },
			login: function () {
				// $(document).trigger('login');
				// return false;
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
				alert('rendering view.js');
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

        return View;

    }

);