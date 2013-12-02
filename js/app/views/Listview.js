// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/ProfileList", "views/ProfileView", "text!templates/view.html", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, ProfileList, ProfileView, template, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				// template: _.template(listview),

				initialize: function() {
					// this.modelData = new Backbone.Model({systemData: new System(), profileData: new Profile()});
					/*
					var profiles = new ProfileList();
					var profilesView = new ProfileView({
						model: profiles
					});
					// When profiles have been successfully grabbed, display them using profile template
					profiles.bind('sync', function (e) {
						alert(e);
						// alert('a');
						this.render();
					});
					// profiles.fetch({reset: true});
					profiles.fetch({
						success: function(response,xhr) {
							console.log("Inside success");
							alert('success');
							alert(response);
							alert(response[0]);
							console.log(response);
						},
						error: function (errorResponse) {
							alert('error');
							alert(errorResponse);
							console.log(errorResponse);
						}
					});
					// profiles.reset();
					*/
					// var profilesObj = new ProfileList();
					// var profiles = profilesObj[0];
					// profilesView.add({name: 'bla'});
					
					/*
					var profiles = new ProfileList();
					var profilesView = new ProfileView({
						model: this.profiles
					});
					profiles.bind('sync', function (e) {
						// alert(e);
						// this.fetch();
						alert('syncing profile through BIND');
						profilesView.render();
						// console.log(profiles);
					});
					this.profiles = profiles;
					*/

					/*
					Profile.donuts.bind("add", function(donut) { 
					  alert("added " + donut.get("name")); 
					});
					*/
										
					/*
					myCollection = new ProfileList([
						new Profile({ name: 'hans', id: 200}),
						new Profile({ title: 'peter', id: 250}),
						new Profile({ title: 'werner', id: 100}),
						new Profile({ title: 'connie', id: 10})
						// Add more here
					]);
					*/
					
					
					// this.listenTo(this, 'change', this.render);
					/*
					this.myCollection.bind('reset',function(e) {
						alert(e.length);
						// alert('a');
						// this.render();
						// alert('blafoobla');
					});
					*/
					// console.log(myCollection.toJSON());
					// profiles.fetch();
					
					var myCollection = new ProfileList();
					this.myCollection = myCollection;
					this.myCollection.bind('all',this.myCollectionLoaded, this);
					this.myCollection.fetch();
					// this.myCollection.add({ name: 'Hans', id: 1 });
					// this.myCollection.add({ name: 'Werner', id: 2 });
					
					// console.log(myCollection);
					// this.render();
				},
				myCollectionLoaded: function(e){
					// console.log(e);
					alert('***** myCollectionLoaded called: ' + e);
					// console.log(e);
					/*
					if (isMobile.any()) {
						if (e=='success') {
							this.render();
						}
						else if (e=='error') {
							alert('error');
						}
					}
					else {
						this.render();
					}
					*/
					this.render();
				},
				render: function() {
					
					/*
					var hansmustermannprofile = new Profile({
						id : "1",
						name : "Hans Mustermann"
					});
					// console.log(hansmustermannprofile);
					*/
					// var myCollection = new ProfileList();
					// myCollection.add(hansmustermannprofile);
					
					// this.listenTo(this.model, 'change', this.render);
					
					console.log('rendering Listview.js');
					// this.myCollection.reset();
					/*
					this.myCollection.fetch({
					  success: function(collection){
						// This code block will be triggered only after receiving the data.
						// console.log(collection.toJSON()); 
						alert('success');
					  }
					});
					*/
				
					// this.profiles.reset();
					// alert('rendering in Listview.js');
					// profiles.fetch();
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, {});
					// $('#profiles').html('bla');
					this.$el.html(this._template);
					
					this.nestedView = new ProfileView({collection: this.myCollection}).render();
					this._nestedView = this.nestedView;
					
					// this.$el.append( this.nestedView.render().el );
					this._nestedView.setElement( this.$el.find('.selector') );

					
					/*
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
					*/
					
					// $('#body').trigger('create');
					this.$el.trigger('create');
					return this;
				}
				
				
			});

        return Listview;

    }

);