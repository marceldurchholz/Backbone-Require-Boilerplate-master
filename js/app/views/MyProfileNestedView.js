// MyProfileNestedView.js
// -------
define(["jquery", "backbone", "text!templates/sidemenusList.html", "views/SidemenuView", "text!templates/MyProfileNestedViewPage.html"],

    function($, Backbone, sidemenusList, SidemenuView, MyProfileNestedViewPage){
		
		var MyProfileNestedView = Backbone.View.extend({
			el: "#MyProfileNestedViewDiv",
			initialize: function() {
				var _thisViewMyProfileNested = this;
				_thisViewMyProfileNested.$el.hide();
				showModal();
				dpd.users.me(function(me) {
					if (me) _thisViewMyProfileNested.me = me;
					else {
						system.redirectToUrl('#login');
						return(false);
					}
					
					$.ajax({
						url: "http://dominik-lohmann.de:5000/users",
						async: false
					}).done(function(users) {
						var logincounts = 0;
						_.each(users, function(user) {
							if (user.logincount==undefined) user.logincount = 0;
							logincounts += user.logincount;
						});
						_thisViewMyProfileNested.me.level = Math.round(3*(_thisViewMyProfileNested.me.logincount/logincounts),0);
					});
					
					$.ajax({
						url: "http://dominik-lohmann.de:5000/interests",
						async: false
					}).done(function(interests) {
						_.each(interests, function(interest) {
							var exists = $.inArray( $.trim(interest.name), _thisViewMyProfileNested.me.interests );
							if (exists>-1) interest.checked = "checked";
						});
						interests.sort(function(a, b){
						 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
						 if (nameA < nameB) //sort string ascending
						  return -1 
						 if (nameA > nameB)
						  return 1
						 return 0 //default return value (no sorting)
						});
						_thisViewMyProfileNested.interests = interests;
						_thisViewMyProfileNested.render();
					});
					if ($("#fullname").val()=='') {
						doAlert('Bitte hinterlegen Sie Ihren Namen zur Freischaltung.','Fast fertig...');
					}
					
				});

			},
			fetch: function() {	
				_thisViewMyProfileNested = this;
			},
			changeInputValue: function(e) {
				dpd.users.me(function(me) {
					_thisViewMyProfileNested.me = me;
					var obj = e.currentTarget;
					if (obj.defaultValue != obj.value) {
						if (obj.id=='username') {
							if (checkEmail(obj.value)==true) { }
							else return false;
						}
						var newroles = ["user","seeker"];
						if (obj.id=='fullname') {
							if (obj.value=='') { 
								// doAlert('Es muss ein Vor- und Nachname eingegeben werden.','Information');
								$('.emptyWarningDiv').show();
							} else {
								$('.emptyWarningDiv').hide();
								dpd.users.put(_thisViewMyProfileNested.me.id, {"fullname":obj.value, roles: newroles}, function(result, err) { 
									if(err) { }
									_thisViewMyProfileNested.me = result;
									if (_thisViewMyProfileNested.me.active==false) {
										_thisViewMyProfileNested.sendActivation();
									}
								});
							}
						}
						if (obj.id=='perstext') dpd.users.put(_thisViewMyProfileNested.me.id, {"perstext":obj.value}, function(result, err) { 
							if(err) { }
						});
					}
				});
			},
			sendActivation: function() {
				doAlert('Ihr Profil wurde freigeschaltet. Diese Seite wurde hierzu neu geladen,','Profil bereit!');
				dpd.users.put(_thisViewMyProfileNested.me.id, {"active":true}, function(result, err) { 
					if(err) { }
					_thisViewMyProfileNested.initialize();
				});
			},
			bindEvents: function() {
				_thisViewMyProfileNested = this;
				$('#delaccuntarea').hide();
				$('#restrictedArea').hide();
				$('#showMenu').hide();
				$('.showPageOptions').hide();
				if (_thisViewMyProfileNested.me.active==true) {
					if ($("#fullname").val()!='') {
						$('#showMenu').show();
						$('.showPageOptions').show();
						$('#restrictedArea').show();
					}
				}
				
				$("#fullname").blur(this.changeInputValue);
				$("#perstext").blur(this.changeInputValue);
				$("input[type='checkbox']").bind( "change", function(event, ui) {
					event.preventDefault();
					var o = new Object();
					o.id = event.delegateTarget.id;
					if (event.delegateTarget.checked==false) o.status = "";
					else o.status = "checked";
					o.label = $("label[for='"+ event.delegateTarget.id +"']").text();					
					dpd.users.me(function(me) {
						var exists = $.inArray( $.trim(o.label), me.interests )
						if (event.delegateTarget.checked==false && exists>-1) dpd.users.put(_thisViewMyProfileNested.me.id, {"interests": {$pull:$.trim(o.label)}} );
						else if (event.delegateTarget.checked==true && exists==-1) dpd.users.put(_thisViewMyProfileNested.me.id, {"interests": {$push:$.trim(o.label)}} );
					});
				});
				
				this.$el.off('click','.providerinfobtn').on('click','.providerinfobtn',function(e){
					e.preventDefault();
					window.location.href = "http://www.appinaut.com/";
				});
				
				this.$el.off('click','.purchasebtn').on('click','.purchasebtn',function(e){
					e.preventDefault();
					var iapid = $(this).attr('data-iapid');
					showModal();
					if (isMobile.any()) { 
						_thisViewMyProfileNested.storekit.purchase(iapid,1);
					}
					else {
						_thisViewMyProfileNested.initialize();
						hideModal();
						
					}
				});

				
				this.$el.off('click','#showdeletearea').on('click','#showdeletearea',function(e){
					e.preventDefault();
					$('#delaccuntarea').show();
				});
				this.$el.off('click','#deletemyaccountbtn').on('click','#deletemyaccountbtn',function(e){
					e.preventDefault();
					var confirmText = 'Wollen Sie Ihren Zugang wirklich unwiderruflich löschen?';
					var confirmTitle = 'Sind Sie sicher?';
					var confirmButtonLabels = 'Bitte löschen,Vorgang abbrechen';
					doConfirm(confirmText, confirmTitle, _thisViewMyProfileNested.deleteMyAccount, confirmButtonLabels);
				});
				checkTopNaviRoles();
			},
			deleteMyAccount: function(response) {
				if (response==1) {
					doAlert('Das finden wir schade. Ihr Zugang wurde gelöscht. Schauen Sie gerne wieder einmal vorbei.','Auf Wiedersehen :-(');
					var deldate = new Date();
					var deletetedusername = 'DELETETED_'+deldate+'_'+_thisViewMyProfileNested.me.username;
					dpd.users.put(_thisViewMyProfileNested.me.id, {"username":deletetedusername,"deleted":true}, function(result, err) { 
						if(err) { }
						system.redirectToUrl('#logout');
					});
				}
			},
			render: function() {
				_thisViewMyProfileNested = this;
				$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
				_thisViewMyProfileNested.nestedView = new SidemenuView().fetch();
				// console.log(_thisViewMyProfileNested.me);
				if (!_thisViewMyProfileNested.me.credits) _thisViewMyProfileNested.me.credits = "0";
				var provider;
				provider = $.inArray( 'provider', _thisViewMyProfileNested.me.roles );
				var seeker;
				seeker = $.inArray( 'seeker', _thisViewMyProfileNested.me.roles );				
				var htmlContent = '';
				$(_thisViewMyProfileNested.el).html(htmlContent);
				htmlContent = _.template(MyProfileNestedViewPage, {
					id: _thisViewMyProfileNested.me.id
					, pictureurl: _thisViewMyProfileNested.me.pictureurl
					, fullname: _thisViewMyProfileNested.me.fullname
					, slogan: _thisViewMyProfileNested.me.slogan
					, perstext: _thisViewMyProfileNested.me.perstext
					, username: _thisViewMyProfileNested.me.username
					, credits: _thisViewMyProfileNested.me.credits
					, level: _thisViewMyProfileNested.me.level
					, interests: _thisViewMyProfileNested.interests
					, provider: provider
					, seeker: seeker
				},{variable: 'user'});
				$(_thisViewMyProfileNested.el).html(htmlContent);
				fontResize();
				this.$el.trigger('create');
				hideModal();
				_thisViewMyProfileNested.bindEvents();
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				return(this);
			}
		});

        return MyProfileNestedView;

    }

);