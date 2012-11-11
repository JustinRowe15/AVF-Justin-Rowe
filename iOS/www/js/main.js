//Justin M. Rowe
//AVF 1211
//Project 2

//Ensure Device Is Ready With PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	alert("Device Ready");
}

//Connection Capture Native Feature
function connectionCapture(){
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

//Contacts Capture Native Feature
function contactsCapture(){
	var contacts = new ContactsFindOptions();
	options.filter = "Justin";
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError);
}

//Loop through contacts to find each name and display them
function onSuccess(contacts) {
	for (var i=0; i<contacts.length; i++){
		alert("Display Name = " + contacts[i].displayName);
	}
}

//Error in trying to get contacts
function onError(contactError) {
	alert('Cannot Retrieve Contacts!')
}

//Camera Native Feature
function photoCapture(){
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

//Notification Native Feature
/* function notificationsCapture(){
	navigator.notification.alert(
		'This Alert Works!', //message
		alertGone, //callback
		'Notification', //title
		'OK', //buttonName
		);
} */

function twitterCall(url){
	$.ajax({
			'url': 'http://search.twitter.com/search.json?q=barack%20obama',
			'type': 'GET',
			'dataType': 'jsonp',
			'success': function(response){
				for(i=0, j=response.results.length; i<j; i++){
					var tweet = response.results[i];
					$('<p>'+ '<img src="' + response.results[i].profile_image_url + '" />' + response.results[i].text + '</p>'				
				).appendTo('#twitterFeed');
			};
		}
	});
}

function vimeoCall(url){
	$.ajax({
			'url': 'http://vimeo.com/api/v2/justinrowe/videos.json',
			'type': 'GET',
			'dataType': 'jsonp',
			'success': function(data){
				for(i=0, j=data.results.length; i<j; i++){
					var movie = data.results[i];
					$('<p>'+ '<img src="' + data.results[i].thumbnail_small + '" />' + data.results[i].title + '</p>'				
				).appendTo('#vimeoFeed');
			};
		}
	});
}