// PlanDetailsView.js
// -------
define(["jquery", "backbone", "models/PlanModel", "collections/planerCollection", "views/PlanView", "text!templates/planDetailsView.html", "text!templates/sidemenusList.html", "views/SidemenuView"],

    function($, Backbone, PlanModel, planerCollection, PlanListViewItems, planerDetailsViewHTML, sidemenusList, SidemenuView){
		
			var PlanDetailsViewVar = Backbone.View.extend({
			
				el: "#page-content",
				attributes: {"data-role": 'content'},
				createPlan: function () {
					if (this._planerCollection.online==0) {
						// this._planerCollection._localStorage_users.create(new Plan({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						alert('in offline mode you can not add data');
					}
					else {
						var username = ''+Math.floor((Math.random()*10000)+1);
						var password = ''+Math.floor((Math.random()*10000)+1);
						// this._planerCollection._localStorage_users.create(new PlanModel({"fullname": "offline James King", "device": "5645-6543-5415-5233", "credits": "120", "pictureurl": "http://www.redner24.de/typo3temp/GB/Durchholz_Marcel_4c_1090c3626b_Durc_a4ff6064ff.jpg"}));
						this.create(new PlanModel({"uploader": "042cb1572ffbea5d", "planurl": "http://xyz.de.com.uk", "title": "This is a plan title", "description": "This is a description", "price": "35", "thumbnailurl": "http://www.cbr250r.com.au/images/plan-thumbnail.jpg"}));
					}
					return(false);
				},
				create: function(model) {
					_thisViewPlanDetails = this;
					$.ajax('http://dominik-lohmann.de:5000/planer', {
					  type: "POST",
					  contentType: "application/json",
					  data: JSON.stringify(model.attributes),
					  success: function(todo) {
						_thisViewPlanDetails.fetch();
					  }, 
					  error: function(xhr,b) {
						console.log(xhr);
						alert(xhr);
					  }
					});
					return(false);
				},
				bindEvents: function() {
					var _thisViewPlanDetails = this;
					this.$el.off('click','.createPlan').on('click','.createPlan',function(){_thisViewPlanDetails.createPlan();});
				},
				initializeCollection:function(options) {
					// alert(this.id);
					// var myCollection = new Collection([ new Model({id: 'smith'}) ]);
					this._planerCollection = new planerCollection([], options);
					// this._planerCollection = new planerCollection();
				},
				fetch: function(options) {
					this.$el.hide();
					this.initializeCollection(options);
					// this._planerCollection = new planerCollection();
					var _thisViewPlanDetails = this;
					this._planerCollection.fetch({
						error: function(action, coll) {
							console.log(action);
							console.log(coll);
						},
						success: function(coll, jsoncoll) {
							console.log(coll);
							console.log(jsoncoll);
							_thisViewPlanDetails.render();
						}
					});
				},
				initialize: function(options) {
					this.initializeCollection(options);
					this.fetch(options);
				},
				insertVariables: function(model) {
					console.log(model.get('planurl'));
					_template = _.template(planerDetailsViewHTML, {
						id: model.get('id'),
						uploader: model.get('uploader'),
						planurl: model.get('planurl'),
						title: model.get('title'),
						subtitle: model.get('subtitle'),
						description: model.get('description'),
						price: model.get('price'),
						start: model.get('start'),
						end: model.get('end')
					},{variable: 'plan'});
					$(this.el).html(_template);
				},
				render: function() {
					_thisViewPlanDetails = this;
					console.log('rendering');
					$(window).resize(function() {
						window.resizeElement('#plan_player_1')
					});
					console.log('DOING render PlanDetailsView.js called');
					// this.sidebar = _.template(sidebar, {});
					// $('#sidebar').html(sidebar);
					$('#sidebarListViewDiv').html(_.template(sidemenusList, {}));
					_thisViewPlanDetails.nestedView = new SidemenuView().fetch();
					var htmlContent = '';
					$(this.el).html(htmlContent);
					// console.log('this._planerCollection.models');
					// console.log(this._planerCollection.models[0].attributes.planurl);
					_.each(this._planerCollection.models, function(model) {
						this.id = model.get('id');
						this.planurl = model.get('id');
						_thisViewPlanDetails.insertVariables(model);
					});
					console.log('this._planerCollection.models[0].attributes.planurl');
					console.log(this._planerCollection.models[0].attributes.planurl);
					// window.createPlanPreview(_thisViewPlanDetails.$('#plan_player_1'),'plan_player_1',this._planerCollection.models[0].attributes.planurl);
					this.$el.trigger('create');
					new FastClick(document.body);
					this.$el.fadeIn( 500, function() {
						$('.ui-content').scrollTop(0);
						new FastClick(document.body);
					});
					return this;
				}

			});

        return PlanDetailsViewVar;

    }

);