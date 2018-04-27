var undef;

function percToColor(perc) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	} else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

function toInt(value) {
	return value === undef ? value : parseInt(value);
}

function toArray(value) {
	return value !== undef && !$.isArray( value ) ? [value] : value;
}

function remove_empty(obj) {
	Object.keys(obj).forEach(function(key) {
		var value = obj[key];
		var type = typeof value;
		if (type === "object") {
			remove_empty(value);
			if (!Object.keys(value).length) {
				delete obj[key];
			}
		} else if (type === "undefined") {
			delete obj[key];
		}
	});
}
