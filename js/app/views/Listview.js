// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/ProfileList", "views/ProfileView", "text!templates/view.html", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, ProfileList, ProfileView, template, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				alertoutput: function() {
					alert('testalert');
				},
				initialize: function() {
					console.log('initializing Listview.js');
					// _.bindAll(this, "render");
					var _thisView = this;
					this.profileCollection = new ProfileList();
					// console.log(this.profileCollection);
					
					/*
					$.when(this.profileCollection.fetch()).done(function( x ) {
						// alert( 'aaa' ); // Alerts "123"
						console.log(xs);
					});
					*/

					
					this.profileCollection.fetch({ // call fetch() with the following options
						error: function(a, b) {
							console.log(a);
							console.log(b);
						},
						success: function(data, b) {
							console.log('>> this is data');
							console.log(data);
							console.log(b);
							// console.log('------------>> this is _thisCollection._localStorage.users');
							// console.log(window.LocalStorageAdapter.findAll());
							// return(false);
							// alert('success');
							_thisView.render(); // $.ajax 'success' callback
						}
					});
					console.log('after this.profileCollection.fetch');
					
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
				profilesCollectionChanged: function(e, xhr) {
					// alert('foo');
					console.log('profilesCollectionChanged: ' + e);
					console.log(xhr);
					// this.render();
				},
				render: function() {
					// alert('render');
					console.log('DOING render Listview.js called');
					// alert('rendering Listview.js');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, {});
					// $('#profiles').html('bla');
					this.$el.html(this._template);
					// alert('this.profileCollection.length: ' + this.profileCollection.length);
					// console.log(this.profileCollection.models);
					this.nestedView = new ProfileView({collection: this.profileCollection.models}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return Listview;

    }

);