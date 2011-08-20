(function(lce, $, undefined) {
	lce.API_BASE_URL = "http://api.wordnik.com/v4";
	
	lce.API_KEY = "9f6ca76279690fb4c800304fdaa05c60993d46931bae1fcd7";
	
	var bk = chrome.extension.getBackgroundPage();
	
	scrabble = {
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
			sum += scrabble[t][s.charAt(i)];
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
	 * Define lce.common namespace
	 */
	lce.common = lce.common || {};
	
	/**
	 * Prepend zeros to a string until its length reaches a specified number
	 */
	lce.common.pad = function(v, L) {
		var vs = String(v), len = L || 2;
		while(vs.length < len) vs = "0" + vs;
		return vs;
	};
	
	/**
	 * Stringify a date object to yyyy-MM-dd format
	 */
	lce.common.format_date = function(date) {
		var dat = new Date(date);
		if (!dat || isNaN(dat.getDate())) return date;
		return "{0}-{1}-{2}".format(dat.getFullYear(), lce.common.pad(dat.getMonth() + 1), lce.common.pad(dat.getDate()));
	};

	lce.assemble = function(date, callback) {
		var cached = bk.cache.getJSON("WOTD");
		if(cached && cached.date === lce.common.format_date(date)) {
			return callback(cached);
		}		
		lce.get_word_of_the_day(date).success(function(data) {
			var w = data.word;
			$.when(lce.get_hyphenation(w), lce.get_pronunciation(w), lce.get_audio(w)).then(function(h, p, a) {
				var entity = {
					"id": data.id,
					"word": data.word,
					"date": lce.common.format_date(date),
					"hyphenation": $.map(h[0], function(v, i) { return v.text; }).join('·'),					
					"pronunciation": p[0].length > 0 ? p[0][0].raw.slice(1, -1) : "",
					"audio": a[0].length > 0 ? a[0][0].fileUrl : "",
					"examples": data.examples.take(2),
					"definitions": data.definitions,
					"note": data.note,
					"score": data.word.get_scrabble_score()
				};
				bk.cache.putJSON("WOTD", entity);
				callback(entity);
			});
		});
	};
	
	lce.get_word_of_the_day = function(date, callback) {
		var dt = lce.common.format_date(date);
		var url = "{0}/words.json/wordOfTheDay?api_key={1}&date={2}".format(
			lce.API_BASE_URL, lce.API_KEY, dt);
		return $.getJSON(url, callback);
	};
	
	lce.get_hyphenation = function(word, callback) {
		var url = "{0}/word.json/{1}/hyphenation?api_key={2}".format(
			lce.API_BASE_URL, encodeURIComponent(word), lce.API_KEY);
		return $.getJSON(url, callback);
	};
	
	lce.get_pronunciation = function(word, callback) {
		var url = "{0}/word.json/{1}/pronunciations?typeFormat=ahd&api_key={2}".format(
			lce.API_BASE_URL, encodeURIComponent(word), lce.API_KEY)
		return $.getJSON(url, callback);
	};
	
	lce.get_audio = function(word, callback) {
		var url = "{0}/word.json/{1}/audio?api_key={2}".format(
			lce.API_BASE_URL, encodeURIComponent(word), lce.API_KEY);
		return $.getJSON(url, callback);
	};
	
} (window.lce = window.lce || {}, jQuery));