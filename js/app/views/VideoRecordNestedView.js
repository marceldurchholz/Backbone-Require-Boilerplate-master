// VideoRecordNestedView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videoRecordCollection", "text!templates/VideoRecordNestedPage.html", "text!templates/VideoRecordNestedPageTwo.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videoRecordCollection, VideoRecordNestedPage, VideoRecordNestedPageTwo, sidemenusList, SidemenuView){
		
		var VideoRecordNestedViewVar = Backbone.View.extend({
			
			el: "#VideoRecordNestedViewDiv",
			collection: new Backbone.LocalStorage("videoRecordStorageX"),
			model: VideoModel,
			initialize: function() {
				_thisViewRecordVideoNested = this;
				console.log('initializing VideoRecordNestedView.js');
				_thisViewRecordVideoNested.localStorageSubmitformModel = new VideoModel();
				// _thisViewRecordVideoNested.localStorageSubmitformModel.set('title','Dies ist ein Titel');
				// _thisViewRecordVideoNested.localStorageSubmitformModel.set('subtitle','Dies ist ein Untertitel');
				// _thisViewRecordVideoNested.localStorageSubmitformModel.set('description','Dies ist eine Beschreibung.');
				_thisViewRecordVideoNested.localStorageSubmitform = new videoRecordCollection();
				_thisViewRecordVideoNested.localStorageSubmitform.set(_thisViewRecordVideoNested.localStorageSubmitformModel);
				this.activePage = VideoRecordNestedPage;
			},
			initializeme: function() {
				console.log('initializing ME in VideoRecordNestedView.js');
				$(this.el).html('loading...');
				$.when( this.fetchMe() ).then(
				  function( status ) {
					_thisViewRecordVideoNested.me = status;
					_thisViewRecordVideoNested.render();
				  },
				  function( status ) {
					alert( "you fail this time" );
				  },
				  function( status ) {
					console.log('still fetchWorking');
				  }
				);
			},
			fetchWorking: function() {
				var setTimeoutWatcher = setTimeout(function foo() {
					if ( _thisViewRecordVideoNested.dfd.state() === "pending" ) {
						_thisViewRecordVideoNested.dfd.notify( "working... " );
						setTimeout( _thisViewRecordVideoNested.fetchWorking, 100 );
					}
				}, 1 );
			},
			fetchMe: function() {
				_thisViewRecordVideoNested = this;
				console.log('fetchMe VideoRecordNestedView.js');
				_thisViewRecordVideoNested.dfd = new jQuery.Deferred();
				_thisViewRecordVideoNested.fetchWorking();
				dpd.users.me(function(user) {
					if (user) {
						var fetchMe = setTimeout ( function() {
							_thisViewRecordVideoNested.dfd.resolve(user);
						}, 0 );
					}
					else {
						console.log('You are not logged in!');
						window.location.href = "#noaccess";
					}
				});
				return this.dfd.promise();
			},
			fetch: function() {	
				_thisViewRecordVideoNested = this;
				console.log('fetching VideoRecordNestedView.js');
				this.$el.hide();
				_thisViewRecordVideoNested.initializeme();
			},
			savePageOne: function(event) {
				event.preventDefault();
				var _thisViewRecordVideoNested = this;
				_thisViewRecordVideoNested.formValues = new Object;
				_.each(this.$('#submitform').serializeArray(), function(input){
					// console.log('getting: '+input.name+' >> '+input.value);
					_thisViewRecordVideoNested.localStorageSubmitformModel.set(input.name,input.value);
				});
				_thisViewRecordVideoNested.localStorageSubmitform.set(_thisViewRecordVideoNested.localStorageSubmitformModel);
				this.activePage = VideoRecordNestedPageTwo;
				this.render();
			},
			backToPageOne: function(event) {
				event.preventDefault();
				var _thisViewRecordVideoNested = this;
				_thisViewRecordVideoNested.formValues = new Object;
				_.each(this.$('#submitform').serializeArray(), function(input){
					_thisViewRecordVideoNested.localStorageSubmitformModel.set(input.name,input.value);
				});
				_thisViewRecordVideoNested.localStorageSubmitform.set(_thisViewRecordVideoNested.localStorageSubmitformModel);
				this.activePage = VideoRecordNestedPage;
				this.render();
			},
			savePageTwo: function(event) {
				event.preventDefault();
				// alert('savePageTwo');
				var _thisViewRecordVideoNested = this;
				_thisViewRecordVideoNested.formValues = new Object;
				_.each(this.$('#submitform').serializeArray(), function(input){
					// console.log('getting: '+input.name+' >> '+input.value);
					_thisViewRecordVideoNested.localStorageSubmitformModel.set(input.name,input.value);
				});
				_thisViewRecordVideoNested.localStorageSubmitform.set(_thisViewRecordVideoNested.localStorageSubmitformModel);
				// this.activePage = VideoRecordNestedPageTwo;
				// this.render();
				console.log(_thisViewRecordVideoNested.localStorageSubmitform);
				// return(false);
				captureVideoUpload(_thisViewRecordVideoNested.localStorageSubmitform);
			},
			bindEvents: function() {
				var _thisViewRecordVideoNested = this;
				/*
				this.$el.off('click','#checkLocalTitleButton').on('click','#checkLocalTitleButton',function(event){
					event.preventDefault();
					recordVideoUpload(_thisViewRecordVideoNested.localStorageSubmitform);
				});
				*/
				this.$el.off('click','#submitbutton').on('click','#submitbutton',function(event){
					event.preventDefault();
					_thisViewRecordVideoNested.savePageOne(event);
				});
				this.$el.off('click','#recordMediaUploadButton').on('click','#recordMediaUploadButton',function(event){
					event.preventDefault();
					_thisViewRecordVideoNested.savePageTwo(event);
					// captureVideoUpload(_thisViewRecordVideoNested.localStorageSubmitform);
				});
				this.$el.off('click','#formbackbutton').on('click','#formbackbutton',function(event){
					event.preventDefault();
					_thisViewRecordVideoNested.backToPageOne(event);
				});
				this.$el.off('click','#captureVideoRecordButton').on('click','#captureVideoRecordButton',function(event){
					event.preventDefault();
					captureVideoRecord();
				});
				$('#uploadstatusbar').hide();
				/*
				this.$el.off('click','#captureVideoUploadButton').on('click','#captureVideoUploadButton',function(event){
					event.preventDefault();
					captureVideoUpload();
				});
				*/
				// $('#captureVideoUploadButton').button('disable');
				// $('#submitbutton').button('disable');
			},
			render: function() {
				var _thisViewRecordVideoNested = this;
				console.log('DOING render VideoRecordNestedView.js called');				
				_thisVideoRecordAttributes = _thisViewRecordVideoNested.localStorageSubmitform.models[0].attributes;
				if (_thisVideoRecordAttributes['slider-price']==undefined) _thisVideoRecordAttributes['slider-price'] = "200";
				// console.log(_thisVideoRecordAttributes['slider-price']);
				_thisViewRecordVideoNested.$el.html(_.template(_thisViewRecordVideoNested.activePage, {
					slider_price:_thisVideoRecordAttributes['slider-price']
				},{variable: 'video'}));
				
				if (!isMobile.any()) {
					// $('#camera_file').val('file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4');
				}
				this.$el.trigger('create');
				sendLocalStorageToElements(_thisViewRecordVideoNested.localStorageSubmitform.models);
				var mediaFilePath = $('#camera_file').val();
				console.log(mediaFilePath);
				attachVideoToPlayer(mediaFilePath);
				this.bindEvents();
				this.$el.fadeIn( 500, function() {
					$('.ui-content').scrollTop(0);
					new FastClick(document.body);
				});
				return this;
			}
		});

        return VideoRecordNestedViewVar;

    }

);