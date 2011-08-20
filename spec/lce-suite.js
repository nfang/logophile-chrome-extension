describe('lce', function() {
	it('should be able to get hyphened representation of a specified word', function() {
		lce.get_hyphenation('cynosure', function(data) {
			var hyphened = $.map(data, function(v, i) { return v.text; }).join('·');
			expect(hyphened).toEqual('cy·no·sure');
		});
		waits(800);
	});
	
	it('should be able to get pronunciation for a specified word', function() {
		lce.get_pronunciation('cynosure', function(data) {
			var formatted;			
			if(data.length > 0) {
				to = data[0].raw.length - 1;
				formatted = data[0].raw.substring(1, to);
			}
			expect(formatted).toEqual('sīˈnə-sho͝orˌ, sĭnˈə-');
		});
		waits(800);
	});
	
	it('should be able to get audio for a specified word', function() {
		lce.get_audio('cynosure', function(data) {
			expect(data[0].word).toEqual('cynosure');
		});
		waits(800);
	});
	
	it('should be able to get "word of the day" by a specified date', function() {
		lce.get_word_of_the_day(new Date(), function(data) {
			expect(data.word).not.toBeNull();
		});
		waits(800);
	});
	
	it('should be able to retrieve all required information and assemble them together', function() {
		lce.assemble(new Date(), function(entity) {
			expect(entity.word).not.toBeNull();
		});
		waits(800);
	});
});