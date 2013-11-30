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

	window.addEventListener('load', function () {
		new FastClick(document.body);
	}, false);

	window.dao =  {

		// syncURL: "../api/employees",
		syncURL: "http://coenraets.org/offline-sync/api/employees?modifiedSince=2010-03-01%2010:20:56",

		initialize: function(callback) {
			var self = this;
			// renderList();
			this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);

			// Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
			// no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
			// does not already exist.
			this.db.transaction(
				function(tx) {
					tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='employee'", this.txErrorHandler,
						function(tx, results) {
							if (results.rows.length == 1) {
								console.log('Using existing Employee table in local SQLite database');
							}
							else
							{
								console.log('Employee table does not exist in local SQLite database');
								self.createTable(callback);
							}
					});
					self.sync(renderList);
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
					console.log('Table employee successfully CREATED in local SQLite database');
					callback();
				}
			);
		},
		
		fillTable: function(callback) {
			this.db.transaction(
				function(tx) {
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
					console.log('Table employee successfully FILLED in local SQLite database');
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
					console.log('Table employee successfully DROPPED in local SQLite database');
					callback();
				}
			);
		},

		findAll: function(callback) {
			this.db.transaction(
				function(tx) {
					var sql = "SELECT * FROM EMPLOYEE";
					console.log('Local SQLite database: "SELECT * FROM EMPLOYEE"');
					tx.executeSql(sql, this.txErrorHandler,
						function(tx, results) {
							var len = results.rows.length,
								employees = [],
								i = 0;
							for (; i < len; i = i + 1) {
								employees[i] = results.rows.item(i);
							}
							console.log(len + ' rows found');
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
							console.log('Last local timestamp is ' + lastSync);
							callback(lastSync);
						}
					);
				}
			);
		},

		sync: function(callback) {
			var self = this;
			console.log('Starting synchronization...');
			this.getLastSync(function(lastSync){
				self.getChanges(self.syncURL, lastSync,
					function (changes) {
						if (changes.length > 0) {
							self.applyChanges(changes, callback);
						} else {
							console.log('Nothing to synchronize');
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
					console.log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
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
					console.log('Inserting or Updating in local database:');
					var e;
					for (var i = 0; i < l; i++) {
						e = employees[i];
						console.log(e.id + ' ' + e.firstName + ' ' + e.lastName + ' ' + e.title + ' ' + e.officePhone + ' ' + e.deleted + ' ' + e.lastModified);
						var params = [e.id, e.firstName, e.lastName, e.title, e.officePhone, e.deleted, e.lastModified];
						tx.executeSql(sql, params);
					}
					console.log('Synchronization complete (' + l + ' items synchronized)');
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

	/*
	$(window).bind('hashchange', function(){
		// currentHash = window.location.hash;
		// console.log(window.location.hash);
		// alert('MobileInit.js '+window.location.hash);
		populateDeviceInfoTimer();
	});
	*/	


	function renderList(employees) {
		alert('Rendering list using local SQLite data...');
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

	// $(document).on('login', function () {
	/*
	$('body').on("login", function () {
		alert('doing action login');
		FB.login(function(response) {
			alert("Logged In");
		}, {scope: 'publish_actions,user_status,friends_status,read_stream'});
		return false;
	});
	*/
	
	$('#footervideolink').on("vclick", function (e) {
		// report('footer clicked');
		if (footervideoStatus != true) {
			$("#footer").animate({
				height: "60%",
			}, 300, function () {
				footervideoStatus = true;
			});
		}
		else {
			$("#footer").animate({
				height: "20px",
			}, 300, function () {
				footervideoStatus = false;
			});
		}
		return false;
	});

	$('#showMenu').on("vclick", function (e) {
		if (menuStatus != true) {
			$("#flexiblecontent").animate({
				marginLeft: "190px",
			}, 300, function () {
				menuStatus = true;
			});
		} else {
			$("#flexiblecontent").animate({
				marginLeft: "0px",
			}, 300, function () {
				menuStatus = false;
			});
		}
		return false;
	});
	$('#sidebar').on("vclick", "#menuelement a.contentLink", function (e) {
		$("#flexiblecontent").animate({
			marginLeft: "0px",
		}, 300, function () {
			menuStatus = false;
			// alert('getURLParameter(window.location.href): ' + getURLParameter(window.location.href));
			// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
			// $.mobile.changePage( "#aboutus" , { reverse: false, changeHash: false } );
		});
		// return false;
	});
	
	/*
	$('body').on('vclick', '#reset', function() {
		report('reset');
		dao.dropTable(function() {
		   // dao.createTable();
		});
	});

	$('body').on('vclick', '#create', function() {
		report('create');
		dao.createTable();
		return false;
	});

	$('body').on('vclick', '#fill', function() {
		report('fill');
		dao.fillTable();
		return false;
	});

	$('body').on('vclick', '#sync', function() {
		report('sync');
		dao.sync(renderList);
		return false;
	});

	$('body').on('vclick', '#render', function() {
		report('render');
		renderList();
		return false;
	});

	$('body').on('vclick', '#clearLog', function() {
		report('clearLog');
		$('#log').val('');
		return false;
	});
	*/

	// Initialize the app
	app.initialize();

	$.when(dd, jqd).done(function doInit() {
		alert('dd and jqd ready');
		// if (isMobile.any()) {
			dao.initialize(function() {
				alert('database initialized');
			});
		// }
		var isTouch = !!('ontouchstart' in window);
		document.getElementById('body').setAttribute('class', isTouch ? 'touch' : 'desktop');    
		$('.scrollable').pullToRefresh({
			callback: function() {
				var def = $.Deferred();
				setTimeout(function() {
					def.resolve();
				}, 3000);
				return def.promise();
			}
		});
		// populateDeviceInfoTimer();
		// Returns the MobileRouter class
	});
	
	// Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);
