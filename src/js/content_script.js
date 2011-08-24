/**
 * Request format: { action: ['g_syn', 'g_ant', ...], args: { word: '' } }
 */
$('body').dblclick(function(evt) {
	var selected = window.getSelection().toString().trim();
	if(evt.ctrlKey) {
		var payload = {'action': 'g_syn', 'args': {'word': selected} };
		chrome.extension.sendRequest(payload, function(response) {
			console.log(response);
		});
	}

	if(evt.altKey) {
		var payload = {'action': 'g_ant', 'args': {'word': selected} };
		chrome.extension.sendRequest(payload, function(response) {
			console.log(response);
		});
	}
	
});