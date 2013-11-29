var isMobile = {};
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

if(isMobile.any()){ 
	// alert("document.write >> <script type='text/javascript' src='" + rootURL + "phonegap.js'></script>");
    document.write("<script type='text/javascript' src='" + rootURL + "phonegap.js'></script>"); 
    // initApp();
}else{
    console.log('NOT-DEVICE-MODE: Skipping loading of [phonegap.js] and plugins...');    
}

var currentHash = window.location.hash;

var imagePath = '';

var menuStatus = false;
var footervideoStatus = false;

var rootURL = "";
var root = this; // used by pdfbrowser and childbrowser
var deviceSDID;
var cordovaIsLoaded = false;
var deviceSDID = "???";
var SDID_DOMAIN = 'phonegap.appinaut.de';  
var SDID_KEY = '633241';

var my_media;
var platformId = null;
var CameraPopoverOptions = null;
var pictureUrl = null;
var fileObj = null;
var fileEntry = null;
var pageStartTime = +new Date();

//default camera options
var camQualityDefault = ['quality value', 50];
var camDestinationTypeDefault = ['FILE_URI', 1];
var camPictureSourceTypeDefault = ['CAMERA', 1];
var camAllowEditDefault = ['allowEdit', false];
var camEncodingTypeDefault = ['JPEG', 0];
var camMediaTypeDefault = ['mediaType', 0];
var camCorrectOrientationDefault = ['correctOrientation', false];
var camSaveToPhotoAlbumDefault = ['saveToPhotoAlbum', true];

var badgeToggledOn = false;
var autoLockIsDisabled = false;
var cdvBadge = null;

var deviceReady = false;

var jqueryready = false;
var jqueryReady = false;

// var pgReady = $.Deferred();

/*
function populateData(){
	report('MobileInit.js >> populateData() START');
	// report('MobileInit.js','populateData() START');
	// doreport('TEST','--> populateData()..');
	try {
		// report('populateData');
		// if (!device) report('device not defined');
		// else report('device defined');
		// document.getElementById("device_internet").innerHTML = 'bla';
		document.getElementById("user_agent").textContent = navigator.userAgent;
		document.getElementById("platform").innerHTML = device.platform;
	} catch(e){ 
		catchError('populateData()',e); 
	}
}
*/

/*
require(["jquery"],
	function($) {
		$(document).on("pageshow", function(){
			alert('pageshow');
			document.getElementById("device_internet").innerHTML = 'NOT MOBILE';
		});
       // Instantiates a new Mobile Router instance
		new MobileRouter();
	}
);
*/
var app = {
	initialize: function() {
		report('MobileInit.js','var app:initialize');
		this.bindEvents();
	},
	bindEvents: function() {
		if(!isMobile.any()) {
			this.onDeviceReady();
		}
		else {
			// document.addEventListener('load', this.onDeviceReady, false);
			// document.addEventListener('offline', this.onDeviceReady, false);
			// document.addEventListener('online', this.onDeviceReady, false);
			document.addEventListener('deviceready', this.onDeviceReady, false);
		}
	},
	onDeviceReady: function() {
		report('MobileInit.js','onDeviceReady');
		/*
		deviceReady = true;
		cordovaIsLoaded = true;
		app.receivedEvent('deviceready');
		*/
		app.receivedEvent();
   },
	receivedEvent: function(event) {
		report("MobileInit.js"," var app:receivedEvent");
		deviceReady = true;
		cordovaIsLoaded = true;
		dd.resolve();
		// populateDeviceInfo();
		/*
		setTimeout(function() {
			report('MobileInit.js','app.receivedEvent w timeout 0');
			$( document ).ready(function() {
				report('MobileInit.js','app.receivedEvent AND document.ready in w timeout 0');
			});
		},0);
		*/
	}
};
		
/* ----------------------------------------------------------- /
    initApp
/ ----------------------------------------------------------- */
/*
function initApp(){
    report('TEST','--> initApp()..');  
    try{
		// $(document).ready(function(){
		doAlert('initApp','Native Message');
		// populateDeviceInfo();
        // });
    }catch(e){ catchError('initApp()',e); }            
}
*/

function checkFileExists(fileName){
    var http = new XMLHttpRequest();
    http.open('HEAD', fileName, false);
    http.send(null);
    return (http.status != 404);
}


/* ----------------------------------------------------------- /
 populateDeviceInfo (incl. Timer)
/ ----------------------------------------------------------- */
function populateDeviceInfoTimer() {
	setTimeout(function() {
		populateDeviceInfo();
		// window.scrollTo(0, 1); 
	},3000);
}

function populateDeviceInfo(){
	report('functions.js','populateDeviceInfo() START');
	// doAlert('TEST','--> populateDeviceInfo()..');
	// $( document ).delegate("#pageid", "pageinit", function() {  
	// $( document ).ready(function() {
	// $("#page-content").on('pagebeforeshow', function() {
	// });
    try {
	
		currentHash = window.location.hash;
		if (currentHash=='') currentHash = '#home';
		// alert('functions.js, hash: '+currentHash);
		switch(currentHash) {
			case "#home":
			
				if (isMobile.any()) {
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
						imagePath = fs.root.fullPath + "/photoshot.png"; // full file path
						// alert(imagePath);
						document.getElementById('camera_image_b').src = imagePath;
					});
				}

				var id = 'devicereadydiv';
				var parentElement = document.getElementById(id);
				var listeningElement = parentElement.querySelector('.listening');
				listeningElement.setAttribute('style', 'display:none;');
				var receivedElement = parentElement.querySelector('.received');
				receivedElement.setAttribute('style', 'display:block;');
				if(!isMobile.any()) {
					report('populateDeviceInfo()','isMobile.any NOT true');
					// alert('populateDeviceInfo');
					document.getElementById("device_internet").innerHTML = 'NOT MOBILE';
				}
				else {
					report('populateDeviceInfo()','isMobile.any IS true');
					// alert('populateDeviceInfo');
					// document.getElementById("device_internet").innerHTML = 'IS MOBILE';
					modifyiOS7StatusBar();

					var id = 'devicereadydiv';
					var parentElement = document.getElementById(id);
					var listeningElement = parentElement.querySelector('.listening');
					listeningElement.setAttribute('style', 'display:none;');
					var receivedElement = parentElement.querySelector('.received');
					receivedElement.setAttribute('style', 'display:block;');

					document.getElementById("device_internet").innerHTML = isConnectedToInternet();
					// if (document.getElementById("device_internet")) document.getElementById("device_internet").innerHTML = 'IS MOBILE';
					document.getElementById("user_agent").innerHTML = navigator.userAgent;
					document.getElementById("platform").innerHTML = device.platform;
					// document.getElementById("version").innerHTML = device.version;
					document.getElementById("uuid").innerHTML = device.uuid;
					document.getElementById("name").innerHTML = device.name;
					document.getElementById("model").innerHTML = device.model;
					document.getElementById("width").innerHTML = screen.width;
					document.getElementById("height").innerHTML = screen.height;
					document.getElementById("colorDepth").innerHTML = screen.colorDepth;
					// document.getElementById("device_conn").innerHTML = getConnectionType();
					// $('#device_conn span').html(getConnectionType());
					// $('#device_platform span').html(getDevicePlatform());
					// $('#device_model span').html(getDeviceModel());
					// $('#device_os span').html(getOS());
					// $('#device_version span').html(getDeviceVersion());
					// $('#device_internet span').html(isConnectedToInternet());
					// doAlert('$(#device_conn span).html(getConnectionType());','--> populateDeviceInfo()..');
				}
			break;
		}
	}catch(e){ 
		catchError('populateDeviceInfo()',e); 
	}
}

function isConnectedToInternet(){
	var connectionType = getConnectionType();
	return (
			(connectionType.toUpperCase().indexOf("NO NETWORK",0) == -1) &&
			(connectionType.toUpperCase().indexOf("UNKNOWN",0) == -1)
			);
}

function getConnectionType() {
	if(cordovaIsLoaded != true){
		// simulate offline with querystring ?OFFLINE=1
		if(getURLParameter("OFFLINE") != ""){
			return "No network connection";	
		}else{
			return "wifi";	
		}		
	} 
    var networkState = navigator.connection.type;//navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    // alert('Connection type: ' + states[networkState]);
	return states[networkState];
}

/* ----------------------------------------------------------- /
    postDeviceReadyActions
/ ----------------------------------------------------------- */
/*
function postDeviceReadyActions(){
    //report('TEST','--> postDeviceReadyActions()..');  
    try{
		// doAlert('cordovaJsLoaded');
		// test_SplashScreen();
        console.log('Device Ready!');
        cordovaIsLoaded = true;        
        // initApp();
    }catch(e){ catchError('postDeviceReadyActions()',e); }            
}
*/

/* ----------------------------------------------------------- /
    modifyiOS7StatusBar
/ ----------------------------------------------------------- */
function modifyiOS7StatusBar(){
    try{
        StatusBar.overlaysWebView(false);
		StatusBar.styleLightContent();
		StatusBar.backgroundColorByName("black");
		// StatusBar.backgroundColorByHexString("#3e8fd9");
		/*
		if (parseFloat(window.device.version) === 7.0) {
			  document.body.style.marginTop = "20px";
		}
		*/
    }catch(e){ catchError('modifyiOS7StatusBar()',e); }            
}

function debugModeEnabled(){
    return true; //false;
}

/* ----------------------------------------------------------- /
    report
/ ----------------------------------------------------------- */
function report(logtype,msg){
    try{
		// alert(logtype + ': ' + msg);
        console.log(logtype + ': ' + msg);
    }catch(e){ 
        // give up
    }            
}


/* ----------------------------------------------------------- /
 splashScreenTest
 / ----------------------------------------------------------- */
function test_SplashScreen(){
    report('TEST','--> splashScreenTest()..');
    try{
        if(!cordovaIsLoaded){
            doAlert('Sorry: The [SplashScreen] plugin only works on an actual device.','Plugin Error');
            return false;
        }
        doAlert('App splashscreen will now be shown for a few seconds, then dismissed. If something goes wrong you\'ll have to exit the app manually.','cordova-splashscreen');
        cordova.exec(null, null, 'SplashScreen', 'show', []);
        var splashClear = window.setTimeout(function(){
			cordova.exec(null, null, 'SplashScreen', 'hide', []);
		},2500);
    }catch(e){ catchError('splashScreenTest()',e); }
}


/* ----------------------------------------------------------- /
 test_InAppBrowser
 / ----------------------------------------------------------- */
function test_InAppBrowser_WithOptions(){
    report('TEST','--> test_InAppBrowser()..');
    try{
        
        if(!cordovaIsLoaded){
            doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
        }
        
        
        var windowHeight, windowWidth, viewX, viewY;
        var iab;
        viewX = 200;
        viewY = 0;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth-200;
    
        iab = window.open('http://www.ign.com','_blank',
                              'enableviewportscale=yes,' +
                              'location=yes,' +
                              'vw=' + windowWidth + ',' +
                              'vh=' + windowHeight + ',' +
                              'vx=' + viewX + ',' +
                              'vy=' + viewY);
        iab.addEventListener('loadstart', function(){ $('body').addClass('inappbrowser_windowed_mode'); });
        iab.addEventListener('exit', function(){ $('body').removeClass('inappbrowser_windowed_mode'); });
        
    }catch(e){ catchError('test_InAppBrowser()',e); }
}

/* ----------------------------------------------------------- /
 test_InAppBrowser_NoOptions
 / ----------------------------------------------------------- */
function test_InAppBrowser_NoOptions(){
    report('TEST','--> test_InAppBrowser_NoOptions()..');
    try{
        //doAlert('Website will now be opened via InAppBrowser [window.open]','cordova-inappbrowser');
        window.open('http://www.ign.com','_blank','fullscreenbuttonenabled=no');
    }catch(e){ catchError('test_InAppBrowser_NoOptions()',e); }
}


/* ----------------------------------------------------------- /
 test_PDFBrowser
 / ----------------------------------------------------------- */
function test_PDFBrowser(){
    report('TEST','--> test_PDFBrowser()..');
    try{

        var pdfView;
        var windowHeight, windowWidth, viewX, viewY;
        viewX = 0;
        viewY = 0;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;

        pdfView = window.open('pdf/example.pdf','_blank',
                              'enableviewportscale=yes,fullscreenbuttonenabled=no,' +
                              'location=no,' +
                              'vw=' + windowWidth + ',' +
                              'vh=' + windowHeight + ',' +
                              'vx=' + viewX + ',' +
                              'vy=' + viewY);
    
        //pdfView.addEventListener('loadstart', function(){ setBodyPDFClass(); });
        //pdfView.addEventListener('exit', function(){ pdfView.close(); clearBodyPDFClass(); });


    }catch(e){ catchError('test_PDFBrowser()',e); }
}




/* ----------------------------------------------------------- /
 test_PDFBrowser_Form
 / ----------------------------------------------------------- */
function test_PDFBrowser_Form(){
    report('TEST','--> test_PDFBrowser_Form()..');
    try{
        if(!cordovaIsLoaded){
            doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
        }
        window.open('pdf/example.pdf','_blank','enableviewportscale=yes,presentationstyle=formsheet');
        
    }catch(e){ catchError('test_PDFBrowser_Form()',e); }
}


/* ----------------------------------------------------------- /
 test_PDFBrowser_Vertical
 / ----------------------------------------------------------- */
function test_PDFBrowser_Vertical(){
    report('TEST','--> test_PDFBrowser_Vertical()..');
    try{

        var pdfView;
        var windowHeight, windowWidth, viewX, viewY;
        viewX = 0;
        viewY = (window.innerHeight*.35)/2;                    
        windowHeight = window.innerHeight*.65;        
        windowWidth = window.innerWidth;
        
        pdfView = window.open('pdf/example.pdf','_blank',
                              'enableviewportscale=yes,' +
                              'location=no,' +
                              'vw=' + windowWidth + ',' +
                              'vh=' + windowHeight + ',' +
                              'vx=' + viewX + ',' +
                              'vy=' + viewY);            

    }catch(e){ catchError('test_PDFBrowser_Vertical()',e); }
}



/* ----------------------------------------------------------- /
 test_PDF_Windowed
 / ----------------------------------------------------------- */
function test_PDF_Windowed(){
    report('TEST','--> test_PDF_Windowed()..');
    try{
        
        if(!cordovaIsLoaded){
            doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
        }
        
        var windowHeight, windowWidth;
        var viewX = window.innerWidth*.05;
        var viewY = 0;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth*.90;
        
        var pdfView = window.open('pdf/example.pdf','_blank',
                              'enableviewportscale=yes,' +
                              'location=no,' +
                              'vw=' + windowWidth + ',' +
                              'vh=' + windowHeight + ',' +
                              'vx=' + viewX + ',' +
                              'vy=' + viewY);     
        pdfView.addEventListener('loadstart', function(){ $('body').addClass('inappbrowser_windowed_mode'); });
        pdfView.addEventListener('exit', function(){ $('body').removeClass('inappbrowser_windowed_mode'); });
        
    }catch(e){ catchError('test_PDF_Windowed()',e); }
}




function test_SDID(){
    report('TEST','--> test_SDID()..');
    try{
        if(!cordovaIsLoaded){
            doAlert('Sorry: The [SecureDeviceIdentifier] plugin only works on an actual device.','Plugin Error');
            return false;
        }
        getDeviceID();
        var id = window.setTimeout(function(){
                                   report('TEST','deviceSDID: ' + deviceSDID + '...');
                                   $('#device_id').html(deviceSDID);
                                   },1000);
        doAlert('Unique Device ID will be retrieved momentarily - please wait.','cordova-securedeviceidentifier');
        
        
    }catch(e){ catchError('test_SDID()',e); }
}

/* ----------------------------------------------------------- /
 test_PowerManagement
 / ----------------------------------------------------------- */
function test_PowerManagement(){
    report('TEST','--> test_PowerManagement()..');
    try{
        
        if(!cordovaIsLoaded){
            doAlert('Sorry: The [PowerManagement] plugin only works on an actual device.','Plugin Error');
            return false;
        }
        
        
        if(!autoLockIsDisabled){
            PWpreventAutoLock();
            autoLockIsDisabled = true;
            $('#powermgmt_status').html('AUTO DIM/LOCK: <b>DISABLED</b>');
            doAlert('App will now PREVENT auto lock/auto dim. Please wait a 30-60 seconds to confirm.','cordova-powermanagement');
        }else{
            PWreenableAutoLock();
            autoLockIsDisabled = false;
            $('#powermgmt_status').html('AUTO DIM/LOCK: <b>ENABLED</b>');
            doAlert('App will now ALLOW auto lock/auto dim as normal. Please wait a 30-60 seconds to confirm.','cordova-powermanagement');
        }
        
    }catch(e){ catchError('test_PowerManagement()',e); }
}


/* ----------------------------------------------------------- /
 test_Badge
 / ----------------------------------------------------------- */
function test_Badge(){
    
    try{
        
        if(!cordovaIsLoaded){
            doAlert('Sorry: The [Badge] plugin only works on an actual device.','Plugin Error');
            return false;
        }
        
        cdvBadge = window.plugins.badge;
        
        report('TEST','--> test_Badge().. [cdvBadge:' + cdvBadge + '?]');
        
        if(badgeToggledOn){
            if(cdvBadge != undefined){
                cdvBadge.set(0);
                cdvBadge.clear();
            }
            doAlert('App Icon Badge Removed!\n\nExit app to confirm.','cordova-badge');
            badgeToggledOn = false;
            
        }else{
            if(cdvBadge != undefined) cdvBadge.set(1);
            doAlert('App Icon Badge Added!\n\nExit app to confirm.','cordova-badge');
            badgeToggledOn = true;
        }
        
    }catch(e){ catchError('test_Badge()',e); }
}

/* DEBUG */ 
// window.console.log('js/tests.js loaded...');

/* --------------------------------------- */
function doAlert(message, title){
	try{
		var alertText = message;
		var alertTitle = title;
		if(isValidString(alertTitle)==false) title = 'Default Native Message';
		if(usingMobileDevice() && isNativeAppMode()){
			navigator.notification.alert(
			alertText,  // message
			alertDismissed,         // callback
			alertTitle,            // title
			'OK'                  // buttonName
			);		
		}else{
			alert(alertTitle + "\n\n" + alertText);
		}	
		// alert('VERBOSE >> doAlert() --> [' + alertTitle + ' | ' + alertText);
		report('VERBOSE','doAlert() --> [' + alertTitle + ' | ' + alertText);
		return false;		
	}catch(ex){
		catchError('doAlert()',ex);
	}	
	
}

/* ---------------------------------------- */
function alertDismissed(e){
    // nothing - just stub function
    return false;
}



/* --------------------------------------- */
// NOTE: callback button index must be 1 (the first one)
function doConfirm(confirmText, confirmTitle, confirmCallback, confirmButtonLabels){
	try{
		if(typeof(confirmButtonLabels) == 'undefined') confirmButtonLabels = ('Yes,No').split(",");
		report('doConfirm() [confirmText:' + confirmText + ', confirmCallback:' + confirmCallback + ']');
		if(usingMobileDevice() && isNativeAppMode()){
		  //fadePageContentOutBeforePopup();
		   navigator.notification.confirm(
				confirmText,
				confirmCallback,
				confirmTitle,
				confirmButtonLabels          
			);	
			//fadePageContentInAfterPopup();
		}else{
			var confirmDecisionIndex = 2; // represents "false"
			if(confirm(confirmText)) confirmDecisionIndex = 1;
			confirmCallback(confirmDecisionIndex);
		}		
	}catch(ex){
		catchError('doConfirm()',ex);
	}	
}

/* --------------------------------------- */	
function isValidString(str){
	if(
		(typeof(str) != 'undefined') &&
		(str != '') &&
		(str != undefined) &&
		(str != null) &&
		(str != 'undefined')
	){
		return true;
	}else{
		return false;
	}
}

/* --------------------------------------- */
function isIOSSimulatorMode(){
	var _isIOSSimulatorMode = false;; 
	try{
		if(!usingMobileDevice()) return false;
		var _platform = getDeviceType().toUpperCase();// device.name
		_isIOSSimulatorMode =(_platform.indexOf('SIMULATOR',0) > -1);		
	}catch(ex){
		catchError('isIOSSimulatorMode()',ex);
	}
	//window.console.log('isIOSSimulatorMode(' + _isIOSSimulatorMode + ') platform:' +  device.name);
	return _isIOSSimulatorMode;	
}


/* --------------------------------------- */
function isNativeAppMode(){
	// re-test if/when using non-Apple devices
	var isNative;
	var isSafari = navigator.userAgent.match(/Safari/i) != null;
	if((document.location.href.toUpperCase().indexOf('FILE://',0) > -1) && (usingMobileDevice())){
		isNative = true;
	}else{
		isNative = false;
	}
	// report('\t\t isNativeAppMode() isSafari [' + isSafari + '] [isNative "FILE:" link?:' + isNative + ']');
	//*DEBUG */ report('--> isNativeAppMode(' + isNative + ')');
	return isNative;
}

function usingMobileDevice(){
	var _isMobile = isMobile.any(); // globals.js
	// var userAgent = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	return _isMobile;
}

// DEVICE DETECTION: Device API mode
function isiPhone(){
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}

function nullClickEvent(e){ 	e.stopPropagation(); }


function getRandomID(){
	var dateNow = new Date();
	return String(Number(dateNow.getMilliseconds() * dateNow.getSeconds()));
}

function getDeviceID(){
	try{
		if(cordovaIsLoaded){			
			// _id = device.uuid; uuid deprecated...
            
            // this only works if SecureDeviceIdentifier plugin is loaded into xcode/app
            var secureDeviceIdentifier = window.plugins.secureDeviceIdentifier;            
            /* DEBUG */ // doAlert('getDeviceID() [secureDeviceIdentifier:' + secureDeviceIdentifier + ']');
            
            secureDeviceIdentifier.get({
                domain: SDID_DOMAIN,
                key: SDID_KEY
            }, function(udid) {                
                /* DEBUG */ //   navigator.notification.alert("SecureUDID=" + udid);
                deviceSDID = udid;
                // navigator.notification.alert("SecureUDID=" + udid);
                // report('TEST','CORDOVA: DEVICE ID:' + deviceSDID);
                /* DEBUG */ //  alert(deviceSDID);
                return deviceSDID;
            })                        
            // report('TEST',"*** plugins.uniqueDeviceId.secureDeviceIdentifier() ID?:" + _id + "***");            	
            // report('TEST','WEB: DEVICE ID:' + deviceSDID);
        }else{
        	deviceSDID = "UNKNOWN (" + getDeviceType() + ")";
        }
	}
	catch(e){
		report('ERROR','ERROR with getDeviceID() [' + e.message + ']');
	}
}

function getDeviceType(){
	var type;
	try{
		if(cordovaIsLoaded){
            type = device.model; // "name" deprecated after CDV 2.3 name;  // iPhone, iPad, iPod Touch
		}else{
			 type = "WebBrowser";
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceType() [' + e.message + ']');
	}
	return type;
}

function getOSVersionFromUserAgent(){
	report('TEST','--> getOSVersionFromUserAgent()..');	
	try{
		var _parts1 = navigator.userAgent.split("(");
		var _parts2 = _parts1[1].split(";");

		return _parts2[0];												
	}catch(e){ catchError('getOSVersionFromUserAgent()',e); }			
}

function getOS(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";	
	if((navigator.appVersion.indexOf("Mobile")!=-1)) OSName += " Mobile";
	if(cordovaIsLoaded){
		OSName = device.platform;
	}
	return OSName;	
}

function getDeviceVersion(){
	var version;
	// notworking?
	try{
		if(cordovaIsLoaded){
            version = getOS() + ' ' + device.version; // "name" deprecated after CDV 2.3 name;  // iPhone, iPad, iPod Touch
		}else{
		 	 version = getOSVersionFromUserAgent();		 	 
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceVersion() [' + e.message + ']');
	}
			
	return version;
}

function getDeviceModel(){
	var model;
	try{
		if(cordovaIsLoaded){
			model = device.model; // iPad 2,5			
		}else{
			model = getOS();
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceModel() [' + e.message + ']');
	}
	report('VERBOSE','DEVICE NAME:' + model);	
	return model; 
}

function getDevicePlatform(){
	var platform;
	try{
		if(cordovaIsLoaded){
			if(isIOSSimulatorMode()){
				platform = "iOS Simulator";
			}else{
				platform = device.platform; // iPad, iPhone	
			}
			
		}else{
			platform = getDeviceType(); // WebBrowser likely
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDevicePlatform() [' + e.message + ']');
	}
	report('VERBOSE','DEVICE NAME:' + platform);	
	return platform; 
}

function removeNonAlphaNumericChars(str){	
	str = str.replace(/[ ]+/g,'_');
	str = str.replace(/[^a-zA-Z0-9_-]+/g,'');
	return str;	
}

function removeProtectedDelimeters(str){		
	str = str.replace(/[,;|]+/g,'');
	return str;	
}

function openExternalURL(strURL){	
    // https://itunes.apple.com/us/app/isitlead/id637464156?ls=1&mt=8
    try{
		if(!isConnectedToInternet()){
			doGenericConnectionAlert();
			return false;
		}
        // doAlert('openExternalURL(' + strURL + ')... MODE (TBD)...');
		// window.open(strURL, '_system'); //, 'location=yes');	
		if(
			((isIOSSimulatorMode()) || (!isMobile.any())) &&
			(strURL.toUpperCase().indexOf('ITUNES.APPLE.COM',0)>-1)
			){
			alert('App Store links do not work in web browsers or device simulators. Please try this feature on a mobile device to confirm it is working properly.','App Store Link');
			return false;
		}
		// inAppBrowser method --> window.open(strURL, '_system'); //, 'location=yes');
	     // ChildBrowser Method // /*cb = child browser cordova plugin*/
	     if(cb != null)
	     {
	     	window.console.log('openExternalURL(' + strURL + ') [CORDOVA mode]..');
	         cb.onLocationChange = function(loc){ root.locChanged(loc); };
	         cb.onClose = function(){root.onCloseBrowser()};
	         cb.onOpenExternal = function(){root.onOpenExternal();};		
	         //window.console.log(strURL);
	         // cb.showWebPage(strURL);
	         // window.plugins.childBrowser.showWebPage(strURL);
	         window.open(strURL,'_blank','location=no'); 
	     }else{
	         // if(            	
	         // 	(!isNativeAppMode()) && 
	         // 	(usingMobileDevice())
	         // 	){
			window.console.log('openExternalURL(' + strURL + ') [TEST/BROWSER mode].. {isNativeAppMode:' + isNativeAppMode() + '| usingMobileDevice:' + usingMobileDevice() + '}');
	         if(confirm('HTML5 External URLs are not fully functional when viewing on the iOS Simulator - do you want to view the URL anyway?')){
	             document.location.href = strURL;
	             /* 20130716: window.open not working in CHrome??? */ // window.open(strURL,'_blank'); 
	         }else{
	         	return false;			
	         }		
	         //}                                   
	     }
    }catch(e){
        catchError('openExternalURL()...',e);
    }	
} 


/* ------------------------------------ */
function onCloseBrowser()
{    
    window.console.log('onCloseBrowser()...');
    if(iTunesUpdateURLLoaded) iTunesUpdateURLLoaded = false;
}

/* ------------------------------------ */
function locChanged(loc) { window.console.log('locChanged()...');   }
function onOpenExternal(){ window.console.log('onOpenExternal()...'); }    

function isiPhone(){
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}


/*
function scrollToTop(){
	$(window).scrollTop(0); //window.scrollTo(0,0);
}
*/

function getURLParameter(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


function getUniqueIDString(){
	var time = new Date();
	return String(time.getMilliseconds() + time.getSeconds() + time.getDate());
}


function clearTimeoutVar(tVar){
	try{
		if(typeof(tVar) != 'undefined'){
			window.clearTimeout(tVar);
		}											
	}catch(e){ catchError('clearTimeoutVar()',e); }					
}

function clearIntervalVar(iVar){
	try{
		if(typeof(iVar) != 'undefined'){
			window.clearInterval(iVar);
		}											
	}catch(e){ catchError('clearIntervalVar()',e); }					
}

// onSuccess Callback
//
function cordovaOnSuccess() {
	console.log("playAudio():Audio Success");
}

// onError Callback 
//
function cordovaOnError(error) {
	alert('code: '    + error.code    + '\n' + 
		  'message: ' + error.message + '\n');
}


/* ----------------------------------------------------------- /
	isDisabled(element)	
/ ----------------------------------------------------------- */
function isDisabled(element){
	report('VERBOSE','--> isDisabled()..');	
	try{
		return ($(element).hasClass('disabled'));
												
	}catch(e){ catchError('isDisabled()',e); }			
}



function hideKeyboard(){
	document.activeElement.blur();
	$("input").blur();
	$("body").focus();
};

function validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function doGenericConnectionAlert(){
	doAlert('This feature requires an internet connection. Please connect this device to a WiFi or a 3G/4G network and try again.','Internet Connection Required');
}	

function secondsBetweenTwoDates(date1, date2){	
	var difference = (date2 - date1) / 1000;
	return difference;
}


/* ----------------------------------------------------------- /
	getBasicTimeString
	example: 5:23 PM
/ ----------------------------------------------------------- */
function getBasicTimeString(h,m,excludeSuffix){
	try{
		var _hour = h;
		var _min = m;
		var _ampm = "AM";
        if(_hour > 11){ _ampm = "PM";}		
		if(_hour > 12){ _hour -= 12;}		
		// integrate [excludeSuffix] later
		if(_min < 10) _min = "0" + m.toString();
		_timeString = _hour + ":" + _min + " " + _ampm;		
		report('TEST','--> getBasicTimeString(h:' + h + ',m:' + m + ',excludeSuffix:' + excludeSuffix + ').. [' + _timeString + ']');	
		return _timeString;
	}catch(e){ catchError('getBasicTimeString()',e); }			
}		

function isEmpty(value){
  return (value == null || value.length === 0);
}

String.prototype.replaceAll = function(str1, str2, ignore){
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}


function sendEmail(strTo,strSubject,strBody){
	if(isEmpty(strTo)) return;
	if(isEmpty(strSubject)) strSubject = '';
	if(isEmpty(strBody)) strBody = '';
	//strBody += '------------------------' + getEncodedLineBreakChar(); // + '---- contacts ----' + getEncodedLineBreakChar() + emailContactsList;	
	if(emailComposerConfiguredInApp && cordovaIsLoaded){
		var emailArgs = {
			toRecipients:strTo,
			subject:strSubject,
			body:strBody,
			isHTML:false
		};
		cordova.exec(null, null, "EmailComposer", "showEmailComposer", [emailArgs]);
	}else{
		document.location = "mailto:" + strTo + "?Subject=" + strSubject + "&Body=" + strBody;
	}
}

function isLocalHost(){ 
	return (document.location.href.indexOf('localhost',0) > -1); 
}

/* ----------------------------------------------------------- /
    PWpreventAutoLock
/ ----------------------------------------------------------- */
function PWpreventAutoLock(){
    if(cordovaIsLoaded) report('TEST','--> PWpreventAutoLock()..'); 
    try{
        if(cordovaIsLoaded && isMobile.any()) cordova.require('cordova/plugin/powermanagement').acquire( powerMgmtSuccess, powerMgmtError );                                                
    }catch(e){ catchError('PWpreventAutoLock()',e); }           
}       

/* ----------------------------------------------------------- /
    PWpreventAutoLockButAllowDim
/ ----------------------------------------------------------- */
function PWpreventAutoLockButAllowDim(){
    if(cordovaIsLoaded) report('TEST','--> PWpreventAutoLockButAllowDim()..');  
    try{
        if(cordovaIsLoaded && isMobile.any()) cordova.require('cordova/plugin/powermanagement').dim( powerMgmtSuccess, powerMgmtError ); 
    }catch(e){ catchError('PWpreventAutoLockButAllowDim()',e); }            
}       

/* ----------------------------------------------------------- /
    PWreenableAutoLock
/ ----------------------------------------------------------- */
function PWreenableAutoLock(){
    if(cordovaIsLoaded) report('TEST','--> PWreenableAutoLock()..');    
    try{
        if(cordovaIsLoaded && isMobile.any()) cordova.require('cordova/plugin/powermanagement').release( powerMgmtSuccess, powerMgmtError ); 
    }catch(e){ catchError('PWreenableAutoLock()',e); }          
}      

function powerMgmtError(error){ report('ERROR','powerMgmtError() [error(' + error + ')]'); }
function powerMgmtSuccess(success){ report('TEST','powerMgmtSuccess() success: ' + powerMgmtSuccess + '...');}

function catchError(f,e){
    // report('ERROR','ERROR in (' + f + ')[Error Message: ' + e.message + ']');
	doAlert('ERROR','ERROR in (' + f + ')[Error Message: ' + e.message + ']');
}






/*
CAMERA AND VIDEO FUNCTIONS
*/

//-------------------------------------------------------------------------
// Camera
//-------------------------------------------------------------------------

function clearStatus() {
	document.getElementById('camera_status').innerHTML = '';
	document.getElementById('camera_image').src = 'about:blank';
	var canvas = document.getElementById('canvas');
	canvas.width = canvas.height = 1;
	pictureUrl = null;
	fileObj = null;
	fileEntry = null;
}

function log(value) {
	console.log(value);
	document.getElementById('camera_status').textContent += (new Date() - pageStartTime) / 1000 + ': ' + value + '\n';
}

function setPicture(url, callback) {
	try {
		window.atob(url);
		// if we got here it is a base64 string (DATA_URL)
		url = "data:image/jpeg;base64," + url;
	} catch (e) {
		// not DATA_URL
		log('URL: ' + url.slice(0, 100));
	}    

	pictureUrl = url;
	var img = document.getElementById('camera_image');
	var startTime = new Date();
	img.src = url;
	
	alert(url);
	
	/*
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		alert("Root = " + fs.root.fullPath);
		log("Root = " + fs.root.fullPath);
		var directoryReader = fs.root.createReader();
		directoryReader.readEntries(function(entries) {
			var i;
			for (i=0; i<entries.length; i++) {
				log(entries[i].name);
			}
		}, function (error) {
			alert(error.code);
		})
	}, function (error) {
	alert(error.code);
	});
	*/

	if (isMobile.any()) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
			  imagePath = fs.root.fullPath + "/photoshot.png"; // full file path
			  var fileTransfer = new FileTransfer();
			  fileTransfer.download(url, imagePath, function (entry) {
				// alert(imagePath);
				alert(entry.fullPath); // entry is fileEntry object
				document.getElementById('camera_image_b').src = entry.fullPath;
			  }, function (error) {
				alert("Some error");
			  });
		});
	}

	img.onloadend = function() {
		log('Image tag load time: ' + (new Date() - startTime));
		callback && callback();
	};
}

function onGetPictureError(e) {
	log('Error getting picture: ' + e.code);
}

function getPicture() {
	// clearStatus();
	var options = extractOptions();
	log('Getting picture with options: ' + JSON.stringify(options));
	var popoverHandle = navigator.camera.getPicture(getPictureWin, onGetPictureError, options);

	// Reposition the popover if the orientation changes.
	window.onorientationchange = function() {
		var newPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, 0);
		popoverHandle.setPosition(newPopoverOptions);
	}
}

function getPictureWin(data) {
	setPicture(data);
	// TODO: Fix resolveLocalFileSystemURI to work with native-uri.
	if (pictureUrl.indexOf('file:') == 0) {
		resolveLocalFileSystemURI(data, function(e) {
			fileEntry = e;
			logCallback('resolveLocalFileSystemURI()', true)(e);
		}, logCallback('resolveLocalFileSystemURI()', false));
	} else if (pictureUrl.indexOf('data:image/jpeg;base64' == 0)) {
		// do nothing
	} else {
		var path = pictureUrl.replace(/^file:\/\/(localhost)?/, '').replace(/%20/g, ' ');
		fileEntry = new FileEntry('image_name.png', path);
	}
}

// TODO: File Transfer onProgress Download
// http://www.raymondcamden.com/index.cfm/2013/5/1/Using-the-Progress-event-in-PhoneGap-file-transfers

/*

*/

// Upload files to server
function uploadFile(mediaFile) {
	log('class uploadFile started');
	try {
		log('uploading '+mediaFile.fullPath);
		log('uploading '+mediaFile.name);
		// var ft = new FileTransfer(),
		// path = mediaFile.fullPath,
		// name = mediaFile.name;
		// ft.upload(path,
			// "http://mobile001.appinaut.de/upload.php",
			// function(result) {
				// console.log('Upload success: ' + result.responseCode);
				// console.log(result.bytesSent + ' bytes sent');
			// },
			// function(error) {
				// console.log('Error uploading file ' + path + ': ' + error.code);
			// },
			// { fileName: name }
		// );
	} catch (e) {
		// not DATA_URL
		log('class new FileTransfer not possible');
	}
	try {
		// do
		// console.log('video will now be played');
		// window.plugins.videoPlayer.play('file://'+path);
		// window.plugins.videoPlayer.play(path);
		// navigator.videoPlayer.play(path);
		// //  console.log("<video controls='controls'><source src='3.mp4' type='video/mp4' /></video>");
		// if (! mediaFile) {
			// mediaFile = new Media(mediaFile, null, mediaOnError);
		// }
		// my_media.play();
	} catch (E) {
		// else
		console.log('video cannot be played');
	}
	
	console.log('video will now be logged');
	// console.log("<video id='video_player' controls src='#' style='position: absolute; width: 320px; height: 200px;'></video>");
	var video_player = document.getElementById('video_player');
	var startTime = new Date();
	// alert(mediaFile.fullPath);			
	video_player.src = mediaFile.fullPath;
	video_player.onloadend = function() {
		consol.log('Video load time: ' + (new Date() - startTime));
	};
	console.log('video will now be played');
	my_media = new Media(mediaFile.fullPath, mediaOnSuccess, mediaOnError);
	my_media.play()
	
	log('class uploadFile ended');
}	

function mediaOnSuccess(data) {
	// nothing yet
}

function mediaOnError(error) {
	// $("#playMediaProperties").empty();
	// $("#playMediaProperties").append("ERROR: Cannot play audio. Code: " + error.code + " Message: " + error.message + "<br/>");
	// clearInterval(mediaTimer);
	// mediaTimer = null;        
	// my_media.release();
	// my_media = null;
	console.log("Error playbacking media");
}	

function captureVideoAction() {
	// alert('bla1');
	clearStatus();
	// var options = extractOptions();
	var options = { limit: 1, duration: 12 };
	// log('Getting video without photo options: ' + JSON.stringify(options));
	// nur audio aufnehmen: navigator.device.capture.captureAudio
	var popoverHandle = navigator.device.capture.captureVideo(getVideoWin, onGetVideoError, options);
	// Reposition the popover if the orientation changes.
	window.onorientationchange = function() {
		var newPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, 0);
		popoverHandle.setPosition(newPopoverOptions);
	}
	// alert('bla4');
}
function getVideoWin(data) {
	// alert('bla2');
	setVideo(data);
	// console.log('CALLBACK!');
	// console.log(JSON.stringify(data));
}
function onGetVideoError(e) {
	// log('Error getting picture: ' + e.code);
	// alert('bla3');
	console.log('Video capture failed');
}
function setVideo(mediaFiles) {
	// , callback
	try {
		var i, path, len;
		for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			// name: The name of the file, without path information. (DOMString)
			// fullPath: The full path of the file, including the name. (DOMString)
			// type: The file's mime type (DOMString)
			// lastModifiedDate: The date and time when the file was last modified. (Date)
			// size: The size of the file, in bytes. (Number)
			// mediaFiles[0].getFormatData(function(data) {
				// if(data.duration > 30) {
					// Tell the user the video is too long
				// } else {
					// Video is less than the max duration...all good
				// }
			// });
			var path = mediaFiles[i].fullPath;
			log('path ['+i+']:'+path);
			var name = mediaFiles[i].name;
			log('name ['+i+']:'+name);
			// do something interesting with the file
			uploadFile(mediaFiles[i]);
		}
		// console.log('stringifiedjsondata: '+JSON.stringify(mediaFiles));
		// window.atob(url);
		// if we got here it is a base64 string (DATA_URL)
		// url = "data:image/jpeg;base64," + url;
	} catch (e) {
		// not DATA_URL
		// log('mediaFiles: ' + mediaFiles.slice(0, 100));
	}    
	log('set video function end');

	// pictureUrl = path;
	// var vid = document.getElementById('camera_video');
	// var startTime = new Date();
	// vid.src = url;
	// vid.onloadend = function() {
		// log('Image tag load time: ' + (new Date() - startTime));
		// callback && callback();
	// };
}

function uploadImage() {
	var ft = new FileTransfer(),
	uploadcomplete=0,
	progress = 0,
	options = new FileUploadOptions();
	options.fileKey="photo";
	options.fileName='test.jpg';
	options.mimeType="image/jpeg";
	ft.onprogress = function(progressEvent) {
		log('progress: ' + progressEvent.loaded + ' of ' + progressEvent.total);
	};
	var server = "http://cordova-filetransfer.jitsu.com";

	ft.upload(pictureUrl, server + '/upload', win, fail, options);
	function win(information_back){
		log('upload complete');
	}
	function fail(message) {
		log('upload failed: ' + JSON.stringify(message));
	}
}

function logCallback(apiName, success) {
	return function() {
		log('Call to ' + apiName + (success ? ' success: ' : ' failed: ') + JSON.stringify([].slice.call(arguments)));
	};
}

// Select image from library using a NATIVE_URI destination type
// This calls FileEntry.getMetadata, FileEntry.setMetadata, FileEntry.getParent, FileEntry.file, and FileReader.readAsDataURL.
function readFile() {
	function onFileReadAsDataURL(evt) {
		var img = document.getElementById('camera_image');
		img.style.visibility = "visible";
		img.style.display = "block";
		img.src = evt.target.result;
		log("FileReader.readAsDataURL success");
	};

	function onFileReceived(file) {
		log('Got file: ' + JSON.stringify(file));
		fileObj = file;

		var reader = new FileReader();
		reader.onload = function() {
			log('FileReader.readAsDataURL() - length = ' + reader.result.length);
		};
		reader.onerror = logCallback('FileReader.readAsDataURL', false);
		reader.readAsDataURL(file);
	};
	// Test out onFileReceived when the file object was set via a native <input> elements.
	if (fileObj) {
		onFileReceived(fileObj);
	} else {
		fileEntry.file(onFileReceived, logCallback('FileEntry.file', false));
	}
}
function getFileInfo() {
	// Test FileEntry API here.
	fileEntry.getMetadata(logCallback('FileEntry.getMetadata', true), logCallback('FileEntry.getMetadata', false));
	fileEntry.setMetadata(logCallback('FileEntry.setMetadata', true), logCallback('FileEntry.setMetadata', false), { "com.apple.MobileBackup": 1 });
	fileEntry.getParent(logCallback('FileEntry.getParent', true), logCallback('FileEntry.getParent', false));
	fileEntry.getParent(logCallback('FileEntry.getParent', true), logCallback('FileEntry.getParent', false));
};

// Copy image from library using a NATIVE_URI destination type
// This calls FileEntry.copyTo and FileEntry.moveTo.
function copyImage() {
	var onFileSystemReceived = function(fileSystem) {
		var destDirEntry = fileSystem.root;

		// Test FileEntry API here.
		fileEntry.copyTo(destDirEntry, 'copied_file.png', logCallback('FileEntry.copyTo', true), logCallback('FileEntry.copyTo', false));
		fileEntry.moveTo(destDirEntry, 'moved_file.png', logCallback('FileEntry.moveTo', true), logCallback('FileEntry.moveTo', false));
	};

	if (isMobile.any()) {
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemReceived, null);
	}
};

function extractOptions() {
	var els = document.querySelectorAll('#image-options select');
	var ret = {};
	for (var i = 0, el; el = els[i]; ++i) {
		var value = el.value;
		if (value === '') continue;
		if (el.isBool) {
			ret[el.keyName] = !!value;
		} else {
			ret[el.keyName] = +value;
		}
	}
	return ret;
}

function createOptionsEl(name, values, selectionDefault) {
	var container = document.createElement('div');
	container.style.display = 'inline-block';
	container.appendChild(document.createTextNode(name + ': '));
	var select = document.createElement('select');
	select.keyName = name;
	container.appendChild(select);
	
	// if we didn't get a default value, insert the blank <default> entry
	if (selectionDefault == undefined) {
		var opt = document.createElement('option');
		opt.value = '';
		opt.text = '<default>';
		select.appendChild(opt);
	}
	
	select.isBool = typeof values == 'boolean';
	if (select.isBool) {
		values = {'true': 1, 'false': 0};
	}
	
	for (var k in values) {
		var opt = document.createElement('option');
		opt.value = values[k];
		opt.textContent = k;
		if (selectionDefault) {
			if (selectionDefault[0] == k) {
				opt.selected = true;
			}
		}
		select.appendChild(opt);
	}
	var optionsDiv = document.getElementById('image-options');
	/*
	if (typeof (optionsDiv) != undefined && typeof (optionsDiv) != null && typeof (optionsDiv) != 'undefined') {
		// console.log('optionsDiv exists');
	}
	else {
		//  create a new option div
		var optionsDivCreate = document.createElement('div');
		optionsDivCreate.id = 'image-options';
		document.body.appendChild(optionsDivCreate);
		// container.appendChild(optionsDivCreate);
		// console.log('optionsDiv NOT exists');
	}
	*/
	optionsDiv.appendChild(container);
}

//* DEBUG */ window.console.log('js/global.js loaded...');
