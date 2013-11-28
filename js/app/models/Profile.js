// Profile.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
// define(["backbone"],

function($, Backbone, MobileRouter) {
//   function(Backbone) {

		var Profile = Backbone.Model.extend( {
			defaults: {
				src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg'
			},
			initialize: function(){
				// alert("var Profile initialized");
				// this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg'});
				/*
				if (isMobile.any()) {
					alert('location.hostname ' + location.hostname);
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) { 
						// profilePicture.src = fs.root.fullPath + "/logo.png";
						// fs.root.fullPath + "/logo.png"
						if (checkFileExists(profilePicture.src)) {
							alert('existing: '+fs.root.fullPath + '/logo.png'); // File Exists
							this.set({src: fs.root.fullPath + '/logo.png'});
						} else {
							alert('is not existing: ' + fs.root.fullPath + '/logo.png'); //  File Does Not Exist
							this.set({src: 'data/profilepictures/default.png'});
						}
					});
				}
				else {
					this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg'});
				}
				*/
				this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg'});
			}
		} );
		
		// var profilePicture = {}; // new Object();
				
		// Profile.title = 'foo';
		// var amodel = new Profile();
		// amodel.set({title: 'Stewie Griffin'});
		
		
		// var profile = new Profile();

		// alert(Profile.title);
		
        return Profile;

    }

);
