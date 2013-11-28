// Model.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
// define(["backbone"],

function($, Backbone, MobileRouter) {
//   function(Backbone) {

		/*
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
			imagePath = fs.root.fullPath + "/logo.png"; // full file path
			alert(imagePath);
			// document.getElementById('camera_image_b').src = imagePath;
		});
		*/
		
		var Model = Backbone.Model.extend( {
		
			defaults: {
				src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/Documents/profilepictures/default.jpg'
			},
			initialize: function(){
				// alert("var Model initialized");
				this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/Documents/profilepictures/mdurchholz.jpg'});
			}
		
		} );
		
		// Model.title = 'foo';
		// var amodel = new Model();
		// amodel.set({title: 'Stewie Griffin'});
		
		
		// var model = new Model();

		// alert(Model.title);
		
        return Model;

    }

);
