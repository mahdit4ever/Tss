var loginCallback;
var loggedIn = false;
var userID;

var pushNotification;
var RegID;
var deviceID;
var messagePage;

function updateDeviceId(){
	$.ajax(
	{
		url: 'http://mobionfire.com/savenow_api/register_device.php',
		method: 'post',
		cache: false,
		data:
		{
			user: uid,
			device: deviceID
		}
	})
	.done(function(response){
				  
	})
	.fail(function(){
	});
}


function isLogin(){
	if(!loggedIn){
		navigator.notification.alert('Please log in to your account first.', function()
		{
			pushPage('profile', LTR);
		}, 'User not found');
		return false;
	} else return true;
}

/* Login with username */

function login(username, password)
{
	
	$('#login').addClass('loading');
	$('#login .content').hide();

	$.ajax(
	{
		url: 'http://apemalaysia.net/osafe/api/staffs_login.php',
		method: 'get',
		cache: false,
		data:
		{
			email: username,
			password: password
		}
		})
	    .done(function(response){
			
			
			var json = $.parseJSON(response);
			
			if(json.length > 1 && json[1].status == 'Active')
			{
				loggedIn = true;
				//navigator.notification.alert('Login', null, 'Successful');
				window.localStorage.setItem("key", username);
				window.localStorage.setItem("key2", password);
				
				deviceID = json[1].deviceid;
				window.uid= json[1].index;
				window.myphone = json[1].mobile;
				window.myemail = json[1].email;
				window.myage = json[1].age;
				

				deviceID = RegID;
				updateDeviceId();
				
				var html = '<div class="item clearfix"><div style="border-bottom: 2px solid #eee; padding-bottom: 20px;"><img class="avatar" id="profile_pic" onClick="profile_picChange();playMP3(); vibrate();" src="http://sunday-tech.com/osafe/upload/' + json[1].photo_url + '"></div>';
				
				html += '<div><table width="100%">';
				
				html += '<td style="width:15%; border:none"><div class="bio3" style><font size="5"><i class="icon ion-android-person"></i></font></div></td><td ><b>Name</b></td><td style="text-align:right; width:60%;">' + json[1].name + '</td></tr>';
				
				//html += '<tr><td style="border:none"><div class="bio3" style><font size="5"><i class="icon ion-male"></i></font></div></td><td><b>Gender</b></td><td style="text-align:right">' + json[1].gender + '</td></tr>';
				
				html += '<tr><td style="border:none"><div class="bio3" style><font size="5"><i class="icon ion-ios-email"></i></font></div></td><td><b>Email</b></td><td style="text-align:right">' + json[1].email + '</td></tr> ';
				
				html += '<tr><td><div class="bio3" style><font size="5"><i class="icon ion-android-call"></i></font></div></td><td><b>Mobile</b></td><td style="text-align:right">' + json[1].mobile + '</td></tr>';
				
				//html +='<tr><td><div class="bio3" style><font size="5"><i class="icon ion-ios-star-half"></i></font></div></td><td><b>Point</b></td><td style="text-align:right">' + json[1].point + '</td></tr>';
				
				html +='</table></div></div>';
				
				//html += '<a class="button col-2 mb-18" onClick="pushPage(\'inbox\', RTL);loadinbox();playMP3(); vibrate();"><i style="float:left" class="icon ion-chatbox-working"></i> Inbox</a>';
				
				//html += '<a class="button col-2 mb-18" onClick="profile_edit();playMP3(); vibrate();"><i style="float:left" class="icon ion-compose"></i> Edit Profile</a>';
				
				html += '<a class="button fit mb-18" onClick="onLogout();playMP3(); vibrate();"><i style="float:left" class="icon ion-log-out"></i> Logout</a>';
				
				//html += '<a class="button fit mb-18" style="background:#28272b;" onClick="pushPage(\'change_password\', RTL);playMP3(); vibrate();"><i style="float:left" class="icon ion-locked"></i> Change Password</a>';
				
				$('#profile .content').html(html);
				
				$('#login input').val('');
				if(loginCallback)
				{
					loginCallback();
					loginCallback = null;
				}
			}
			else
			{
				navigator.notification.alert('Incorrect username or password!', function()
				{
					$('#login input').val('');
				}, 'Error');
			}
			$('#login').removeClass('loading');
			$('#login .content').show();
		})
		.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', null, 'No internet connection');
		$('#login').removeClass('loading');
		$('#login .content').show();
	});
}


/* Auto Login */

function autoLogin(username, password)
{
	$('#login').addClass('loading');
	$('#login .content').hide();
	$.ajax(
	{
		url: 'http://apemalaysia.net/osafe/api/staffs_login.php',
		method: 'get',
		cache: false,
		data:
		{
			email: username,
			password: password
		}
		})
	    .done(function(response){
			var json = $.parseJSON(response);
			if(json.length > 1 && json[1].status == 'Active')
			{
				loggedIn = true;
				
				window.localStorage.setItem("key", username);
				window.localStorage.setItem("key2", password);
				
				window.uid= json[1].index;
				window.myphone = json[1].mobile;
				window.myemail = json[1].email;
				window.myage = json[1].age;
				

				var html = '<div class="item clearfix"><div style="border-bottom: 2px solid #eee; padding-bottom: 20px;"><img class="avatar" id="profile_pic" onClick="profile_picChange();playMP3(); vibrate();" src="http://sunday-tech.com/osafe/upload/' + json[1].photo_url + '"></div>';
				
				html += '<div><table width="100%">';
				
				html += '<td style="width:15%; border:none"><div class="bio3" style><font size="5"><i class="icon ion-android-person"></i></font></div></td><td ><b>Name</b></td><td style="text-align:right; width:60%;">' + json[1].name + '</td></tr>';
				
				//html += '<tr><td style="border:none"><div class="bio3" style><font size="5"><i class="icon ion-male"></i></font></div></td><td><b>Gender</b></td><td style="text-align:right">' + json[1].gender + '</td></tr>';
				
				html += '<tr><td style="border:none"><div class="bio3" style><font size="5"><i class="icon ion-ios-email"></i></font></div></td><td><b>Email</b></td><td style="text-align:right">' + json[1].email + '</td></tr> ';
				
				html += '<tr><td><div class="bio3" style><font size="5"><i class="icon ion-android-call"></i></font></div></td><td><b>Mobile</b></td><td style="text-align:right">' + json[1].mobile + '</td></tr>';
				
				//html +='<tr><td><div class="bio3" style><font size="5"><i class="icon ion-ios-star-half"></i></font></div></td><td><b>Point</b></td><td style="text-align:right">' + json[1].point + '</td></tr>';
				
				html +='</table></div></div>';
				
				//html += '<a class="button col-2 mb-18" onClick="pushPage(\'inbox\', RTL);loadinbox();playMP3(); vibrate();"><i style="float:left" class="icon ion-chatbox-working"></i> Inbox</a>';
				
				//html += '<a class="button col-2 mb-18" onClick="profile_edit();playMP3(); vibrate();"><i style="float:left" class="icon ion-compose"></i> Edit Profile</a>';
				
				html += '<a class="button fit mb-18" onClick="onLogout();playMP3(); vibrate();"><i style="float:left" class="icon ion-log-out"></i> Logout</a>';
				
				//html += '<a class="button fit mb-18" style="background:#28272b;" onClick="pushPage(\'change_password\', RTL);playMP3(); vibrate();"><i style="float:left" class="icon ion-locked"></i> Change Password</a>';
				
				$('#profile .content').html(html);
				$('#login input').val('');
			}
			$('#login').removeClass('loading');
			$('#login .content').show();
		
				if(messagePage == "message"){
					setTimeout(pm_checkPage, 3000);
					//pm_checkPage();
				} 
		})
		.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', function()
		{
			popPage();
		}, 'No internet connection');
		$('#login').removeClass('loading');
		$('#login .content').show();
	});
}

/* Logout */

function logout()
{
	//window.localStorage.clear();
	localStorage.removeItem("key");
	localStorage.removeItem("key2");
	clearUserInfo();
	loggedIn = false;
}

/* Show login, register buttons */

function clearUserInfo()
{
	var html = '<div class="mb-18">You are not logged in.</div>';	
	html += '<a class="button fit mb-18" onClick="pushPage(\'login\', RTL);playMP3(); vibrate();"><i style="float:left;" class="icon ion-log-in"></i> Login</a>';

	$('#profile .content').html(html);
}
