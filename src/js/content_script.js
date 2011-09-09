$('body').append($('<div id="logophile_panel" class="logophile">'));
/**
 * Request format: { action: ['g_syn', 'g_ant', ...], args: { word: '' } }
 */
// $('body').dblclick(function(evt) {
// 	var selected = window.getSelection().toString().trim();
// 	if(evt.ctrlKey) {
// 		var payload = {'action': 'g_syn', 'args': {'word': selected} };
// 		chrome.extension.sendRequest(payload, function(response) {
// 			console.log(response);
// 		});
// 	}

// 	if(evt.altKey) {
// 		var payload = {'action': 'g_ant', 'args': {'word': selected} };
// 		chrome.extension.sendRequest(payload, function(response) {
// 			console.log(response);
// 		});
// 	}
	
// });

/**
 * Tap hold and swipe events
 */
$body = $('body');
$('body').mousedown(function(e) {
	if(e.which && e.which !== 1) {
		return false;
	}

	var target_ = e.target, 
		event_ = e.originalEvent, 
		timer;

	var startPos = {
		X: e.pageX, Y: e.pageY
	};

	function clearTapTimer() {
		clearTimeout(timer);
	}

	function clickHandler(evt) {
		clearTapHandlers();
		if(target_ == evt.target) {
			$body.click(evt);
		}
	}

	function clearTapHandlers() {
		clearTapTimer();
		$body.unbind('click', clickHandler)
			 .unbind('mouseup', clearTapTimer);
	}

	$(this).bind('mouseup', clearTapTimer)
		   .bind('click', clickHandler);
	
	timer = setTimeout(function() {
		var selected = window.getSelection().toString().trim();
		if(!(/\s+/.test(selected)) {
			var payload = {'action': 'g_def', 'args': {'word': selected} };
			chrome.extension.sendRequest(payload, function(response) {
				console.log(response);
			});
		}
	}, 750)
});
