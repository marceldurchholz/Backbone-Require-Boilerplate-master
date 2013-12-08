// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "collections/ProfileList", "views/ProfileView", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, ProfileList, ProfileView, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				alertoutput: function() {
					alert('testalert');
				},
				events: {
					'click .createEntry': 'createEntry'
				},
				createEntry: function () {
					// this.modelData.get('profileData').set( {id: ''} );
					// this.profileCollection._localStorage_users.create(new Profile({"id": "1", "fullname": "offline James King", "device": 0, "credits": "100", "pictureurl": ""}));
					if (this.profileCollection.online==0) {
						// this.profileCollection._localStorage_users.create(new Profile({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
						return(false);
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						// this.profileCollection._localStorage_users.create(new Profile({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new Profile({"username": username, "password": password, "fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
					}
					// alert('jupp');
					// this.render();
					// return false;
				},
				create: function(model) {
					_thisView = this;
					console.log(' ############# model');
					console.log(model.attributes);
					console.log(JSON.stringify(model.attributes));
					$.ajax('http://dominik-lohmann.de:5000/users', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						// Do something
						console.log('ajax insert successfull');
						_thisView.fetch();
					  }, 
					  error: function(xhr) {
						console.log(xhr);
						alert(xhr);
					  }
					});
				},
				bindAll: function(obj,coll,b) {
					var _thisView = this;
					// alert('bindAll');
					console.log(b.add);
					console.log(obj);
					console.log(coll);
					if (obj=='sync') {
						console.log('rendering new !!!');
						_thisView.render();
					}
					// this.render();
				},
				fetch: function() {
					// this.initialize();
					var _thisView = this;
					this.profileCollection.fetch({ // call fetch() with the following options
						error: function(action, coll) {
							//// console.log(action);
							//// console.log(coll);
						},
						success: function(coll, jsoncoll) {
							/*
							console.log('>> this is coll');
							console.log(coll);
							console.log('>> this is jsoncoll');
							console.log(jsoncoll);
							*/
							// _thisView.profileCollection.localStorage = jsoncoll;
							_thisView.render();
							// console.log(b);
							// console.log('------------>> this is _thisCollection._localStorage.users');
							// console.log(window.LocalStorageAdapter.findAll());
							// return(false);
							// alert('success');
							// _thisView.render(); // $.ajax 'success' callback
						}
					});
				},
				initialize: function() {
					//// console.log('initializing Listview.js');
					this.profileCollection = new ProfileList();
					// _.bindAll(this, "bindAll");
					this.profileCollection.bind('sync', this.bindAll, this);
					// console.log(this.profileCollection);
					
					/*
					$.when(this.profileCollection.fetch()).done(function( x ) {
						// alert( 'aaa' ); // Alerts "123"
						console.log(xs);
					});
					*/

					this.fetch();
					// this.render();
					
					// console.log('after this.profileCollection.fetch');
					
					// This uses jQuery's Deferred functionality to bind render() so it runs
					// after BOTH models have been fetched
					// $.when(this.options.model1.fetch(),this.options.model2.fetch())
					// this.profileCollection.fetch();
					/*
					$.when(this.profileCollection.fetch())
						.done(function (onlineData) {
						console.log('>> this is "onlineData in Listview.js"');
						console.log(onlineData);
						_thisView.profileCollection = onlineData;
						console.log('STARTING rendering Listview.js');
						_thisView.render();
						console.log('END rendering Listview.js');
						_thisView.render();
					});
					*/
					// this.profileCollection.fetch();
					// if(!isMobile.any()) this.profileCollectionLoaded();
					// this.profileCollection.fetch();
					// this.render();
				},
				render: function() {
					// alert('render');
					console.log('DOING render Listview.js called');
					// alert('rendering Listview.js');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, {});
					this.$el.html(this._template);
					this.nestedView = new ProfileView({collection: this.profileCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return Listview;

    }

);