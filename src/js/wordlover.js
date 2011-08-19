(function(wlce, $, undefined) {
	wlce.API_BASE_URL = "http://api.wordnik.com/v4";
	
	wlce.API_KEY = "9f6ca76279690fb4c800304fdaa05c60993d46931bae1fcd7";
	
	m = {
		a: 1, b: 4, c: 4, d: 2,
		e: 1, f: 4, g: 3, h: 3,
		i: 1, j: 10, k: 5, l: 2,
		m: 4, n: 2, o: 1, p: 4,
		q: 10, r: 1, s: 1, t: 1,
		u: 2, v: 5, w: 4, x: 8,
		y: 3, z: 10
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
	
	String.prototype.get_scrabble_score = function(opt) {
		var s = this, i = s.length, sum = 0;
		while(i--) {
			sum += m[s.charAt(i)];
		}
		return sum;
	}
	
	/**
	 * Take a specified number of elements from an array
	 */
	Array.prototype.take = function(size) {
		var a = this, s = size || this.length;
		return this.slice(0, s);
	};
	
	/**
	 * Define wlce.common namespace
	 */
	wlce.common = wlce.common || {};
	
	/**
	 * Prepend zeros to a string until its length reaches a specified number
	 */
	wlce.common.pad = function(v, L) {
		var vs = String(v), len = L || 2;
		while(vs.length < len) vs = "0" + vs;
		return vs;
	};
	
	/**
	 * Stringify a date object to yyyy-MM-dd format
	 */
	wlce.common.format_date = function(date) {
		var dat = new Date(date);
		if (!dat || isNaN(dat.getDate())) return date;
		return "{0}-{1}-{2}".format(dat.getFullYear(), wlce.common.pad(dat.getMonth() + 1), wlce.common.pad(dat.getDate()));
	};

	wlce.assemble = function(date, callback) {
		wlce.get_word_of_the_day(date).success(function(data) {
			var w = data.word;
			$.when(wlce.get_hyphenation(w), wlce.get_pronunciation(w), wlce.get_audio(w)).then(function(h, p, a) {
				var entity = {
					"id": data.id,
					"word": data.word,
					"hyphenation": $.map(h[0], function(v, i) { return v.text; }).join('·'),					
					"pronunciation": p[0].length > 0 ? p[0][0].raw.slice(1, -1) : "",
					"audio": a[0].length > 0 ? a[0][0].fileUrl : "",
					"examples": data.examples.take(2),
					"definitions": data.definitions,
					"note": data.note,
					"score": data.word.split(' ').length > 1 ? "-" : data.word.get_scrabble_score()
				};
				callback(entity);
			});
		});
	};
	
	wlce.get_word_of_the_day = function(date, callback) {
		var dt = wlce.common.format_date(date);
		var url = "{0}/words.json/wordOfTheDay?api_key={1}&date={2}".format(
			wlce.API_BASE_URL, wlce.API_KEY, dt);
		return $.getJSON(url, callback);
	};
	
	wlce.get_hyphenation = function(word, callback) {
		var url = "{0}/word.json/{1}/hyphenation?api_key={2}".format(
			wlce.API_BASE_URL, encodeURIComponent(word), wlce.API_KEY);
		return $.getJSON(url, callback);
	};
	
	wlce.get_pronunciation = function(word, callback) {
		var url = "{0}/word.json/{1}/pronunciations?typeFormat=ahd&api_key={2}".format(
			wlce.API_BASE_URL, encodeURIComponent(word), wlce.API_KEY)
		return $.getJSON(url, callback);
	};
	
	wlce.get_audio = function(word, callback) {
		var url = "{0}/word.json/{1}/audio?api_key={2}".format(
			wlce.API_BASE_URL, encodeURIComponent(word), wlce.API_KEY);
		return $.getJSON(url, callback);
	};
	
} (window.wlce = window.wlce || { }, jQuery));