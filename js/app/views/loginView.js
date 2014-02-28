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
					var username = $('#username').val().toLowerCase();
					var password = $('#password').val();
					if (checkEmail(username)!=true || password=='') {
						doAlert('Bitte überprüfen Sie die eingegebenen Daten.','Eingaben unvollständig oder nicht korrekt!');
						return(false);
					}
					dpd.users.login({username: username, password: password}, function(user, error) {
						if (error) {
							// doAlert('not logging in');
							// return(false);
							console.log(error.message);
							doAlert('Eine Anmeldung mit diesen Zugangsdaten konnte nicht durchgeführt werden. Zur Registrierung klicken Sie auf "Neuen Zugang anlegen".','Fehler bei der Anmeldung!');
						} else {
							// doAlert('logging in');
							console.log(user);
							if (user==null) { 
								doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Anmeldung!');
								return(false);
								// alert('user =  null');
							}
							else {
								dpd.users.me(function(me) {
									_thisViewLogin.me = me;
									$('#showMenu').show();
									$('#showPageOptionsIcon').show();
									var newlogincount = 0;
									var logincount = _thisViewLogin.me.logincount;
									if (logincount==undefined) logincount=0;
									var newlogincount = logincount+1;
									dpd.users.put(_thisViewLogin.me.id, {"logincount":newlogincount}, function(result, err) { 
										if(err) return console.log(err);
										// console.log(result, result.id);
										if (isMobile.any()) {
											this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
											this.db.transaction(
												function(tx) {
													// sample data 
													// alert('saving into table users START');
													var query = "INSERT OR REPLACE INTO users (username,password) VALUES ('"+username+"','"+password+"')"; 
													alert(query);
													tx.executeSql(query);
													alert('saving into table users ENDE');
												},
												function() {
													alert('ERROR ON entry saving in TABLE users');
												},
												function() {
													alert('Entry successfully saved in TABLE users');
													system.redirectToUrl(targetUrl);
													// alert('Table users successfully FILLED WITH SAMPLES in local SQLite database');
													// callback();
												}
											);
										}
										else {
											system.redirectToUrl(targetUrl);
										}
									});
								});
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
					var username = $('#username').val().toLowerCase();
					var password = $('#password').val();
					var giftcode = $('#giftcodeInput').val();
					// alert(giftcode);
					var uid = '';
					if (username!='' && password!='') {
						console.log(username);
						console.log(checkEmail(username));
						if (checkEmail(username)==true) {
							// var roles = ["provider","seeker"];
							var roles = ["user"];
							var registered = dateYmdHis();
							// active: false, 
							
							// var ownerid = ""; // df8a74e899bba811

							$.ajax({
								url: 'http://dominik-lohmann.de:5000/users/?roles=owner',
								async: false,
								success: function(ownerdata, textStatus, XMLHttpRequest){
									_thisViewLogin.ownerdata = ownerdata[0];
									_thisViewLogin.ownerid = ownerdata.id;
									console.log(ownerdata);
								},
								error:function (xhr, ajaxOptions, thrownError){
									doAlert('owner konnte nicht gefunden werden');
									// alert(xhr.status);
									// alert(xhr.statusText);
									// alert(xhr.responseText);
								}
							});
							// alert(_thisViewLogin.ownerdata.id);
							var sponsor = _thisViewLogin.ownerdata.id;
							
							if (giftcode!='') sponsor = giftcode.replace('-','').toLowerCase();
							dpd.users.post({username: username, password: password, sponsor: sponsor, roles: roles, registered: registered, credits: "0", purchases:[], followers:[], following:[], logincount:"0"}, function(user, err) {
								// console.log(user.id);
								if (user==null) {
									if(err) {
										doAlert('Es ist leider ein Fehler bei der Registrierung aufgetreten!','Ups...');
										return console.log(err);
									}
								}
								// var uid = user.id;
								/*
								{
									console.log(err);
									alert(err.errors);
									if (err=='{"errors":{"username":"is already in use"},"status":400}') {
										doAlert('Benutzername in Verwendung!','Mhhh..');
									}
									// return console.log(err);
									// console.log(error.message);
									// doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Registrierung!');
									// return(false);
								}
								*/ 
								// else {
								
									var obj = new Object();
									obj.username = user.username;
									obj.password = user.password;
									// alert(user.sponsor);
									// alert(giftcode);
									obj.giftcode = giftcode;
									obj.uid = user.id;
									var url = 'http://prelaunch002.appinaut.de/secure/external/sendauthmail.php';							
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

									$.ajax({
										type: "POST",
										url: url,
										data: obj,
										cache: false,
										success: function(response) { 
											// alert(response);
											// doAlert('Die Registrierung war erfolgreich. Bitte vervollständige Dein Profil und bestätige Deine E-Mail-Adresse.','Herzlich Willkommen!');
											_thisViewLogin.sendLogin('#myprofile');
										},
										error: function(response) {
											console.log(response.status + " " + response.statusText);
											doAlert('Die Registrierung konnte leider nicht durchgeführt werden.','Ups! Entschuldigung.');
										},
									});
								// }
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
					_thisViewLogin = this;
					if (isMobile.any()) {
						try {
							this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
							this.db.transaction (
								function(tx) {
									var query = "SELECT username, password FROM users";
									alert(query);
									tx.executeSql(query, 
										function() {
											alert('ERROR ON SELECT videourl');
										},
										function(tx, results) {
											alert('getting len');
											var len = results.rows.length, users = [], i = 0;
											for (i=0; i < len; i = i + 1) {
												alert("setting " + i);
												users[i] = results.rows.item(i);
											}
											alert(len + ' rows found');
											// alert(users);
											// alert(users.toJSON);
											// for (var i = 0; i < l; i++) {
											// e = users[i];
											alert(users);
											alert(users[i].username);
											_thisViewLogin.username = users[i].username;
											_thisViewLogin.password = users[i].password;
											_thisViewLogin.render();
											// callback(users);
										}
									);
								}
							);
						} catch (e) {
							// alert(e);
							// console.log(e);
						}
					}
					else {
						_thisViewLogin.username = "";
						_thisViewLogin.password = "";
						_thisViewLogin.render();
					}
				},
				initialize: function() {
					var _thisViewLogin = this;
					this.$el.hide();
					showModal();
					this.fetch();
				},
				toggleGiftcodeInput: function() {
					$('#giftcodeDiv').hide();
					$("#giftcodeDiv").fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
				},
				bindEvents: function() {
					var _thisViewLogin = this;
					$('#showMenu').hide();
					$('#showPageOptionsIcon').hide();
					$('#giftcodeDiv').toggle();
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(event){event.preventDefault();_thisViewLogin.sendLogin('#dashboard');});
					this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(event){event.preventDefault();_thisViewLogin.sendRegister();});
					this.$el.off('click','#giftcode').on('click','#giftcode',function(event){event.preventDefault();_thisViewLogin.toggleGiftcodeInput();});
					$('#username').val(_thisViewLogin.username);
					$('#password').val(_thisViewLogin.password);
					if (system.contentHelper==1) {
						$('#password').val('blafoo');
						$('#username').val('info@digitalverve.de');
					}
					if (system.contentHelper==2) {
						$('#password').val('blafoo');
						$('#username').val('test@digitalverve.de');
					}
				},
				render: function() {
					console.log('DOING render Videos.js called');
					_thisViewLogin = this;
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewLogin.nestedView = new SidemenuView().fetch();
					_thisViewLogin.$el.html(_.template(loginPage, {}));
					hideModal();
					new FastClick(document.body);
					this.$el.trigger('create');
					elementResizeByScreenHeight();
					fontResize();
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
					});
					this.bindEvents();
					return this;
				}

			});

        return loginView;

    }

);