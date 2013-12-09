// VideosCollection.js
// -------------
define(["jquery", "backbone", "models/VideoModel"],

  function($, Backbone, VideoModel) {

    // Creates a new Backbone Collection class object
	var VideosCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			// console.log('options');
			// console.log(options);
			this.options = options || {};
			// this.options.id = this.options.id || 0;
			
			// console.log('this');
			// console.log(this);
			this.bind("error", this.errorHandler);			
			_thisCollection = this;
			var online = _thisCollection.online = 1;
			this._localStorage_videos = new Store('videos');
			var offlineData = this.offlineData = this._localStorage_videos.findAll();
			this.localStorage = this._localStorage_videos;
			if (_thisCollection.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/videos/';
				// this.url = 'http://dominik-lohmann.de:5000/videos/d6c9268c49a139bf';
				this.localStorage = null;
			}
		},
		model: VideoModel,
		fetch: function(options) {
            /*
			options || (options = {});
            var data = (options.data || {});
            options.data = {date: this.date};
			var responseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObject;
			*/
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response) {
			// console.log('parse');
			// console.log(this.options);
			_thisCollection.models = [];
			this._localStorage_videos.models = [];
			for (n = 0; n < response.length; ++n) {
				model = response[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						// alert('id setted');
						_thisCollection.add(model);
						if (_thisCollection.online==1) this._localStorage_videos.update(new VideoModel(model));
					}
				}
				else {
					_thisCollection.add(model);
					if (_thisCollection.online==1) this._localStorage_videos.update(new VideoModel(model));
				}
				// console.log('DEBUG');
				// console.log(this.options.id);
				// console.log(model.id);
			}
			// console.log(_thisCollection.models);
			// console.log(this._localStorage_videos);
			return(_thisCollection.models);
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
		txErrorHandler: function(tx) {
			alert('error tx.message');
		}
	});

    // Returns the Model class
    return VideosCollection;

  }

);