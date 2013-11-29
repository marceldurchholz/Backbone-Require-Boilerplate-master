// View.js
// -------
define(["jquery", "backbone", "models/Profile", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, Profile, template, sidebar){
		
        var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {
				
				this.profileData = new Profile();
			    // this.listenTo(this.profileData, 'change', this.render);
				// this.profileData.bind('change', this.render, this);
				this.profileData.bind("change", this.changeHandler);
				
                this.render();

            },
			
		    changeHandler: function(val) {
				// this.render();
				// this.profileData.set({ src: 'Enter color value' });
				alert('model has changed in view');
			},
			
            alertHandler: function() {
				alert('alertHandler');
            },

            events: {
				'click .login': 'login'
            },
			
			login: function () {
				$(document).trigger('login');
				return false;
			},

            render: function() {
			
				this.profileData.set({ src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg', id: '100000853413637' });
				// this.profileData.set({ id: '100000853413637' });
				
				
				// alert('2');
				// $('#body').trigger('create');
				
				// sidebar
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				$('#sidebar').html(sidebar);
				// Maintains chainability
				
				$('.scrollable').pullToRefresh({
					callback: function() {
						var def = $.Deferred();
						
						setTimeout(function() {
							def.resolve();      
						}, 3000); 

						return def.promise();
					}
				});
				
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});
				template = _.template(template, {src: this.profileData.attributes.src, id: this.profileData.attributes.id, lastname: this.profileData.attributes.last_name}, {variable: 'profileData'});
				
                // Dynamically updates the UI with the view's template
                // this.$el.html(this.template);
				$('#page-content').html(template);

				// this.$el.trigger('create');
				$('#body').trigger('create');

                return this;

            }

        });

        return View;

    }

);