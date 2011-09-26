(function(cache, undefined) {
  cache.put = function(k, v) {
    return localStorage.setItem(k, v);
  }
  
  cache.putJSON = function(k, v) {
    try {
      return localStorage.setItem(k, JSON.stringify(v));
    } catch(e) {}
    return;
  };
  
  cache.get = function(k) {
    return localStorage.getItem(k);
  }
  
  cache.getJSON = function(k) {
    var item = localStorage.getItem(k);
    try {
      if(item) return JSON.parse(item);
    } catch(e) {}
    return;
  };
  
  cache.flush = function() {
    localStorage.clear();
  };
  
  cache.rem = function(k) {
    try {
      localStorage.removeItem(k);
    } catch(e) {}
    return;
  };
}(window.cache = window.cache || {}));