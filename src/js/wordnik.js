(function(wordnik, undefined) {
	wordnik.API_BASE_URL = "http://api.wordnik.com/v4";
	wordnik.API_KEY = "9f6ca76279690fb4c800304fdaa05c60993d46931bae1fcd7";
	
	wordnik.get_word_of_the_day = function(date, callback) {
		var dt = date.format("yyyy-MM-dd");
		var url = "{0}/words.json/wordOfTheDay?api_key={1}&date={2}".format(
			wordnik.API_BASE_URL, wordnik.API_KEY, dt);
		return $.getJSON(url, callback);
	};
	
	wordnik.get_hyphenation = function(word, callback) {
		var url = "{0}/word.json/{1}/hyphenation?api_key={2}".format(
			wordnik.API_BASE_URL, encodeURIComponent(word), wordnik.API_KEY);
		return $.getJSON(url, callback);
	};
	
	wordnik.get_pronunciation = function(word, callback) {
		var url = "{0}/word.json/{1}/pronunciations?typeFormat=ahd&api_key={2}".format(
			wordnik.API_BASE_URL, encodeURIComponent(word), wordnik.API_KEY);
		return $.getJSON(url, callback);
	};
	
	wordnik.get_audio = function(word, callback) {
		var url = "{0}/word.json/{1}/audio?api_key={2}".format(
			wordnik.API_BASE_URL, encodeURIComponent(word), wordnik.API_KEY);
		return $.getJSON(url, callback);
	};
	
	wordnik.get_related = function(word, type, callback) {
		var url = "{0}/word.json/{1}/related?type={2}&useCanonical=true&api_key={3}".format(
			wordnik.API_BASE_URL, encodeURIComponent(word), type, wordnik.API_KEY);
		return $.getJSON(url, callback);
	};
}(window.wordnik = window.wordnik || {}));