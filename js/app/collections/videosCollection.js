// VideosCollection.js
// -------------
define(["jquery", "backbone", "models/VideoModel"],

  function($, Backbone, VideoModel) {

    // Creates a new Backbone Collection class object
	var VideosCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
			this.bind("error", this.errorHandler);
			this.bind("success", this.successHandler);
			_thisCollectionVideos = this;
			var online = _thisCollectionVideos.online = 1;
			this._localStorage_videos = new Store('videos');
			var offlineData = this.offlineData = this._localStorage_videos.findAll();
			this.localStorage = this._localStorage_videos;
			if (_thisCollectionVideos.online==1) {
				this.url = 'http://dominik-lohmann.de:5000/videos/';
				// this.url = 'http://dominik-lohmann.de:5000/videos/d6c9268c49a139bf';
				this.localStorage = null;
			}
		},
		model: VideoModel,
		fetch: function(options) {
			if (_thisCollectionVideos.online==1) {
				dpd.users.me(function(user) {
					if (user) {
						// alert(user.roles);
						_thisCollectionVideos.user = user;
						// console.log(user.roles);
					}
					else {
						// location.href = "#noaccess";
						console.log('you are not logged in');
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
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(responseVideos) {
			console.log('parse responseVideos');
			// console.log(_thisCollectionSidemenu.user);
			_thisCollectionVideos.models = [];
			this._localStorage_videos.models = [];
			for (n = 0; n < responseVideos.length; ++n) {
				model = responseVideos[n];
				if (this.options.hasOwnProperty('id')) {
					if (this.options.id == model.id) {
						// alert('id setted');
						_thisCollectionVideos.add(model);
						if (_thisCollectionVideos.online==1) this._localStorage_videos.update(new VideoModel(model));
					}
				}
				else {
					_thisCollectionVideos.add(model);
					if (_thisCollectionVideos.online==1) this._localStorage_videos.update(new VideoModel(model));
				}
			}
			return(_thisCollectionVideos.models);
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
    return VideosCollection;

  }

);