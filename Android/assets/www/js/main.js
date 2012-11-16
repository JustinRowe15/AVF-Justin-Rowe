//Justin M. Rowe
//AVF 1211
//Project 3

//Ensure Device Is Ready With PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	console.log("Device Ready");
}

//getElementById function
function ge(x) {
	var element = document.getElementById(x);
	return element;
}

var photoLink = ge('photoCapture');
	photoLink.addEventListener("click", getPhoto);
var acceleratorLink = ge('acceleratorCapture');
	acceleratorLink.addEventListener("click", getAccelerator);
var deviceLink = ge('deviceCapture');
	deviceLink.addEventListener("click", getDevice);	
var connectionLink = ge('connectionCapture');
	connectionLink.addEventListener("click", getConnection);

//Connection Capture Native Feature
function getConnection(){
	var networkConnection = navigator.network.connection.type;
	var capture = {};
	capture[Connection.UNKNOWN]  = 'Unknown connection';
    capture[Connection.ETHERNET] = 'Ethernet connection';
    capture[Connection.WIFI]     = 'WiFi connection';
    capture[Connection.CELL_2G]  = 'Cell 2G connection';
    capture[Connection.CELL_3G]  = 'Cell 3G connection';
    capture[Connection.CELL_4G]  = 'Cell 4G connection';
    capture[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + capture[networkConnection]);
}

//Accelerator Native Feature
function getAccelerator(){
	navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
}

//Current Acceleration
function onSuccess(acceleration) {
	alert('Acceleration X: ' + acceleration.x + '\n' +
    	  'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}

//Acceleration Erroe
    function onError() {
    	alert('Could Not Retrieve Acceleration!');
}

//Camera Native Feature
function getPhoto(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	navigator.camera.getPicture(onPhotoSuccess, onPhotoError, { quality: 50 });
}

//Applies CSS styling to photo taken
function onPhotoSuccess(imageData){
	var sizeImage = document.getElementById('sizeImage');
	sizeImage.style.display = 'block';
	sizeImage.src = "data:image/jpg;base64," + imageData;
}

//Picture Failed to Take
function onPhotoError(message){
	alert('Photo Failed To Take Because: ' + message);
}

//Device Native Feature
function getDevice(){
	var pad = document.getElementById('deviceCapture');
        pad.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                        'Device PhoneGap: ' + device.phonegap + '<br />' + 
                        'Device Platform: ' + device.platform + '<br />' + 
                        'Device UUID: '     + device.uuid     + '<br />' + 
                        'Device Version: '  + device.version  + '<br />';
}

function confirmBack(button){
	alert("You selected " + button);
}

function getTwitter(){
	$.ajax({
		'url': 'http://search.twitter.com/search.json?q=barack%20obama',
		'type': 'GET',
		'dataType': 'jsonp',
		'success': function(response){
			for(i=0, j=response.results.length; i<j; i++){
				var tweet = response.results[i];
				$('<div id="tweetbox">'+
				  "<img src='" + tweet.profile_image_url + "' />"+ '</br>' +
				  '<p>'+ tweet.from_user +'</p>'+
				  '<p>'+ tweet.from_user_name +'</p>'+
				  '<p>'+ tweet.created_at +'</p>'+
				  '<p>'+ tweet.text +'</p>'+
				  '</div>'
				 ).appendTo('#twitterFeed');
			};
		}
	});
}

function getVimeo(){
	$.ajax({
		'url': 'http://vimeo.com/api/v2/justinrowe/videos.json?',
		'type': 'GET',
		'dataType': 'jsonp',
		'success': function(response){
			for(i=0, j=response.length; i<j; i++){
				var movie = response[i];
				$('<div id="videobox">'+
				  "<img src='" + movie.thumbnail_large + "' />"+ '</br>' +
				  '<p>'+ movie.title +'</p>'+
				  '<p>'+ movie.upload_date +'</p>'+
				  '<p>'+ movie.user_name +'</p>'+
				  '<p>'+ movie.url +'</p>'+
				  '</div>'				
				).appendTo('#vimeoFeed');
			};
		}
	});
}