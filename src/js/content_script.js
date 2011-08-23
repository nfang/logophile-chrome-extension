String.prototype.format = function() {
	var s = this, i = arguments.length;
	while(i--) {
		var reg = new RegExp("\\{" + i + "\\}", "gi");
		s = s.replace(reg, String(arguments[i]));
	}
	return s;
};

(function(logophile, $, undefined) {
	logophile.get_synonym = function(word, callback) {
		wordnik.get_related(word, 'synonym', function(data) {
			if(data && data.length > 0)
				callback(data[0].words);
		});
	};

	logophile.get_antonym = function(word, callback) {
		wordnik.get_related(word, 'antonym', function(data) {
			if(data && data.length > 0)
				callback(data[0].words);
		});
	};
}(window.logophile = window.logophile || {}, jQuery));

$('body').dblclick(function(evt) {
	var selected = window.getSelection().toString();
	if(evt.ctrlKey) {
		logophile.get_synonym(selected, function(data) {
			// Apply UI template
		});
	}
	
	if(evt.altKey) {
		logophile.get_antonym(selected, function(data) {
			// Apply UI template
		});
	}
});