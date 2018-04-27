// ********************* //
// * Map Visualisation * //
// ********************* //

var map;
var markersArray = [];
var $searchResults = $( '#search-results' );
var $noResultsMessage = $( '<p class="no-results">No results available</p>' );

function initMap() {
	var myLatLng = {lat: 55, lng: -4};

	// Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 5.7,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		styles: [
			{
				featureType: 'road',
				stylers: [ { visibility: 'off' } ]
			},
			{
				featureType: 'poi',
				stylers: [ { visibility: 'off' } ]
			}
		]
	});
}

function clearMarkers() {
  for (var i = 0, l = markersArray.length; i < l; i++ ) {
	markersArray[i].setMap(null);
  }
  markersArray = [];
}

function drawMarker(rowData) {
	if (rowData.latitude == '' || rowData.longitude == ''){
		return;
	}
	var myLatLng = {lat: parseFloat(rowData.latitude), lng: parseFloat(rowData.longitude)};

	var marker = new google.maps.Marker({
		position: myLatLng,
		sName: "Marker Name",
		map: map,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 4,
			fillColor: percToColor(Number(rowData.export_propensity)),
			fillOpacity: 0.4,
			strokeWeight: 0.4
		}
	});
	markersArray.push(marker);

	marker.addListener('click', function() {

		var $tbody = $('table#company_description tbody');

		$tbody.children().remove();

		var company_desc = {
			"Company Name": rowData.company_name,
			"Post Code": rowData.postcode,
			"Region": rowData.region,
			"Nb Export Evidences": rowData.nb_export_evidences,
			"Last Export Evidence": rowData.last_export_evidence,
			"Current Assets": rowData.current_assets,
			"Shareholder Funds": rowData.shareholder_funds,
			"Turnover": rowData.turnover,
			"HQ Type": rowData.headquarter_type,
			"Company Classification": rowData.company_classification,
			"Employee Range": rowData.employee_range,
			"Export Propensity": rowData.export_propensity
		};

		var header = $("<th colspan='2' class='text-center'> Company Description<th/>");
		$tbody.append( header );
		Object.keys(company_desc).forEach(function(key) {
			var row = $("<tr />");
			row.append($("<td>" + key + "</td>"));
			row.append($("<td>" + company_desc[key] + "</td>"));
			$tbody.append(row);
		});
	});
}

// ****************** //
// * Company Search * //
// ****************** //
function filtersAsJson(form, sort_field, ascending) {

	var data = {};

	$.each( form.serializeArray(), function(i,o){
		var n = o.name,v = o.value;
		if(v !== ""){
			data[n] = data[n] === undefined ? v
				: $.isArray( data[n] ) ? data[n].concat( v )
				: [ data[n], v ];
		}
	});

	var filters = {
		'filters': {
			'company_name': data['company_name'],
			'postcode': data['postcode'],
			'region': toArray(data['region']),
			'nb_export_evidences': {
				'min': toInt(data['nb_export_evidences_min']),
				'max': toInt(data['nb_export_evidences_max'])
			},
			'last_export_evidence': {
				'min': data['last_export_evidence_min'],
				'max': data['last_export_evidence_max']
			},
			'export_codes': {
				'code_match': toArray(data['commodity_code']),
				'keyword_search': data['commodity_code_kw']
			},
			'sic_codes': {
				'code_match': toArray(data['sic_code']),
				'keyword_search': data['sic_code_kw']
			},
			'current_assets': {
				'min': toInt(data['current_assent_min']),
				'max': toInt(data['current_assent_max'])
			},
			'shareholder_funds': {
				'min': toInt(data['shareholder_funds_min']),
				'max': toInt(data['shareholder_funds_max'])
			},
			'turnover': {
				'min': toInt(data['turnover_min']),
				'max': toInt(data['turnover_max'])
			},
			'company_classification': toArray(data['company_classification']),
			'headquarter_type': toArray(data['headquarter_type']),
			'employee_range': data['employee_range'],
			'export_propensity': {
				'min': toInt(data['export_propensity_min']),
				'max': toInt(data['export_propensity_max'])
			},
			'service_usage': toArray(data['service_usage'])
		},
		'sort': {
			'field': sort_field,
			'ascending': ascending,
		}
	};

	remove_empty(filters);
	return JSON.stringify(filters);
}

function drawRow(rowData) {
	var row = $("<tr />");
	row.append($("<td>" + rowData.company_name + "</td>"));
	row.append($("<td>" + rowData.postcode + "</td>"));
	row.append($("<td>" + rowData.region + "</td>"));
	row.append($("<td>" + rowData.nb_export_evidences + "</td>"));
	row.append($("<td>" + rowData.last_export_evidence + "</td>"));
	row.append($("<td>" + rowData.commodity_codes + "</td>"));
	row.append($("<td>" + rowData.sic_codes + "</td>"));
	row.append($("<td>" + rowData.current_assets + "</td>"));
	row.append($("<td>" + rowData.shareholder_funds + "</td>"));
	row.append($("<td>" + rowData.turnover + "</td>"));
	row.append($("<td>" + rowData.headquarter_type + "</td>"));
	row.append($("<td>" + rowData.company_classification + "</td>"));
	row.append($("<td>" + rowData.employee_range + "</td>"));
	row.append($("<td>" + rowData.export_propensity + "</td>"));
	$('table.company_filter tbody').append(row);
}

function populateCompanyInfoSelector(selector, rowData){
	var value = rowData.company_id + ':' + rowData.sic_codes + ':' + rowData.commodity_codes;
	var text = rowData.company_name;
	selector.append($("<option></option>").attr("value", value).text(text));
}

function clearTables() {
	$('table.company_filter tbody tr').remove();
	$('table#company_description tbody').children().remove();
}

function search(offset, limit){
	var $selectedCompany = $('#selected_company');
	var sort_order;
	var sort_field = $('select[name=sort_field]').val() || undefined;
	
	if (sort_field) {
		sort_field = sort_field[0];
		sort_order = !$('input[name=sort_order]').prop("checked");
	}

	$searchResults.hide();
	$noResultsMessage.hide();

	$.ajax({
		type: "post",
		url: ( '/acs/api/search/?offset=' + offset + '&limit=' + limit ),
		data: filtersAsJson($('#search_filters'), sort_field, sort_order),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){

			var rows = data.result;
			var i = 0;
			var row;

			clearTables();
			clearMarkers();
			$selectedCompany.find('option').remove();

			if( rows ){

				while( ( row = rows[ i++ ] ) ){
					drawRow(row);
					populateCompanyInfoSelector($selectedCompany, row);
					drawMarker(row);
				}
				$searchResults.show();
				$selectedCompany.selectpicker('refresh');
				try {
					$searchResults.find( 'table' )[ 0 ].scrollIntoView();
				} catch( e ){}

			} else {

				$noResultsMessage.show();
				try { 
					$noResultsMessage[ 0 ].scrollIntoView();
				} catch( e ){}
			}
		},
		error: function(){
			clearTables();
			clearMarkers();
			$selectedCompany.find('option').remove();
			console.log('failed');
		}
	});
}

(function(){
	// Add pagination to search results
	var resultsPerPage = 10;

	$('select[name=nb_pages]').on('change',function() {
		resultsPerPage = $(this).val();
	});

	$('#pagination').bootpag({
		total: 10,
		page: 1,
		maxVisible: 0,
		leaps: false,
		href: "#result-page-{{number}}",
	}).on("page", function(event, num){
		search((num-1) * resultsPerPage, resultsPerPage);
	});

	$("#search_button").click(function(){
		search(0, resultsPerPage);
	});
}());

$("#clear_button").click(function(){
	$('#search_filters .selectpicker').selectpicker('val', '');
	$('#search_filters input').val('');
});

// Populate search query selectors
function populate_selector(name, type) {

	var isArray = ( type === 'array') ;
	var isNot = ( type === 'not' );

	$.ajax({
		type: 'get',
		url: ( '/acs/api/data/' + name ),
		async:true,
		dataType: 'json',
		success: function(option_list){
			var options = option_list.result;
			var i = 0;
			var option;
			var selector = $( 'select[name=' + name + ']' );
			selector.empty();

			while( ( option = options[ i++ ] ) ){
				var value, text;
				if (isArray) {
					value = option[0];
					var description = (option[1] == null) ? '' : (option[1].length <= 70) ? option[1]: option[1].slice(0, 70) + '...';
					text = value.concat(' - ', description);
					selector.append(
						$("<option></option>").attr("value", value).text(text)
					);
				} else if ( isNot ){
					value = text = option;
					selector.append(
						$("<option></option>").attr("value", value).text(text)
					);
					selector.append(
						$("<option></option>").attr("value", 'not ' + value).text('not ' + text)
					);
				} else {
					value = text = option;
					selector.append(
						$("<option></option>").attr("value", value).text(text)
					);
				}

			}
			selector.selectpicker('refresh');
		},
		error: function(error) {
			console.log("Error:");
			console.log(error);
		}
	});
}

// **************** //
// * Company Info * //
// **************** //

$("#company_info_button").click(function(){

	function clearAllInfoTables(){
		$('table#timeline tbody tr').remove();
		$('table#export_codes tbody tr').remove();
		$('table#sic_codes tbody tr').remove();
	}

	function populateTimeline(rows){

		var $tbody = $('table#timeline tbody');
		var i = 0;
		var row;
		var $row;
		// sort timeline chronological
		if( rows && rows.length ){

			rows.sort(function(a, b){
				var x = new Date(a.datetime);
				var y = new Date(b.datetime);
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			});

			while( ( row = rows[ i++ ] ) ){
				$row = $("<tr />");
				$row.append($("<td>" + row.source + "</td>"));
				$row.append($("<td>" + row.datetime.slice(5,-13) + "</td>"));
				$row.append($("<td>" + row.description + "</td>"));
				$tbody.append($row);
			}
		}
	}

	function populateExportCodes(rows){

		var $tbody = $('table#export_codes tbody');
		var i = 0;
		var row;
		var $row;

		while( ( row = rows[ i++ ] ) ){
			$row = $("<tr />");
			$row.append($("<td>" + row[0] + "</td>"));
			$row.append($("<td>" + row[1] + "</td>"));
			$tbody.append($row);
		}
	}

	function populateSicCodes(rows){

		var $tbody = $('table#sic_codes tbody');
		var i = 0;
		var row;
		var $row;

		while( ( row = rows[ i++ ] ) ){
			$row = $("<tr />");
			$row.append($("<td>" + row[0] + "</td>"));
			$row.append($("<td>" + row[1] + "</td>"));
			$tbody.append($row);
		}
	}

	function populateCompanyInfo(url, callback){
		$.ajax({
			url: url,
			type: "get",
			success: function(response) {
				callback(response);
			},
			error: function(error) {
				console.log(error);
			}
		});
	}

	var company_attrs = $("#selected_company").val()[0].split(':');
	var company_id = company_attrs[0].replace('ltd.', '').replace('ltd', '').replace('limited', '').trim();
	var sic_codes = company_attrs[1];
	var export_codes = company_attrs[2];

	clearAllInfoTables();

	// Populate Timeline
	populateCompanyInfo( '/acs/api/timeline/events/' + company_id, function (response) {
			populateTimeline(response.events);
		}
	);

	// Populate SIC Codes
	if (sic_codes !== ""){
		populateCompanyInfo('/acs/api/search/sic-code/' + sic_codes, function (response) {
				populateSicCodes(response.result);
			}
		);
	}

	// Populate Export Codes
	if (export_codes !== ""){
		populateCompanyInfo('/acs/api/search/export-code/' + export_codes, function (response) {
				populateExportCodes(response.result);
			}
		);
	}
});

$(function () {

	$searchResults.after( $noResultsMessage );
	$searchResults.hide();
	$noResultsMessage.hide();

	populate_selector('service_usage', 'not');
	populate_selector('region');
	populate_selector('company_classification');
	populate_selector('headquarter_type');
	populate_selector('employee_range');
	populate_selector('sic_code', 'array');
	populate_selector('commodity_code', 'array');

	$('#datetimepicker1').datetimepicker();
	$('#datetimepicker2').datetimepicker();
});
