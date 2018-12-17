var localEntry;
var localCurrentPage = 1;

function company_list(uid)
{
	$('#appointment').addClass('loading');
	$('#appointment .content').hide();
	if(isLogin());
	$.ajax(
	{
		url: 'http://apemalaysia.net/osafe/api/count_company.php?uid='+uid,
		method: 'post',
		cache: false,
		data:
		{
			
		}
	})
	.done(function(response)
	{
		var json = $.parseJSON(response);
		localEntry = json[1].total;

		loadlocal(window.uid);
	})
	.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', function()
		{
			popPage();
		}, 'No internet connection');
		$('#appointment').removeClass('loading');
		$('#appointment .appointmentcontent').show();
	});
}


// these are labels for the days of the week
var cal_days_labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// these are human-readable month name labels, in order
var cal_months_labels = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
                     'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
                     'OCTOBER', 'NOVEMBER', 'DECEMBER'];

// these are the number of days for each month, in order
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var m_searchMonth;
var m_searchYear;
var searchDate;
var searchMonth;
var searchYear;
var appointmentJson;


function loadcupidapoint(date, month, year)
{ 
	$('#myapoint').addClass('loading');
	$('#myapoint .content').hide();

			var today_date = new Date();
	
			searchDate = (isNaN(date) || date == null) ? today_date.getDate() : date;
			searchMonth = (isNaN(month) || month == null) ? today_date.getMonth() : month;
			searchYear  = (isNaN(year) || year == null) ? today_date.getFullYear() : year;
			var monthName = cal_months_labels[searchMonth];

				
			var html = '<div class="segment-button">';
			
			var json = appointmentJson;
						
			for(var i = 1; i < json.length; i++)
			{
				var temp = new Date(json[i].date);
				if(temp.getDate() == searchDate && temp.getMonth() == searchMonth && temp.getFullYear() == searchYear) 
				{
						
					html += '<div class="item clearfix", onClick="onCupidapoint1(' + json[i].index + '); pushPage(' + "'myapointdetail'" + '); vibrate(); playMP3();">';
					html += '<div class="item-desc" ><div class="title">' + json[i].name + '</div><div class="date"></div><br><div class="text"><i style="padding-right:9px; padding-left:1px" class="icon ion-android-calendar"></i> ' + json[i].date + '<br><i style="padding-right:7px"  class="icon ion-clock"></i> ' + json[i].time_start + ' - ' + json[i].time_end + '<br><i style="padding-right:10px; padding-left:2px"  class="icon ion-ios-location"></i> ' + json[i].address_jalan + ','+json[i].address_taman+','+json[i].address_state+'</div></div><div class="item-info"></div></div>';
					
				}
				
			}
			$('#myapoint .content').html(html);
			$('#myapoint').removeClass('loading');
			$('#myapoint .content').show();
			
}

function call(phoneNo){
	window.open('tel:' + phoneNo, '_system');
}

 function appID(aid)
 {
	$('#method').val(null);
	$('#first').val(null);
	$('#pending').val(null);
	$('#remark').val(null);

	window.appoinment_id = aid;
}

var devJson;

var canvas = document.getElementById('signature');


function onCupidapoint1(aid)
{
	$('#myapointdetail').addClass('loading');
	$('#myapointdetail .content').hide();

	$.ajax(
	{
		
		url: 'http://apemalaysia.net/osafe/api/order_details.php',
		method: 'get',
		cache: false,
		data:
		{
			appoinment_id: aid

		}
	})
	.done(function(response)
	{
	
			
			devJson = $.parseJSON(response);

			//window.index1= json[1].index;
			$('#myapointdetail').removeClass('loading');
			//alert(response);

			if (devJson.length > 1)
			{
				var html = '<div class="item clearfix">';
				

				for(var i = 1; i < devJson.length; i++)

			   {

			 //  deJson[i].pending_payment=devJson[i].total-devJson[i].first_payment;

				
				html += '<div class="text mt-10"><b>Name: </b> '+ devJson[i].name + '</div>';
				
				html += '<div class="text mt-10"><b>Total: RM </b>' + devJson[i].total  + '</div>';

				html += '<div class="text mt-10"><b>Pending: RM </b>' + devJson[i].pending_payment + '</div>';
				
				html += '<div class="text mt-10"><b>Delivery Status: </b> ' + devJson[i].status + '</div>';

				html += '<div class="text mt-10"><b>Product Quantity: </b> ' + devJson[i].product_quantity + '</div>';
				
				html += '<div class="text mt-10"><div class="icon ion-android-calendar">  '+ devJson[i].delivery_date + '</dive></div>';

				html +='<hr>';

				html += '<button class="button button_wrapper mb-18", onClick="onCupidapoint2(' + i + '); vibrate(); playMP3();"><i style="float:left"></i>Update</button>'

				html += '<a href="tel:' + devJson[i].contact+ '" class="button button_wrapper mb-18" onClick=" "><i style="float:left" class="icon ion-android-call"></i> Call</a>';
				
				html += '<a href="http://maps.google.com/?q='+ devJson[i].delivery_address +'" class="button button_wrapper mb-18" onClick=" "><i style="float:left" class="icon ion-ios-location"></i> GPS</a>';
				
				}
			}

			
				$('#myapointdetail .content').html(html);
				$('#myapointdetail').removeClass('loading');
				$('#myapointdetail .content').show();
	})
	.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', function()
		{
			pushPage('appointment');
		}, 'No internet connection');
		$('#myapointdetail').removeClass('loading');
		$('#myapointdetail .homecontent').show();
	});		
}

function onCupidapoint2(index)
{
	

	pushPage('update');

	 sigCapture = new SignatureCapture("signature");

	$("#clear").click( onCancelClick );

	$("#submit").click( onSubmitClick );


	window.index = devJson[index].index;

	window.sales = devJson[index].sales_id;

	window.update_method = devJson[index].payment_method;

	window.update_first = devJson[index].first_payment;

	window.update_pending = devJson[index].pending_payment;

	window.update_remark = devJson[index].remarks;

	window.update_date = devJson[index].delivery_date;

	window.update_signature = devJson[index].signature_url_;

	window.search_total = devJson[index].total;

	 total_amount = window.search_total; 

	

	



	$('#update #method').val(window.update_method);

	$('#update #first').val(window.update_first);
	
	$('#update #remark').val(window.update_remark);

	$('#update #date').val(window.update_date);

	$('#update #signature').val(window.update_signature);



	if (updatedelivery(pending_pay))
	{


	calculate(total_amount);

    }


}

function onCancelClick( event ) {
	clearForm();
	
}

function clearForm() {
	
	sigCapture.clear();
	
}

function onSubmitClick( event ) {

  /* if (sigCapture.isEmpty()) {
     alert("Please provide the signature.");
   } else {*/

 	//alert (window.sales);


	var sig = sigCapture.toString();

	//var sig = sigCapture.toDataURL();

	alert(sig);

	$.ajax(

		{
		  url: 'http://apemalaysia.net/osafe/api/signature_capture.php',

		  
 		  method: 'POST',
 		  cache: false,
 		  success: requestSuccess,
		  error: requestError,
 		  data:
 		  {
 		     index: window.index,
 		     sales_id: window.sales,
 		     signature: sig
 		  }
 		})
 	//}	
    


}

function requestSuccess( data, textStatus, jqXHR ) {
	clearForm();
}

function requestError( jqXHR, textStatus, errorThrown ) {
	( "Error: " + errorThrown );
}

function calculate (index)
{
     

	var paid_amount = document.getElementById('first').value;

	var pending_pay = (total_amount - paid_amount);



		updatedelivery(pending_pay);


	//alert(pending_pay);
}


function updatedelivery(pending_pay)
{
	//var paid_amount = document.getElementById('first').value;

	//alert(pending_pay);

	var pay_method    =  $.trim($('#update #method').val());
	var first_pay     =  $.trim($('#update #first').val());
	//var pending_pay   =  $.trim($('#update #pending').val());
	var remarks       =  $.trim($('#update #remark').val());
	var delivery_date =  $.trim($('#update #date').val());


	if(pay_method == ""){
		navigator.notification.alert('Please enter the payment method.', function()
		{
			$('#update #method').focus();
		}, 'Missing info');
		return;
	}

	if(first_pay == ""){
		navigator.notification.alert('Please enter the payment .', function()
		{
			$('#update #first').focus();
		}, 'Missing info');
		return;
	}

	if(remarks == ""){
		navigator.notification.alert('Please enter remarks.', function()
		{
			$('#update #remark').focus();
		}, 'Missing info');
		return;
	}

	$('#update').addClass('loading');
	$('#update .content').hide();


	$.ajax(
	{
		
		url: 'http://apemalaysia.net/osafe/api/update_delivery.php',
		method: 'POST',
		cache: false,
		data:
		{
			index:     window.index,
			method:    pay_method,
			first:     first_pay,
			pending:   pending_pay,
			remark:    remarks,
			date:      delivery_date

			//signature: cust_signature
		}
	})
	.done(function(response)
	{
		//$('#update').removeClass('loading');

		

			if($.trim(response) == '0')
			{

			  $('#update').removeClass('loading');
			  $('#update .content').show();
			  navigator.notification.alert('You have successfully updated the order delivery details.', null, 'Successful');

			//  $('#myapointdetail').addClass('loading');
	       //   $('#myapointdetail .content').hide();
			
			  //popPage();

			  pushPage('myapointdetail');

		    }
		else
		{
			navigator.notification.alert('An error has occur, please try again later.', null, 'Error');
			$('#update').removeClass('loading');
			$('#update .content').show();
		}
				

							
			/*	for(var i = 1; i < json.length; i++)

				{
				
				var html = '<div class="item clearfix">';
				
				html += '<div class="item-title labels"><b>Payment Method :</b></div> <div class="item-input"> <select id="method"> <option>Cash</option><option>Cheque</option><option>Credit Card</option></select></div>';
				html += '<div class="title"><br></div>';
				html += '<div class="item-title labels"><b>Payment Date :</b></div> <div class="item-input"><input id="date" type="date"></div>';
				html += '<div class="title"><br></div>';
				html += '<div class="item-title labels"><b>First Payment :</b></div> <div class="item-input"><input id="first" type="number"> </div>';
				html += '<div class="title"><br></div>';
				html += '<div class="item-title labels"><b>Pending Payment :</b></div> <div class="item-input"><input id="pending" type="number"> </div>';
				html += '<div class="title"><br></div>';
				html += '<div class="item-title labels"><b>Remarks :</b></div> <div class="item-input"><textarea id="remark"></textarea></div>';
				html += '<div class="title"><br></div>';
				html += '<div class="item-title labels"><b>Customer Signature :</b></div> <div class="item-input"> <div class="sigPad signed"> <div class="sigWrapper"><canvas height="100" width="198" class="pad"></canvas</div></div></dive>';
				html += '<div class="title"><br></div>';
				//html += '<button class="fit mb-10", onClick="onUpdate(' + json[i].index + '); appm_prevMonth; appm_nxtMonth; appd_prevDate; appd_prevDate (' + json[i].index + '); pushPage(' + "'update'" + '); playMP3()"><i style="float:left"></i> SUBMIT</button>';
				html += '<button class="fit mb-10", onClick="onUpdate(' + json[i].index + '); pushPage(' + "'update'" + '); playMP3()"><i style="float:left"></i> SUBMIT</button>';
				
				}*/
			

			
			
				$('#update .content').html(html);
				$('#update').removeClass('loading');
				$('#update .content').show();
	})
	.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', function()
		{
			pushPage('appointment');
		}, 'No internet connection');
		$('#update').removeClass('loading');
		$('#update .homecontent').show();
	});	

}

function updateStatus()
{
	$.ajax(
	{
		
		url: 'http://apemalaysia.net/osafe/api/update_delivery_status.php',
		method: 'POST',
		cache: false,
		data:
		{
			index:    window.index
			

		}
	})
	
}

/*function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;

resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

document.getElementById('save-png').addEventListener('click', function () { 
	if (signaturePad.isEmpty()) {
return alert ("Please provide a signature.");
}
var data = SignaturePad.toDataURL('image/png');

console.log(data);
window.open(data);

});

document.getElementById('clear').addEventListener('click', function() {
	signaturePad.clear();
});

document.getElementById('undo').addEventListener('click', function() {
	var data = signaturePad.toData();

	if (data) {
		data.pop();
		signaturePad.fromData;
	}

});*/


function appm_calendarGenerate(month, year) 
{	
	$('#appointment').addClass('loading');
	
	var cal_current_date = new Date();
	m_searchMonth = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
	m_searchYear  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
	
	
	var firstDay = new Date(m_searchYear, m_searchMonth, 1);
	var startingDay = firstDay.getDay();
	var monthLength = cal_days_in_month[m_searchMonth];
	
	if (m_searchMonth == 1) { // February only
	  if ((m_searchYear % 4 == 0 && m_searchYear % 100 != 0) || m_searchYear % 400 == 0){
		monthLength = 29;
	  }
	}
	var monthName = cal_months_labels[m_searchMonth];
	var searchMonthReal = m_searchMonth + 1;
	if(searchMonthReal < 10) searchMonthReal = '0' + searchMonthReal;
	
	var month_search = m_searchYear + '-' + searchMonthReal;
	
	var html = '';	
		
		html += '<div class="segment-button">';
	
		html += '<div class="calRow mb-10 clearfix"><div class="calFirstRowLeft" onClick="appm_prevMonth(' + m_searchMonth + ',' + m_searchYear + '); vibrate(); playMP3();"><i class="icon ion-chevron-left"></i></div>';
		html += '<div class="calFirstRowCenter">' + monthName + ' ' + m_searchYear + '</div><div class="calFirstRowRight" onClick="appm_nxtMonth(' + m_searchMonth + ',' + m_searchYear + '); vibrate(); playMP3();"><i class="icon ion-chevron-right"></i></div></div>';
		
		html += '<div class="calRow">';
		for(var i = 0; i <= 6; i++){
			html += '<div class="calMidCol1">';
			html += cal_days_labels[i];
			html += '</div>';
		}
		html += '</div>';
		
		var day = 1;

	$('#appointment').removeClass('loading');
	$('#appointment .content').html(html);
	$('#appointment').removeClass('loading');
	if(isLogin());
	$.ajax(
	{
		url: 'http://apemalaysia.net/osafe/api/appointment_delivery.php',
		method: 'POST',
		cache: false,
		data:
		{
			user: uid
		}
	})
	.done(function(response)
	{	
		var json = $.parseJSON(response);
		appointmentJson = json;
		html = '';
		
		html += '<div class="segment-button">';
	
		html += '<div class="calRow mb-10 clearfix"><div class="calFirstRowLeft" onClick="appm_prevMonth(' + m_searchMonth + ',' + m_searchYear + '); vibrate(); playMP3();"><i class="icon ion-chevron-left"></i></div>';
		html += '<div class="calFirstRowCenter">' + monthName + ' ' + m_searchYear + '</div><div class="calFirstRowRight" onClick="appm_nxtMonth(' + m_searchMonth + ',' + m_searchYear + '); vibrate(); playMP3();"><i class="icon ion-chevron-right"></i></div></div>';
	
		html += '<div class="calRow">';
		for(var i = 0; i <= 6; i++){
			html += '<div class="calMidCol1">';
			html += cal_days_labels[i];
			html += '</div>';
		}
		html += '</div>';
		
		var day = 1;
		
		for(var i = 0; i < 7; i++){
			html += '<div class="calRow">';
			for(var j = 0; j <= 6; j++){
				
				if (day <= monthLength && (i > 0 || j >= startingDay)) {
					var appNumber = 0;
					for(var k = 1; k < json.length; k++){
						var temp = new Date(json[k].date);
						if(temp.getDate() == day && temp.getMonth() == m_searchMonth && temp.getFullYear() == m_searchYear) appNumber++;
					}
					if(appNumber > 0){
						html += '<div class="calMidColApp" onClick="pushPage(' + "'myapoint'" + '); loadcupidapoint(' + day + ',' + m_searchMonth + ',' + m_searchYear + '); vibrate(); playMP3();">';
						html += day;
						html += ' (' + appNumber + ')';
						day++;
					}
					else {
						html += '<div class="calMidCol">';
						html += day;
						day++;
					}
				}
				else {
					html += '<div class="calMidCol">';
					html += "&nbsp;";
				}
				html += '</div>';
			}
			html += '</div>';
			if (day > monthLength) break;
		}
		
		$('#appointment .content').html(html);
		$('#appointment').removeClass('loading');
		$('#appointment .content').show();
		
	})
	.fail(function(){
		navigator.notification.alert('Wifi connection required.\nConnect to Wi-Fi network and try again.', function()
		{
		}, 'No internet connection');
		$('#appointment').removeClass('loading');
		$('#appointment .content').show();
	});	
}

function appm_prevMonth(month, year){
	if(month != 0) appm_calendarGenerate(month - 1, year);
	else appm_calendarGenerate(11, year - 1);
}

	
function appm_nxtMonth(month, year){
	if(month != 11) appm_calendarGenerate(month + 1, year);
	else appm_calendarGenerate(0, year + 1);
}

function appd_prevDate(date, month, year){
	var dateChange = date;
	var monthChange = month;
	var yearChange = year;
	
	if(date != 1){
		loadcupidapoint(date - 1, month, year);
		dateChange = date - 1;
	}
	else {
		if(month != 0){
			var monthLength = cal_days_in_month[month - 1];
			if (month == 1) { // February only
			  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
				monthLength = 29;
			  }
			}
			loadcupidapoint(monthLength, month - 1, year);
			dateChange = monthLength;
			monthChange = month - 1;
		}
		else {
			loadcupidapoint(31, 11, year - 1);
			dateChange = 31;
			monthChange = 11;
			yearChange = year - 1;
		}
	}
}

function appd_nxtDate(date, month, year){
	var dateChange = date;
	var monthChange = month;
	var yearChange = year;
	
	var monthLength = cal_days_in_month[month];
	if (month == 1) { // February only
	  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
		monthLength = 29;
	  }
	}
	if(date != monthLength){
		loadcupidapoint(date + 1, month, year);
		dateChange = date + 1;
	}
	else {
		if(month != 11){
			loadcupidapoint(1, month + 1, year);
			dateChange = 1;
			monthChange = month + 1;
		}
		else {
			loadcupidapoint(1, 0, year + 1);
			dateChange = 1;
			monthChange = 0;
			yearChange = year + 1;
		}
	}
}
