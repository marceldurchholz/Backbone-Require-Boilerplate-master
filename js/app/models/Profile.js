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
				src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/default.jpg'
			},
			initialize: function() {
				// this.bind("change", this.changeHandler);
				if (isMobile.any()) {
					$.when(dd, jqd).done(function populateProfilePicture() {
						// alert(window.location.hash);
						// location.href.replace(location.hash,"")
						// var bla = window.location.href.split(/[/]/)[1];
						// var bla = window.location.href.split('/').pop();
						// alert(bla);
						// var rootPath = window.location.href.split(location.search||location.hash||/[?#]/)[0];
						// rootPath = rootPath.replace(/index.html/g, ""); // window.location.href;
						var rootPath = document.location.href.replace(window.location.href.split('/').pop(), ""); // window.location.href;
						// var rbPath = replace("index","bla");
						alert(rootPath);
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
							profilePicture.src = fs.root.fullPath + "/photoshot.png";
							// fs.root.fullPath + "/photoshot.png"
							alert('xyz: '+fs.root.fullPath + '/photoshot.png');
							if (checkFileExists(profilePicture.src)) {							
								alert('existing: '+fs.root.fullPath + '/photoshot.png'); // File Exists
								this.set({src: fs.root.fullPath + '/photoshot.png'});
							} else {
								alert('is not existing: ' + fs.root.fullPath + '/photoshot.png'); //  File Does Not Exist
								var setto = rootPath+'data/profilepictures/default.png';
								// this.set({src: 'data/profilepictures/default.png'});
								alert('setto: ' + setto);
								this.set({src: setto});
							}
						});
					});
				}
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
        // this.set({ src: 'file:///D:/cordova/Backbone-Require-Boilerplate-master/public/data/profilepictures/mdurchholz.jpg', id: '100000853413637' });
		
		return Profile;

    }

);
