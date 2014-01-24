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
							obj.username = 'hmustermann';
							obj.password = 'mypass';
							var url = 'http://management-consulting.marcel-durchholz.de/secure/sendauthmail.php';
							var term = 'hmustermann';
							
							var request = $.ajax({
							  url: url,
							  type: "POST",
							  data: { data : 'mydata' }
							});							 
							request.done(function( msg ) {
							  // $( "#log" ).html( msg );
							  alert(msg);
							});
							request.fail(function( jqXHR, textStatus ) {
							  alert( "Request failed: " + textStatus );
							});
							
							/*
							$.ajax({
								type: "POST",
								url: url,
								data: { name: "John", location: "Boston" },
								cache: false
							success: function(response) { 
								alert(response);
							},
							error: function(response) {
								console.log(response.status + " " + response.statusText);
							},
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