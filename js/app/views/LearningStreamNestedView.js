// LearningStreamNestedView.js
// -------
define(["jquery", "backbone", "models/VideoModel", "collections/videosCollection", "text!templates/LearningStreamNestedPage.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, VideoModel, videosCollection, LearningStreamNestedPage, sidemenusList, SidemenuView){
		
		var LearningStreamNestedViewVar = Backbone.View.extend({
			
			el: "#LearningStreamNestedViewDiv",
			initialize: function() {
				console.log('initializing LearningStreamNestedView.js');
				var _thisViewLearningStreamNested = this;
				var streamData = new Array();
				_thisViewLearningStreamNested.streamData = streamData;
			},
			fetch: function() {	
				// alert('bla');
				_thisViewLearningStreamNested = this;
				console.log('fetching LearningStreamNestedView.js');
				_thisViewLearningStreamNested.collectStreamData();
				// this.$el.hide();
			},
			bindEvents: function() {
				var _thisViewLearningStreamNested = this;
				/*
				// this.$el.off('click','.clickRow').on('click','.clickRow',function(){_thisViewLearningStreamNested.clicked(e);});
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
					window.location.href = event.currentTarget.hash;
				});
				this.$el.off('click','.isVideoToFavourites').on('click','.isVideoToFavourites',function(event){
					event.preventDefault();
					alert('isVideoToFavourites');
				});
				this.$el.off('click','.addVideoToFavourites').on('click','.addVideoToFavourites',function(event){
					event.preventDefault();
					console.log(event);
					$(this).removeClass("addVideoToFavourites");
					$(this).addClass("isVideoToFavourites");
					var videoid = $(event.currentTarget).attr('data-link');
					var _videoid = videoid;
					console.log(_videoid);
					dpd.users.get({id:_thisViewLearningStreamNested.me.id,following:_videoid}, function(result, error) {
						if (result) {
							console.log(result);
							}
						else {
							// console.log(error);
							dpd.users.put(_thisViewLearningStreamNested.me.id, {following:{$push:_videoid}}, function(result, error) {
								if (result) {
									console.log(result);
									}
								else {
									// console.log(error);
								}
							});
						}
					});
				});
				*/
			},
			collectStreamData: function() {
				var _thisViewLearningStreamNested = this;
				$.ajax({
					url: "http://dominik-lohmann.de:5000/videos?active=true&deleted=false",
					async: false
				}).done(function(videoData) {
					_.each(videoData, function(value, index, list) {
						value.ccat = 'video';
						value.icon = 'images/icon-videos-60.png';
						value.href = '#videos/details/view/'+value.id;
						_thisViewLearningStreamNested.streamData.push(value);
					});
				});
				$.ajax({
					url: "http://dominik-lohmann.de:5000/cards?active=true&deleted=false",
					async: false
				}).done(function(cardData) {
					_.each(cardData, function(value, index, list) {
						value.ccat = 'card';
						value.icon = 'images/icon-cards-60.png';
						value.href = '#cards/details/view/'+value.id;
						_thisViewLearningStreamNested.streamData.push(value);
					});
				});
				$.ajax({
					url: "http://dominik-lohmann.de:5000/planer?active=true&deleted=false",
					async: false
				}).done(function(planData) {
					_.each(planData, function(value, index, list) {
						value.ccat = 'plan';
						value.icon = 'images/icon-planer-60.png';
						value.href = '#planer/details/view/'+value.id;
						_thisViewLearningStreamNested.streamData.push(value);
					});
				});
				// Sort multidimensional arrays with oobjects by value 
				// http://www.javascriptkit.com/javatutors/arraysort2.shtml
				_thisViewLearningStreamNested.streamData.sort(function(a, b){
					return b.cdate-a.cdate
				});
				_thisViewLearningStreamNested.render();
			},
			reload: function() {
				setTimeout(function() {
					_thisViewLearningStreamNested.collectStreamData();
					// alert('bla');
				},5000);
			},
			render: function() {
				this.bindEvents();
				var _thisViewLearningStreamNested = this;
				console.log(_thisViewLearningStreamNested);
				console.log('DOING render LearningStreamNestedView.js called');
								
				// _thisViewLearningStreamNested.reload();
				_thisViewLearningStreamNested.$el.html(_.template(LearningStreamNestedPage, {
					data: _thisViewLearningStreamNested.streamData
				},{variable: 'stream'}));
				this.$el.trigger('create');
				// _thisViewLearningStream.$el.trigger('create');
				new FastClick(document.body);
				this.$el.fadeIn( 500, function() {
					// $('.ui-content').scrollTop(0);
					new FastClick(document.body);
					/*
					var LearningStreamUpdateInterval = setInterval(function(){
						// alert("Hello");
						// _thisViewLearningStreamNested.fetch();
					},2000);
					*/
				});
				return this;				
			}
		});

        return LearningStreamNestedViewVar;

    }

);