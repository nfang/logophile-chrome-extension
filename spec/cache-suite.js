describe('cache.js', function() {

  beforeEach(function() {
    localStorage.clear();
  });
  
  it('should be able to store string representation of a json object to localStorage', function() {
    var json = {'name':'test'};
    cache.putJSON('testPutJSON', json);
    expect(localStorage.getItem('testPutJSON')).not.toBeNull();
  });
  
  it('should be able to get a json object from localStorage', function() {
    localStorage.setItem('testGetJSON', '{"name":"test"}');
    expect(cache.getJSON('testGetJSON')).not.toBeNull();
    expect(cache.getJSON('testGetJSON').name).toEqual('test');
  });
});