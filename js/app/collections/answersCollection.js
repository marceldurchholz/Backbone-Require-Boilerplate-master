// AnswersCollection.js
// -------------
define(["jquery", "backbone", "models/AnswerModel"],

  function($, Backbone, AnswerModel) {

    // Creates a new Backbone Collection class object
	var AnswersCollectionVar = Backbone.Collection.extend({
		comparator: function( collection ){
			return( collection.get( 'topic' ) );
		},
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionAnswers = this;
			var online = _thisCollectionAnswers.online = 0;
			this._localStorage_answers = new Store('answers');
			var offlineData = this.offlineData = this._localStorage_answers.findAll();
			this.localStorage = this._localStorage_answers;
			/*
			if (_thisCollectionAnswers.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/answers/';
				// this.url = 'http://dominik-lohmann.de:5000/answers/d6c9268c49a139bf';
				this.localStorage = null;
			}
			*/
		},
		model: AnswerModel,
		fetch: function(options) {
			if (_thisCollectionAnswers.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionAnswers.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						// console.log('you are not logged in');
					}
				});
			}
            options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObject;
		},
		sync: function(method, model, options) {
			// options.parse = false;
			var bla = Backbone.sync.call(model, method, model, options);
			// console.log(bla);
			console.log(options);
			console.log(method);
			console.log(model);
			/*
			$.get( 'http://dominik-lohmann.de:5000/answers/', function( data ) {
			  alert( "Data Loaded: " + data );
			  console.log(data);
			  return(data);
			});
			*/
		},
		parse: function(responseAnswers) {
			console.log('parse responseAnswers');
			// console.log(_thisCollectionSidemenu.user);
			_thisCollectionAnswers.models = [];
			this._localStorage_answers.models = [];
			for (n = 0; n < responseAnswers.length; ++n) {
				model = responseAnswers[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						// alert('id setted');
						_thisCollectionAnswers.add(model);
						if (_thisCollectionAnswers.online==1) this._localStorage_answers.update(new AnswerModel(model));
					}
				}
				else {
					// console.log(model);
					_thisCollectionAnswers.add(model);
					if (_thisCollectionAnswers.online==1) _thisCollectionAnswers._localStorage_answers.update(new AnswerModel(model));
					var userid = model.uploader;
					/*
					$.get( 'http://dominik-lohmann.de:5000/users/?id='+userid, function( data ) {
						// alert( "Data Loaded: " + data.fullname );
						console.log("Data Loaded: " + data.fullname);
						model.fullname = data.fullname;
						console.log(model);
						// return(data);
						_thisCollectionAnswers.add(model);
						if (_thisCollectionAnswers.online==1) _thisCollectionAnswers._localStorage_answers.update(new AnswerModel(model));
					});
					*/
				}
			}
			/*
			window.setTimeout(function bla() {
				console.log(_thisCollectionAnswers.models);
				return(_thisCollectionAnswers.models);
				alert('huhuuu');
			}, 2000);
			*/
			console.log(_thisCollectionAnswers.models);
			return(_thisCollectionAnswers.models);
		},
		errorHandler: function(xhr) {
			console.log(xhr);
			if (xhr.status=='404') {
				if (xhr.responseJSON==undefined) {
					alert('probably no internet connection');
				}
				else {
					alert('probably request url wrong or not reachable');
				}
			}
		},
		successHandler: function(xhr) {
			alert('successHandler');
			console.log(xhr);
		}
	});

    // Returns the Model class
    return AnswersCollectionVar;

  }

);