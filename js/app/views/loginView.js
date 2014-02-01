// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, loginPage){
		
			var loginView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				sendLogin: function(targetUrl) {
					_thisViewLogin = this;
					var username = $('#username').val();
					var password = $('#password').val();
					dpd.users.login({username: username, password: password}, function(user, error) {
						if (error) {
							// doAlert('not logging in');
							// return(false);
							console.log(error.message);
							doAlert('Eine Anmeldung mit diesen Zugangsdaten konnte nicht durchgeführt werden.','Fehler bei der Anmeldung!');
						} else {
							// doAlert('logging in');
							console.log(user);
							if (user==null) { 
								doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Anmeldung!');
								return(false);
								// alert('user =  null');
							}
							else {
								$('#showMenu').show();
								$('#showPageOptions').show();
								system.redirectToUrl(targetUrl);
							}
						}
					});
				},
				sendAuthMail: function() {
					_thisViewLogin = this;
					
					/*
					$.post( url, {
						s: obj, 
						async: false
					}).done(function( data ) {
						// var content = $( data ).find( "#content" );
						// $( "#result" ).empty().append( content );
						alert('post done');
						_thisViewLogin.sendLogin('#myprofile');
					});
					/*
					$.ajax({
						url: "http://management-consulting.marcel-durchholz.de/secure/sendAuthMail.php",
						async: false
					}).done(function(responsedata) {
						// $( this ).addClass( "done" );
						console.log(responsedata);
						// _thisViewCardDetails.uploaderdata = uploaderdata;
						// alert();
						_thisViewLogin.sendLogin('#myprofile');
					});
					*/
				},
				sendRegister: function() {
					_thisViewLogin = this;
					var username = $('#username').val();
					var password = $('#password').val();
					if (username!='' && password!='') {
						console.log(username);
						console.log(checkEmail(username));
						if (checkEmail(username)==true) {
							// var roles = ["provider","seeker"];
							var roles = ["user"];
							var registered = new Date();
							// active: false, 
							
							var obj = new Object();
							obj.username = username;
							obj.password = password;
							var url = 'http://management-consulting.marcel-durchholz.de/secure/sendauthmail.php';
							var sponsor = 'df8a74e899bba811';
							
							var request = $.ajax({
							  url: url,
							  type: "POST",
							  data: { data : 'mydata' }
							});
							request.done(function( msg ) {
								// $( "#log" ).html( msg );
								// alert(msg);
								if (msg=="1") {							  
									$.ajax({
										type: "POST",
										url: url,
										data: obj,
										cache: false,
										success: function(response) { 
											// alert(response);
											dpd.users.post({username: username, password: password, sponsor: sponsor, roles: roles, registered: registered}, function(user, error) {
												if (error) {
													console.log(error.message);
													doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Registrierung!');
													return(false);
												} 
												else {
													doAlert('Deine Registrierung war erfolgreich. Bitte bestätige die Benachrichtigung im Postfach Deiner angegeben E-Mail-Adresse.','Herzlich Willkommen!');
													_thisViewLogin.sendLogin('#myprofile');
													// _thisViewLogin.sendLogin('#myprofile');
													// var regData = {username: username, password: password, roles: roles, registered: registered};
													// _thisViewLogin.sendAuthMail();
												}
											});
										},
										error: function(response) {
											console.log(response.status + " " + response.statusText);
											doAlert('Die Registrierungsbenachrichtigung konnte nicht versendet werden.','Ups! Entschuldigung.');
										},
									});
								} else {
									doAlert('Die Übermittlung der Registrierung war leider nicht erfolgreich.','Ups! Entschuldung.');
								}
							});
							request.fail(function( jqXHR, textStatus ) {
							  doAlert( "Das hätte nicht passieren sollen. Es ist ein unbekannter Fehler aufgetreten. Probiere es später bitte erneut.", "Ups! Entschuldigung." );
							  // doAlert( "Request failed: " + textStatus );
							});
							
							/*
							dpd.users.post({username: username, password: password, roles: roles, registered: registered}, function(user, error) {
								if (error) {
									console.log(error.message);
									doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Registrierung!');
								} else {
									// var regData = {username: username, password: password, roles: roles, registered: registered};
									// _thisViewLogin.sendAuthMail();
								}
							});
							*/
						}
						else {
							doAlert('Bitte geben Sie als Benutzernamen Ihre gültige E-Mail-Adresse ein.','Fehlerhafter Benutzername!');
						}
					} else {
						doAlert('Bitte geben Sie einen Benutzernamen und ein Passwort für Ihren APPinaut Zugang ein.','Eingabe überprüfen!');
					}
				},
				sync: function() {
				},
				fetch: function() {
					this.render();
				},
				initialize: function() {
					var _thisViewLogin = this;
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisViewLogin.sendLogin('#dashboard');});
					this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(){_thisViewLogin.sendRegister();});
					this.fetch();
				},
				bindEvents: function() {
					var _thisViewLogin = this;
					$('#showMenu').hide();
					$('#showPageOptions').hide();
				},
				render: function() {
					console.log('DOING render Videos.js called');
					_thisViewLogin = this;
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewLogin.nestedView = new SidemenuView().fetch();
					_thisViewLogin.$el.html(_.template(loginPage, {}));
					this.$el.trigger('create');
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					this.bindEvents();
					return this;
				}

			});

        return loginView;

    }

);