// View.js
// -------
define(["jquery", "backbone", "underscore", "models/Model", "text!templates/photoview.html", "text!templates/view.html", "text!templates/sidebar.html"],

    function($, Backbone, _, Model, photoTemplate, template, sidebar){

        var View = Backbone.View.extend({

            el: "#page-content",

            initialize: function() {

				// _.bindAll(this, 'render');
				
				this.profilePictureModel = new Model;
				// var keys = Object.keys(this.collection);
				/*
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						alert(key);
						alert(obj.key);
						// useful code here
					}
				}
				*/
				/*
				this.collection = new Model;
				_.bindAll(this, "render");
				this.collection.bind( "reset", this.render );
				*/
				
                this.render();

            },
			
            events: {
				
            },

            render: function( collection ) {

				// alert('bla');
				
				// var compiled_template = _.template(photoTemplate);
				//// var collection = this.collection;
				// var $el = $(this.el);
				
				// var model = new Model;

				// mobileSearch.utils.loadPrompt( "Loading photo..." );
				// $( '#photo .ui-title' ).html( 'Photo view' );
				/*
				var mytext = '',
				mytext = compiled_template( { results: collection.models } );
				alert(mytext);
				*/
				// var collection = this.collection;
				// alert(collection.title);
				// $('#page-content').html('sss');

				/*
				setTimeout( function() {
					$('photo').listview('refresh');
				}, 0 );
				*/
				
				// results: collection.models
				// alert(this.collection);
				var profilePicture = this.profilePictureModel.attributes;
				// alert(profilePicture.src);
				// alert(profilePicture.src);
				
				// sidebar
                this.sidebar = _.template(sidebar, {});
				// Append the result to the view's element.
				// alert(sidebar);
				$('.sidebar').html(sidebar);
				// Maintains chainability
				
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});
				// this.template = _.template(template, { profilePicture_src: profilePicture.src });
				// Dynamically updates the UI with the view's template
                // this.$el.html(this.template);
				// this.template = _.template(template, {src: 'ououou'}, {variable: 'profilePicture'});
				// this.template = _.template(template);
                
				template = _.template(template, {src: profilePicture.src}, {variable: 'profilePicture'});
				
				// alert(this.template);
				$('#page-content').html(template);

				// this.$el.trigger('create');
				$('#body').trigger('create');
				
                return this;

            }

        });

        return View;

    }

);