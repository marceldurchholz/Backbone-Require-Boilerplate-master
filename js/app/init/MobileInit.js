// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "backbone.validateAll"],

  function($, Backbone, MobileRouter) {

	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;	
	$.mobile.buttonMarkup.hoverDelay = 0;
	$.mobile.defaultPageTransition = 'none'; 
	$.mobile.defaultDialogTransition = "none";
	$.mobile.page.prototype.options.degradeInputs.date = true;
	$.mobile.page.prototype.options.domCache = false;
	$.mobile.ignoreContentEnabled=true;

	$.when(dd, jqd).done(function doInit() {
		populateDeviceInfoTimer();
		// Returns the MobileRouter class
	});

	$(window).bind('hashchange', function(){
		// currentHash = window.location.hash;
		// console.log(window.location.hash);
		// alert('MobileInit.js '+window.location.hash);
		populateDeviceInfoTimer();
	});
		

	if (isMobile.any()) {
	
		window.dao =  {

			syncURL: "../api/employees",

			initialize: function(callback) {
				var self = this;
				this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);

				// Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
				// no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
				// does not already exist.
				this.db.transaction(
					function(tx) {
						tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='employee'", this.txErrorHandler,
							function(tx, results) {
								if (results.rows.length == 1) {
									log('Using existing Employee table in local SQLite database');
								}
								else
								{
									log('Employee table does not exist in local SQLite database');
									self.createTable(callback);
								}
							});
					}
				)

			},
				
			createTable: function(callback) {
				this.db.transaction(
					function(tx) {
						var sql =
							"CREATE TABLE IF NOT EXISTS employee ( " +
							"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
							"firstName VARCHAR(50), " +
							"lastName VARCHAR(50), " +
							"title VARCHAR(50), " +
							"officePhone VARCHAR(50), " +
							"deleted INTEGER, " +
							"lastModified VARCHAR(50))";
						tx.executeSql(sql);
					},
					this.txErrorHandler,
					function() {
						log('Table employee successfully CREATED in local SQLite database');
						callback();
					}
				);
			},
			
			fillTable: function(callback) {
				this.db.transaction(
					function(tx) {
						/*
						var sql =
							"CREATE TABLE IF NOT EXISTS employee ( " +
							"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
							"firstName VARCHAR(50), " +
							"lastName VARCHAR(50), " +
							"title VARCHAR(50), " +
							"officePhone VARCHAR(50), " +
							"deleted INTEGER, " +
							"lastModified VARCHAR(50))";
						tx.executeSql(sql);
						*/
						// sample data 
						/*
						tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (5,'Steven','Wells','Software Architect','617-000-0012','false','2013-11-09 22:14:19')");
						tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (4,'Amy','Jones','Sales Representative','617-000-0011','false','2013-11-09 22:14:19')");
						tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (3,'Kathleen','Byrne','Sales Representative','617-000-0010','false','2013-11-09 22:14:19')");
						*/
						tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (2,'Gary','Donovan','Marketing','617-000-0009','1','2013-11-09 22:14:19')");
						tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (1,'Lisa','Wong','Marketing Manager','617-000-0008','0','2013-11-09 22:14:19')");
					},
					this.txErrorHandler,
					function() {
						log('Table employee successfully FILLED in local SQLite database');
						callback();
					}
				);
			},

			dropTable: function(callback) {
				this.db.transaction(
					function(tx) {
						tx.executeSql('DROP TABLE IF EXISTS employee');
					},
					this.txErrorHandler,
					function() {
						log('Table employee successfully DROPPED in local SQLite database');
						callback();
					}
				);
			},

			findAll: function(callback) {
				this.db.transaction(
					function(tx) {
						var sql = "SELECT * FROM EMPLOYEE";
						log('Local SQLite database: "SELECT * FROM EMPLOYEE"');
						tx.executeSql(sql, this.txErrorHandler,
							function(tx, results) {
								var len = results.rows.length,
									employees = [],
									i = 0;
								for (; i < len; i = i + 1) {
									employees[i] = results.rows.item(i);
								}
								log(len + ' rows found');
								callback(employees);
							}
						);
					}
				);
			},

			getLastSync: function(callback) {
				this.db.transaction(
					function(tx) {
						var sql = "SELECT MAX(lastModified) as lastSync FROM employee";
						tx.executeSql(sql, this.txErrorHandler,
							function(tx, results) {
								var lastSync = results.rows.item(0).lastSync;
								log('Last local timestamp is ' + lastSync);
								callback(lastSync);
							}
						);
					}
				);
			},

			sync: function(callback) {
				var self = this;
				log('Starting synchronization...');
				this.getLastSync(function(lastSync){
					self.getChanges(self.syncURL, lastSync,
						function (changes) {
							if (changes.length > 0) {
								self.applyChanges(changes, callback);
							} else {
								log('Nothing to synchronize');
								callback();
							}
						}
					);
				});

			},

			getChanges: function(syncURL, modifiedSince, callback) {
				$.ajax({
					url: syncURL,
					data: {modifiedSince: modifiedSince},
					dataType:"json",
					success:function (data) {
						log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
						callback(data);
					},
					error: function(model, response) {
						alert(response.responseText);
					}
				});

			},

			applyChanges: function(employees, callback) {
				this.db.transaction(
					function(tx) {
						var l = employees.length;
						var sql =
							"INSERT OR REPLACE INTO employee (id, firstName, lastName, title, officePhone, deleted, lastModified) " +
							"VALUES (?, ?, ?, ?, ?, ?, ?)";
						log('Inserting or Updating in local database:');
						var e;
						for (var i = 0; i < l; i++) {
							e = employees[i];
							log(e.id + ' ' + e.firstName + ' ' + e.lastName + ' ' + e.title + ' ' + e.officePhone + ' ' + e.deleted + ' ' + e.lastModified);
							var params = [e.id, e.firstName, e.lastName, e.title, e.officePhone, e.deleted, e.lastModified];
							tx.executeSql(sql, params);
						}
						log('Synchronization complete (' + l + ' items synchronized)');
					},
					this.txErrorHandler,
					function(tx) {
						callback();
					}
				);
			},

			txErrorHandler: function(tx) {
				alert(tx.message);
			}
		};

		dao.initialize(function() {
			console.log('database initialized');
		});
		
	}

	function renderList(employees) {
		log('Rendering list using local SQLite data...');
		dao.findAll(function(employees) {
			$('#list').empty();
			var l = employees.length;
			for (var i = 0; i < l; i++) {
				var employee = employees[i];
				$('#list').append('<tr>' +
					'<td>' + employee.id + '</td>' +
					'<td>' +employee.firstName + '</td>' +
					'<td>' + employee.lastName + '</td>' +
					'<td>' + employee.title + '</td>' +
					'<td>' + employee.officePhone + '</td>' +
					'<td>' + employee.deleted + '</td>' +
					'<td>' + employee.lastModified + '</td></tr>');
			}
		});
	}

	function log(msg) {
		$('#log').val($('#log').val() + msg + '\n');
	}


	$('body').on("vclick", "a.footervideolink", function (e) {
		// report('footer clicked');
		if (footervideoStatus != true) {
			$("#footer").animate({
				height: "60%",
			}, 300, function () {
				footervideoStatus = true;
			});
			return false;		
		}
		else {
			$("#footer").animate({
				height: "20px",
			}, 300, function () {
				footervideoStatus = false;
			});
			return false;
		}
	});

	$('body').on("vclick", "a.showMenu", function (e) {
		if (menuStatus != true) {
			$(".ui-page-active").animate({
				marginLeft: "175px",
			}, 300, function () {
				menuStatus = true;
			});
			return false;
		} else {
			$(".ui-page-active").animate({
				marginLeft: "0px",
			}, 300, function () {
				menuStatus = false;
			});
			return false;
		}
	});
	$('body').on("vclick", "#menuelement a.contentLink", function (e) {
		$(".ui-page-active").animate({
			marginLeft: "0px",
		}, 300, function () {
			menuStatus = false;
			// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
		});
		return false;
	});
	
	$('body').on('vclick', '#reset', function() {
		report('reset');
		dao.dropTable(function() {
		   // dao.createTable();
		});
	});

	$('body').on('vclick', '#create', function() {
		report('create');
		dao.createTable();
	});

	$('body').on('vclick', '#sync', function() {
		report('sync');
		dao.sync(renderList);
	});

	$('body').on('vclick', '#render', function() {
		report('render');
		renderList();
	});

	$('body').on('vclick', '#clearLog', function() {
		report('clearLog');
		$('#log').val('');
	});

	// Initialize the app
	app.initialize();
	
	// Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);
