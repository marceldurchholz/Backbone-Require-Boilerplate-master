// loginView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/loginPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, loginPage){
		
			var loginView = Backbone.View.extend({
			
				el: "#page-content",
				// collection: new Backbone.LocalStorage("loginStorage"),
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
							doAlert('Eine Anmeldung mit diesen Zugangsdaten konnte nicht durchgeführt werden. Zur Registrierung klicken Sie auf "Neuen Zugang anlegen".','Fehler bei der Anmeldung!');
						} else {
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
										if(err) { }
										system.redirectToUrl(targetUrl);
									});
								});
							}
						}
					});
				},
				sendRegister: function() {
					_thisViewLogin = this;
					var username = $('#username').val().toLowerCase();
					var password = $('#password').val();
					var giftcode = $('#giftcodeInput').val();
					var uid = '';
					var sponsor = '';
					if (username!='' && password!='') {
						if (checkEmail(username)==true) {
							var roles = ["user"];
							var registered = dateYmdHis();
							$.ajax({
								url: 'http://dominik-lohmann.de:5000/users/?roles=owner',
								async: false,
								success: function(sponsor, textStatus, XMLHttpRequest){
									// _thisViewLogin.ownerdata = ownerdata[0];
									// _thisViewLogin.ownerid = ownerdata.id;
									_thisViewLogin.sponsor = _thisViewLogin.sponsor;
								},
								error:function (xhr, ajaxOptions, thrownError) { }
							});
							
							if (giftcode!='') sponsor = giftcode.replace('-','').toLowerCase();
							dpd.users.post({username: username, password: password, sponsor: sponsor.id, roles: roles, registered: registered, credits: "0", purchases:[], followers:[], following:[], logincount:"0"}, function(user, err) {
								if (user==null) {
									if(err) {
										doAlert('Es ist leider ein Fehler bei der Registrierung aufgetreten!','Ups...');
										return { }
									}
								}
								_thisViewLogin.sendLogin('#myprofile');
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
				initialize: function() {
					var _thisViewLogin = this;
					showModal();
					this.$el.hide();
					_thisViewLogin.fetch();
				},
				fetch: function() {
					_thisViewLogin = this;
					_thisViewLogin.username = "";
					_thisViewLogin.password = "";
					_thisViewLogin.render();
				},
				toggleGiftcodeInput: function() {
					$('#giftcodeDiv').hide();
					$("#giftcodeDiv").fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
				},
				bindEvents: function() {
					var _thisViewLogin = this;
					$('#body').off( "swiperight", "#page-content");
					$('#showMenu').hide();
					$('#showPageOptionsIcon').hide();
					$('#giftcodeDiv').toggle();
					this.$el.off('click','.sendLoginBtn').on('click','.sendLoginBtn',function(event){event.preventDefault();_thisViewLogin.sendLogin('#dashboard');});
					this.$el.off('click','.sendRegisterBtn').on('click','.sendRegisterBtn',function(event){event.preventDefault();_thisViewLogin.sendRegister();});
					this.$el.off('click','#giftcode').on('click','#giftcode',function(event){event.preventDefault();_thisViewLogin.toggleGiftcodeInput();});
					$('#username').val(_thisViewLogin.username);
					$('#password').val(_thisViewLogin.password);
					if (system.contentHelper==1) {
						$('#username').val('info@digitalverve.de');
					}
					if (system.contentHelper==2) {
						$('#username').val('test@digitalverve.de');
					}
				},
				render: function() {
					_thisViewLogin = this;
					_thisViewLogin.$el.html(_.template(loginPage, {}));
					// window.createVideoPreview(_thisViewLogin.$('#video_player_1'),'video_player_1',"promo",0);
					this.$el.trigger('create');
					// hideModal();
					this.$el.fadeIn( 500, function() {
						new FastClick(document.body);
					});
					this.bindEvents();
					return this;
				}

			});

        return loginView;

    }

);