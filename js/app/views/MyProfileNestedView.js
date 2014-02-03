// MyProfileNestedView.js
// -------
define(["jquery", "backbone", "text!templates/MyProfileNestedViewPage.html"],

    function($, Backbone, MyProfileNestedViewPage){
		
		var MyProfileNestedView = Backbone.View.extend({
			el: "#MyProfileNestedViewDiv",
			initialize: function() {
				var _thisViewMyProfileNested = this;
				console.log('initializing MyProfileNestedView.js');
				$.ajax({
					url: "http://dominik-lohmann.de:5000/interests",
					async: false
				}).done(function(responsedata) {
					_thisViewMyProfileNested.interests = responsedata;
					_thisViewMyProfileNested.initializeme();
				});
			},
			initializeme: function() {
				console.log('initializeme MyProfileNestedView.js');
				var _thisViewMyProfileNested = this;
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					console.log(status);
					_thisViewMyProfileNested.me = status;
					_thisViewMyProfileNested.render();
					if (_thisViewMyProfileNested.me.active==false || $("#fullname").val()=='') {
						doAlert('Um alle Funktionen des APPinaut nutzen zu können, vervollständigen Sie bitte Ihr Profil und bestätigen Sie dies über den Link der Ihnen zugesendeten E-Mail.','Bestätigung erforderlich');
					}
					_thisViewMyProfileNested.checkActiveStatus();
				  },
				  function( status ) {
					// console.log( status + ", you fail this time" );
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewMyProfileNested.dfd.state() === "pending" ) {
						_thisViewMyProfileNested.dfd.notify( "working... " );
						setTimeout( _thisViewMyProfileNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewMyProfileNested = this;
				console.log('fetchMe MyProfileNestedView.js');
				_thisViewMyProfileNested.dfd = new jQuery.Deferred();
				_thisViewMyProfileNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewMyProfileNested.dfd.resolve(user);
						}, 0 );
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
				return this.dfd.promise();
			},
			fetch: function() {	
				_thisViewMyProfileNested = this;
				console.log('fetching MyProfileNestedView.js');
				this.$el.hide();
			},
			changeInputValue: function(e) {
				/*
				console.log(e);
				console.log(e.currentTarget.id);
				console.log(e.currentTarget.defaultValue);
				console.log(e.currentTarget.value);
				*/
				var obj = e.currentTarget;
				if (obj.defaultValue != obj.value) {
					console.log(_thisViewMyProfileNested.me.id);
					console.log(obj.id);
					if (obj.id=='username') {
						console.log(checkEmail(obj.value));
						if (checkEmail(obj.value)==true) { }
						else return false;
					}
					var o = new Object();
					o.id = obj.id;
					o.value = obj.value;
					var fullroles = ["provider","seeker"];
					if (obj.id=='fullname') if (obj.value!='') dpd.users.put(_thisViewMyProfileNested.me.id, {"fullname":obj.value, roles: fullroles}, function(result, err) { 
						if(err) return console.log(err); 
						console.log(result, result.id); 
						_thisViewMyProfileNested.me = result;
						if (_thisViewMyProfileNested.me.active==true) {
							console.log('active is true !!!');
							$('#showMenu').show();
							$('#showPageOptions').show();
							$('#restrictedArea').show();							
						}

					});
					if (obj.id=='slogan') dpd.users.put(_thisViewMyProfileNested.me.id, {"slogan":obj.value}, function(result, err) { if(err) return console.log(err); console.log(result, result.id); });
				}
			},
			checkActiveStatus: function() {
				dpd.users.me(function(me) {
					_thisViewMyProfileNested.me = me;
				});
				if (_thisViewMyProfileNested.me.active==false) {
					// doAlert('Um alle Funktionen des APPinaut nutzen zu können, bestätigen Sie bitte Ihre E-Mail-Adresse über den Link in der Ihnen zugestellten E-Mail.','E-Mail-Bestätigung erforderlich');
					console.log('active still false');
					window.clearTimeout(doid);
					var doid = window.setTimeout("_thisViewMyProfileNested.checkActiveStatus()", 10000);
					/*
					var confirmText = 'Möchten Sie diese jetzt bestätigen? Sie benötigen hierzu eine aktive Internetverbung.';
					var confirmTitle = 'E-Mail-Adresse noch nicht bestätigt';
					var confirmButtonLabels = 'Abbrechen,Bestätigen';
					doConfirm(confirmText, confirmTitle, _thisViewMyProfileNested.confirmMyEmail, confirmButtonLabels);
					*/
				}
				else {
					console.log('active is now TRUE !!!');
					$('#showMenu').show();
					$('#showPageOptions').show();
					$('#restrictedArea').show();							
				}
			},
			confirmMyEmail: function(response) {
				console.log(response);
				if (response==2) {
					// system.redirectToUrl('#logout');
					var vurl =  'http://prelaunch002.appinaut.de/secure/external/verify.php?v='+window.me.id;
					// doAlert('Sie werden nun zu folgender Internetdresse weitergeleitet: '+vurl,'Bestätigung/Weiterleitung');
					window.location.href = vurl;
				}
			},
			bindEvents: function() {
				var _thisViewMyProfileNested = this;
				$('#delaccuntarea').hide();
				$('#restrictedArea').hide();
				$('#showMenu').hide();
				$('#showPageOptions').hide();
				if (_thisViewMyProfileNested.me.active==true) {
					if ($("#fullname").val()!='') {
						$('#showMenu').show();
						$('#showPageOptions').show();
					}
				}
				
				$("#fullname").blur(this.changeInputValue);
				$("#slogan").blur(this.changeInputValue);
				// $("#username").blur(this.changeInputValue);
				$("input[type='checkbox']").bind( "change", function(event, ui) {
					event.preventDefault();
					console.log(event);
					console.log(event.delegateTarget);
					console.log(event.delegateTarget.id);
					console.log( $("label[for='"+ event.delegateTarget.id +"']").text() );
					console.log(event.delegateTarget.checked);
					var o = new Object();
					o.id = event.delegateTarget.id;
					if (event.delegateTarget.checked==false) o.status = "";
					else o.status = "checked";
					o.label = $("label[for='"+ event.delegateTarget.id +"']").text();					
					dpd.users.me(function(me) {
						// console.log(me);
						var exists = jQuery.inArray( $.trim(o.label), me.interests )
						// console.log(exists);
						if (event.delegateTarget.checked==false && exists>-1) dpd.users.put(_thisViewMyProfileNested.me.id, {"interests": {$pull:$.trim(o.label)}} );
						else if (event.delegateTarget.checked==true && exists==-1) dpd.users.put(_thisViewMyProfileNested.me.id, {"interests": {$push:$.trim(o.label)}} );
					});
				});
				
				this.$el.off('click','.purchasebtn').on('click','.purchasebtn',function(e){
					e.preventDefault();
					// console.log(e.delegateTarget);
					var iapid = $(this).attr('data-iapid');
					console.log("purchasing "+iapid);
					// window.storekit.purchase("com.digitalverve.APPinaut."+iapid,1);
					window.storekit.purchase(iapid,1);
					// window.storekit.purchase("com.digitalverve.APPinaut.250APP359T9", 1);
					// window.storekit.purchase("com.digitalverve.APPinaut.250APP359T9");
				});
				
				this.$el.off('click','#showdeletearea').on('click','#showdeletearea',function(e){
					e.preventDefault();
					$('#delaccuntarea').show();
				});
				this.$el.off('click','#deletemyaccountbtn').on('click','#deletemyaccountbtn',function(e){
					e.preventDefault();
					// _thisViewLogin.sendLogin('#dashboard');
					console.log('clicked');
					console.log(e);
					var confirmText = 'Wollen Sie Ihren Zugang wirklich unwiderruflich löschen?';
					var confirmTitle = 'Sind Sie sicher?';
					var confirmButtonLabels = 'Bitte löschen,Vorgang abbrechen';
					doConfirm(confirmText, confirmTitle, _thisViewMyProfileNested.deleteMyAccount, confirmButtonLabels);
				});
			},
			deleteMyAccount: function(response) {
				console.log(response);
				if (response==1) {
					doAlert('Das finden wir schade. Ihr Zugang wurde gelöscht. Schauen Sie gerne wieder einmal vorbei.','Auf Wiedersehen :-(');
					var deldate = new Date();
					var deletetedusername = 'DELETETED_'+deldate+'_'+_thisViewMyProfileNested.me.username;
					dpd.users.put(_thisViewMyProfileNested.me.id, {"username":deletetedusername,"deleted":true}, function(result, err) { 
						if(err) return console.log(err); 
						console.log(result, result.id); 
						system.redirectToUrl('#logout');
					});
				}
			},
			render: function() {
				var _thisViewMyProfileNested = this;
				console.log('rendering MyProfileNestedView.js');
				var htmlContent = '';
				$(this.el).html(htmlContent);
				console.log(_thisViewMyProfileNested.me);
				if (!_thisViewMyProfileNested.me.coins) _thisViewMyProfileNested.me.coins = "0";

				htmlContent = _.template(MyProfileNestedViewPage, {
					id: _thisViewMyProfileNested.me.id
					, pictureurl: _thisViewMyProfileNested.me.pictureurl
					, fullname: _thisViewMyProfileNested.me.fullname
					, slogan: _thisViewMyProfileNested.me.slogan
					, perstext: _thisViewMyProfileNested.me.perstext
					, username: _thisViewMyProfileNested.me.username
					, coins: _thisViewMyProfileNested.me.coins
					, interests: _thisViewMyProfileNested.interests
				},{variable: 'user'});
				// alert(htmlContent);
				$(this.el).html(htmlContent);
				this.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				this.bindEvents();
				return(this);
			}
		});

        return MyProfileNestedView;

    }

);