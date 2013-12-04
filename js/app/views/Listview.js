// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/ProfileList", "views/ProfileView", "text!templates/view.html", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, ProfileList, ProfileView, template, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				initialize: function() {
					var _thisView = this;
					this.profileCollection = new ProfileList();
					// this.profileCollection.bind('sync',this.profileCollectionLoaded, this);
					
					// This uses jQuery's Deferred functionality to bind render() so it runs
					// after BOTH models have been fetched
					// $.when(this.options.model1.fetch(),this.options.model2.fetch())
					$.when(this.profileCollection.fetch())
						.done(function () {
						console.log('STARTING rendering Listview.js');
						_thisView.render();
					});
					// this.profileCollection.fetch();
					// if(!isMobile.any()) this.profileCollectionLoaded();
					// this.profileCollection.fetch();
					// this.render();
				},
				render: function() {
					console.log('DOING render Listview.js called');
					// alert('rendering Listview.js');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, {});
					// $('#profiles').html('bla');
					this.$el.html(this._template);
					
					this.nestedView = new ProfileView({collection: this.profileCollection}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return Listview;

    }

);