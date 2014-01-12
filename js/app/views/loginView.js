// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, loginPage){
		
			var loginView = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				events: {
				},
				bindEvents: function() {
					var _thisViewLogin = this;
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
								system.redirectToUrl(targetUrl);
							}
						}
					});
				},
				sendRegister: function() {
					_thisViewLogin = this;
					var username = $('#username').val();
					var password = $('#password').val();
					if (username!='' && password!='') {
						console.log(username);
						console.log(checkEmail(username));
						if (checkEmail(username)==true) {
							var roles = ["provider","seeker"];
							// var roles = ["user"];
							var registered = new Date();
							dpd.users.post({username: username, password: password, roles: roles, registered: registered}, function(user, error) {
								if (error) {
									console.log(error.message);
									doAlert('Bitte versuchen Sie es erneut.','Fehler bei der Registrierung!');
								} else {
									_thisViewLogin.sendLogin('#myprofile');
								}
							});
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
				render: function() {
					this.bindEvents();
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
					return this;
				}

			});

        return loginView;

    }

);