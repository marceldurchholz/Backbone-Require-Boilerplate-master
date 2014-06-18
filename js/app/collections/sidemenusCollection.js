// SidemenusCollection.js
// -------------
define(["jquery", "backbone", "models/SidemenuModel"],

  function($, Backbone, SidemenuModel) {

    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionSidemenu = this;
			var online = _thisCollectionSidemenu.online = 1;
			this._localStorage_sidemenus = new Store('sidemenus');
			// var offlineData = this.offlineData = this._localStorage_sidemenus.findAll();
			// this.localStorage = this._localStorage_sidemenus;
			/*
			if (_thisCollectionSidemenu.online==1) {
				// this.url = 'http://s299455960.online.de:5000/sidemenu/?nav=true';
				this.url = 'http://s299455960.online.de:5000/sidemenu/?{"nav":true,"$sort":"seq"}';
				
				// this.url = 'http://s299455960.online.de:5000/sidemenu?{%22nav%22:%22true%22}';
				// this.url = 'http://s299455960.online.de:5000/sidemenu/d6c9268c49a139bf';
				// this.localStorage = null;
			}
			*/
			this.url = 'http://s299455960.online.de:5000/sidemenu/?{"navoffline":true,"$sort":"seq"}';
			// this.url = 'http://s299455960.online.de:5000/sidemenu/?navoffline=true';
		},
		model: SidemenuModel,
		fetch: function(options) {
			_thisCollectionSidemenu = this;
			if (_thisCollectionSidemenu.online==1) {
				if (window.system.uid==undefined) window.system.uid = "0";
				// alert('uid : '+window.system.uid);
				dpd('users').get(window.system.uid, function(user, err) {
				// dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionSidemenu.user = user;
						// console.log(user.roles);
						options || (options = {});
						var data = (options.data || {});
						options.data = {date: _thisCollectionSidemenu.date};
						var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(_thisCollectionSidemenu, options);
						return responseObjectSidemenu;
					}
					else {
						options || (options = {});
						var data = (options.data || {});
						options.data = {date: _thisCollectionSidemenu.date};
						var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(_thisCollectionSidemenu, options);
						return responseObjectSidemenu;
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
			}
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(responseSidemenu) {
			console.log(responseSidemenu);
			_thisCollectionSidemenu.models = [];
			this._localStorage_sidemenus.models = [];
			for (n = 0; n < responseSidemenu.length; ++n) {
				model = responseSidemenu[n];
				var access = 0;
				// alert(window.system.uid);
				if (window.system.uid==undefined || window.system.uid=="0" || window.system.uid=="") {
					// window.system.uid = "0";
					if ($.inArray( "public", model.roles )>-1) access = 1;
					// alert('checking in public mode');
				}
				else {
					if (checkRoles(model.roles)==true) access = 1;
					if (access==0) if (checkAppConfigs(model.roles)==true) access = 1;
				}
				if (access>0) {
					_thisCollectionSidemenu.add(model);
				}
			}
			return(_thisCollectionSidemenu.models);
		},
		errorHandler: function(xhr) {
			console.log(xhr);
			if (xhr.status=='404') {
				if (xhr.responseJSON==undefined) {
					alert('Diese App benötigt eine Internetverbindung.');
				}
				else {
					alert('Die Abfrage konnte nicht durchgeführt werden oder das Ziel ist nicht erreichbar.');
				}
			}
		},
		successHandler: function(xhr) {
			// alert('successHandler');
			console.log(xhr);
		}
	});

    // Returns the Model class
    return SidemenusCollection;

  }

);