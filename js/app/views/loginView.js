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
					var giftcode = $('#giftcode').val();
					if (username!='' && password!='') {
						console.log(username);
						console.log(checkEmail(username));
						if (checkEmail(username)==true) {
							// var roles = ["provider","seeker"];
							var roles = ["user"];
							var registered = dateYmdHis();
							// active: false, 
							
							var obj = new Object();
							obj.username = username;
							obj.password = password;
							obj.giftcode = giftcode;
							var url = 'http://management-consulting.marcel-durchholz.de/secure/sendauthmail.php';
							
							/*
							this._sponsorData = new Object();
							$.ajax('http://dominik-lohmann.de:5000/users/?giftcode='+giftcode,{
								type:"GET",
								async: false,
							}).done(function(sponsorData) {
								// doAlert( "DONE!" );
								_sponsorData = sponsorData;
								// console.log('_me.purchases actual');
								// console.log(_me.purchases);
							}).fail(function() {
								doAlert( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." );
							})
							.always(function() {
								// alert( "finished - nw redirecting" );
							});
							var sponsor = sponsorData.id; // 'df8a74e899bba811';
							*/
							
							var sponsor = "";
							if (giftcode!='') sponsor = giftcode.replace('-','');;
							
							
							dpd.users.post({username: username, password: password, sponsor: sponsor, roles: roles, registered: registered, credits: "0"}, function(user, error) {
								if (error) {
									console.log(error.message);
									doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Registrierung!');
									return(false);
								} 
								else {
								
								

									$.ajax({
										type: "POST",
										url: url,
										data: obj,
										cache: false,
										success: function(response) { 
											// alert(response);
											doAlert('Deine Registrierung war erfolgreich. Bitte bestätige die Benachrichtigung im Postfach Deiner angegeben E-Mail-Adresse.','Herzlich Willkommen!');
											_thisViewLogin.sendLogin('#myprofile');
										},
										error: function(response) {
											console.log(response.status + " " + response.statusText);
											doAlert('Die Registrierung konnte leider nicht durchgeführt werden.','Ups! Entschuldigung.');
										},
									});
								
								
								}
							});
							
							
							


							

							
						}
						else {
							doAlert('Bitte geben Sie Ihre gültige E-Mail-Adresse im Feld Benutzername ein.','Ungültiger Benutzername!');
						}
					} else {
						doAlert('Bitte geben Sie für einen neuen Zugang Ihre gültige E-Mail-Adresse und Ihr gewünschtes Passwort ein.','Registrierung unvollständig');
					}
					
					
					
				},
				sync: function() {
				},
				fetch: function() {
					this.render();
				},
				initialize: function() {
					var _thisViewLogin = this;
					this.fetch();
				},
				toggleGiftcodeInput: function() {
					$('#giftcodeInput').hide();
					$("#giftcodeInput").fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
				},
				bindEvents: function() {
					var _thisViewLogin = this;
					$('#showMenu').hide();
					$('#showPageOptions').hide();
					$('#giftcodeInput').toggle();
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(event){event.preventDefault();_thisViewLogin.sendLogin('#dashboard');});
					this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(event){event.preventDefault();_thisViewLogin.sendRegister();});
					this.$el.off('click','#giftcode').on('click','#giftcode',function(event){event.preventDefault();_thisViewLogin.toggleGiftcodeInput();});
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