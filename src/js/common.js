_scrabble = {
	wwf: {
		a: 1, b: 4, c: 4, d: 2,
		e: 1, f: 4, g: 3, h: 3,
		i: 1, j: 10, k: 5, l: 2,
		m: 4, n: 2, o: 1, p: 4,
		q: 10, r: 1, s: 1, t: 1,
		u: 2, v: 5, w: 4, x: 8,
		y: 3, z: 10
	},
	eng: {
		a: 1, b: 3, c: 3, d: 2,
		e: 1, f: 4, g: 2, h: 4,
		i: 1, j: 8, k: 5, l: 1,
		m: 3, n: 1, o: 1, p: 3,
		q: 10, r: 1, s: 1, t: 1,
		u: 1, v: 4, w: 4, x: 8,
		y: 4, z: 10
	}
};
  
/**
 * Take a specified number of elements from an array
 */
Array.prototype.take = function(size) {
	var a = this, s = size || this.length;
	return this.slice(0, s);
};

Date.prototype._patternParts = /^(yy(yy)?|M(M(M(M)?)?)?|d(d)?|EEE(E)?|a|H(H)?|h(h)?|m(m)?|s(s)?|S)/;
	
Date.prototype._monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

Date.prototype._dayNames = [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

Date.prototype._patternValues = {
	yy: function() {
		return this.getFullYear().toString().substr(-2);
	},
	yyyy: function() {
		return this.getFullYear().toString();
	},
	MMMM: function() {
		return this._monthNames[this.getMonth()];
	},
	MMM: function() {
		return this._monthNames[this.getMonth()].substr(0, 3);
	},
	MM: function() {
		return pad(this.getMonth() + 1, 2);
	},
	M: function() {
		return this.getMonth() + 1;
	},
	dd: function() {
		return pad(this.getDate(), 2);
	},
	d: function() {
		return this.getDate();
	},
	EEEE: function() {
		return this._dayNames[this.getDay()];
	},
	EEE: function() {
		return this._dayNames[this.getDay()].substr(0, 3);
	},
	HH: function() {
		return pad(this.getHours());
	},
	H: function() {
		return this.getHours();
	},
	hh: function() {
		var hours = this.getHours();
		return pad(hours > 12 ? hours - 12 : hours, 2);
	},
	h: function() {
		return this.getHours() % 12;
	},
	mm: function() {
		return pad(this.getMinutes(), 2);
	},
	m: function() {
		return this.getMinutes();
	},
	ss: function() {
		return pad(this.getSeconds(), 2);
	},
	s: function() {
		return this.getSeconds();
	},
	S: function() {
		return pad(this.getMilliseconds(), 3);
	},
	a: function() {
		return this.getHours() < 12 ? 'AM' : 'PM';
	}
}

/**
 * Format a datetime for a specified pattern
 */
Date.prototype.format = function(pattern) {
	var result = [];
	while(pattern.length > 0) {
		this._patternParts.lastIndex = 0;
		var matched = this._patternParts.exec(pattern);
		if(matched) {
			result.push(this._patternValues[matched[0]].call(this));
			pattern = pattern.slice(matched[0].length);
		} else {
			result.push(pattern.charAt(0));
			pattern = pattern.slice(1);
		}
	}
	return result.join('');
};

/**
 * Replace one or more format items in a specified pattern with string representation of specified objects
 */
String.prototype.format = function() {
	var s = this, i = arguments.length;
	while(i--) {
		var reg = new RegExp("\\{" + i + "\\}", "gi");
		s = s.replace(reg, String(arguments[i]));
	}
	return s;
};

/**
 * Calculate Scrabble score for a word
 */
String.prototype.get_scrabble_score = function(typ) {
	var s = this.toLowerCase(), i = s.length, sum = 0, t = typ || "wwf";
	if(s.search(/\W+/) >= 0) return 0;
	while(i--) {
		sum += _scrabble[t][s.charAt(i)];
	}
	return sum;
}

/**
 * Prepend zeros to a string until its length reaches a specified number
 */
function pad(v, L) {
	var vs = String(v), len = L || 2;
	while(vs.length < len) vs = "0" + vs;
	return vs;
};

window.logophile = window.logophile || chrome.extension.getBackgroundPage();