// Listview.js
// -------
define(["jquery", "backbone", "models/Profile", "models/System", "collections/ProfileList", "views/ProfileView", "text!templates/view.html", "text!templates/listview.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, System, ProfileList, ProfileView, template, listview, sidebar){
		
			var Listview = Backbone.View.extend({

				el: "#page-content",
				attributes: {"data-role": 'content'},
				initialize: function() {
					if (isMobile.any()) {
						dao.initialize(function() {
							alert('inner dao.initialize');
							renderList();
						});
					}
					alert('outer dao.initialize');
					var myCollection = new ProfileList();
					this.myCollection = myCollection;
					this.myCollection.bind('sync',this.myCollectionLoaded, this);
					this.myCollection.fetch();
					if(!isMobile.any()) this.myCollectionLoaded();
					// this.myCollection.fetch();
					// this.render();
				},
				myCollectionLoaded: function(e){
					alert('myCollectionLoaded');
					console.log('***** myCollectionLoaded called: ' + JSON.stringify(e));
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
					alert('rendering Listview.js');
					
					this.sidebar = _.template(sidebar, {});
					$('#sidebar').html(sidebar);
					
					this._template = _.template(listview, {});
					// $('#profiles').html('bla');
					this.$el.html(this._template);
					
					this.nestedView = new ProfileView({collection: this.myCollection}).render();

					this.$el.trigger('create');
					return this;
				}

			});

        return Listview;

    }

);