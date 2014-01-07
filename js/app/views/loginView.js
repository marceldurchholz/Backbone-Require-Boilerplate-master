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
					var _thisView = this;
					// var _thisView = this;
					// this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin();});
				},
				sendLogin: function(targetUrl) {
					_thisView = this;
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
								// location.href = "/welcome.html";
								// alert('login ok');
								// _thisView.changePage(DashboardView);
								// document.location.hash = "dashboard";
								system.redirectToUrl(targetUrl);
								$('.ui-header').show();
							}
						}
					});
				},
				sendRegister: function() {
					_thisView = this;
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
									_thisView.sendLogin('#myprofile');
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
					this.$el.hide();
					this.render();
				},
				initialize: function() {
					// this._videosCollection = new videosCollection();
					// var me = me || {}; dpd.users.me(function(user) { if (user) { _thisView.me = user; _thisView._usersCollection = new usersCollection([], {dbid:_thisView.me.id}); _thisView.fetch(); } else { location.href = "#noaccess"; } });
					var _thisView = this;
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(){_thisView.sendLogin('#dashboard');});
					this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(){_thisView.sendRegister();});
					this.fetch();
				},
				render: function() {
					// this.bindEvents();
					console.log('DOING render Videos.js called');
					_thisViewLogin = this;
					
					$('.ui-header').hide();
					
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