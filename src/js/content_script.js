$body = $('body');
$('body').append($('<div id="logophile_panel" class="logophile">'));

/**
 * Tap hold events
 */
$('body').mousedown(function(e) {
  if(e.which && e.which !== 1) {
    return false;
  }

  var target_ = e.target, event_ = e.originalEvent, timer;

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
    if(!(/\s+/.test(selected))) {
      var payload = { 'action': 'g_def', 'args': {'word': selected} };
      chrome.extension.sendRequest(payload, function(response) {
        console.log(response);
      });
    }
  }, 750)
});
