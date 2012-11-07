//Justin M. Rowe
//AVF 1211
//Project 2

//Ensure Device Is Ready With PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("deviceready", connectionCapture, false);
document.addEventListener("deviceready", contactsCapture, false);
document.addEventListener("deviceready", notificationsCapture, false);
document.addEventListener("deviceready", photoCapture, false);

function onDeviceReady(){
	
};

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
};

//Contacts Capture Native Feature
function contactsCapture(){
	var contacts = new ContactsFindOptions();
	options.filter = "";
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError);
};

//Loop through contacts to find each name and display them
function onSuccess(contacts) {
	for (var i=0, i<contacts.length; i++){
		console.log("Display Name = " + contacts[i].displayName);
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
};

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
function notificationsCapture(){
	navigator.notification.alert(
		'This Alert Works!', //message
		'Notification', //title
		'OK', //buttonName
	);
};
