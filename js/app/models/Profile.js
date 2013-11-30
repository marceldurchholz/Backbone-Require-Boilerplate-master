// Profile.js
// --------
define(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],
// define(["backbone"],

function($, Backbone, MobileRouter) {
//   function(Backbone) {

		var Profile = Backbone.Model.extend( {
			defaults: {
				id: '',
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				src: 'data/profilepictures/default.jpg'
			},
			
			/*
			getProfilePicture: function(t,P) {
				if (!isMobile.any()) {
					var fs = {
						root: {
							fs: ''
						}
					};
					fs.root.fullPath = 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures';
					// var _Profile = this.Profile;
					// alert(fs.root.fullPath);
					this.set( {src: fs.root.fullPath + "/default.jpg"} );
					alert(this.get('src'));
					// alert(fs.root.fullPath);
				}
				else {
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
						alert('file system inited: ' + fs.root.fullPath);
						// profilePicture.src = fs.root.fullPath + "/photoshot.jpg";
						// this.set( {src: fs.root.fullPath + "/photoshot.jpg"} );
						// fs.root.fullPath + "/photoshot.jpg"
						// alert('xyz: '+fs.root.fullPath + '/photoshot.jpg');
						if (checkFileExists(fs.root.fullPath + "/photoshot.jpg")) {							
							alert('existing: '+fs.root.fullPath + '/photoshot.jpg'); // File Exists
							this.set( {src: fs.root.fullPath + "/photoshot.jpg"} );
						} else {
							alert('is not existing: ' + fs.root.fullPath + '/photoshot.jpg'); //  File Does Not Exist
							// var setto = rootPath+'data/profilepictures/default.jpg';
							var setto = 'data/profilepictures/mdurchholz.jpg';
							// this.set({src: 'data/profilepictures/default.jpg'});
							alert('setto: ' + setto);
							this.set({src: setto});
						}
					});
				}
			},
			*/
			
			initialize: function() {


				// this.bind("change", this.changeHandler);				
				// $.when(dd, jqd).done(this.getProfilePicture(this,Profile));

				/*
				else {
					this.set({
						src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg', 
						first_name: 'Franz', 
						last_name: 'Mustermann'
					});
				}
				*/
				
				/*
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
					
				
				}
				else {
					this.set({src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg'});
				}
				*/
				
			},
			changeHandler : function(event){
				// console.log('Model have been changed:', this.toJSON());
				alert('model changed');
			}
		});
        // this.set({ src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg', id: '' });
		
		return Profile;

    }

);
