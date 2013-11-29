// Profile.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
// define(["backbone"],

function($, Backbone, MobileRouter) {
//   function(Backbone) {

		var Profile = Backbone.Model.extend( {
			defaults: {
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg'
			},
			initialize: function() {
				
				// this.bind("change", this.changeHandler);
				
				if (isMobile.any()) {
				
					alert('downloading file');
					function downloadFile(){
						window.requestFileSystem(
									 LocalFileSystem.PERSISTENT, 0, 
									 function onFileSystemSuccess(fileSystem) {
									 fileSystem.root.getFile(
												 "dummy.html", {create: true, exclusive: false}, 
												 function gotFileEntry(fileEntry){
												 var sPath = fileEntry.fullPath.replace("dummy.html","");
												 var fileTransfer = new FileTransfer();
												 fileEntry.remove();
												 fileTransfer.download(
														   "http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",
														   sPath + "theFile.pdf",
														   function(theFile) {
															   alert("download complete: " + theFile.toURI());
															   // console.log("download complete: " + theFile.toURI());
															   // showLink(theFile.toURI());
														   },
														   function(error) {
															   console.log("download error source " + error.source);
															   console.log("download error target " + error.target);
															   console.log("upload error code: " + error.code);
														   }
														   );
												 }, 
												 fail);
									 }, 
									 fail);
				 
					}
	
					alert('window.location.href ' + window.location.href);
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) { 
						profilePicture.src = fs.root.fullPath + "/logo.png";
						// fs.root.fullPath + "/logo.png"
						alert('xyz: '+fs.root.fullPath + '/logo.png');
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
					this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg'});
				}
				
			},
			changeHandler : function(event){
				// console.log('Model have been changed:', this.toJSON());
				alert('model changed');
			}
		} );
		
        return Profile;

    }

);
