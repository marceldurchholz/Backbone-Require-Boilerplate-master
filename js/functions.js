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

var menuStatus = false;

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

/* ----------------------------------------------------------- /
 populateDeviceInfo
 / ----------------------------------------------------------- */
function populateDeviceInfo(){
    report('functions.js','populateDeviceInfo() START');
	// doAlert('TEST','--> populateDeviceInfo()..');
    try {
		var id = 'devicereadydiv';
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		listeningElement.setAttribute('style', 'display:none;');
		var receivedElement = parentElement.querySelector('.received');
		receivedElement.setAttribute('style', 'display:block;');
		if(!isMobile.any()) {
			alert('no mobile device');
			document.getElementById("device_internet").innerHTML = 'TEST OUT PUT';
		}
		else {
			modifyiOS7StatusBar();
			document.getElementById("user-agent").textContent = navigator.userAgent;
			document.getElementById("platform").innerHTML = device.platform;
			document.getElementById("version").innerHTML = device.version;
			document.getElementById("uuid").innerHTML = device.uuid;
			document.getElementById("name").innerHTML = device.name;
			document.getElementById("model").innerHTML = device.model;
			document.getElementById("width").innerHTML = screen.width;
			document.getElementById("height").innerHTML = screen.height;
			document.getElementById("colorDepth").innerHTML = screen.colorDepth;
			document.getElementById("device_internet").innerHTML = isConnectedToInternet();
			// $('#device_conn span').html(getConnectionType());
			document.getElementById("device_conn").innerHTML = getConnectionType();
			// $('#device_platform span').html(getDevicePlatform());
			// $('#device_model span').html(getDeviceModel());
			// $('#device_os span').html(getOS());
			// $('#device_version span').html(getDeviceVersion());
			// $('#device_internet span').html(isConnectedToInternet());
			// doAlert('$(#device_conn span).html(getConnectionType());','--> populateDeviceInfo()..');
		}
    }catch(e){ catchError('populateDeviceInfo()',e); }
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
		if (parseFloat(window.device.version) === 7.0) {
			  document.body.style.marginTop = "20px";
		}
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


function scrollToTop(){
	$(window).scrollTop(0); //window.scrollTo(0,0);
}


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

//* DEBUG */ window.console.log('js/global.js loaded...');
