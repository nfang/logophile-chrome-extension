describe('common.js', function() {
	it('should be able to take a specified number of elements from an array', function() {
		var arr = [1, 2, 3, 4].take(3);
		expect(arr.length).toEqual(3);
		expect(arr[0]).toEqual(1);
	});
	
	it('should be able to pad zeros to a given string', function() {
		var num = 7;
		expect(pad(num)).toEqual('07');
		expect(pad(num, 5)).toEqual('00007');
	});
	
	it('should be able to format a date for a specified pattern', function() {
		var dat = new Date(2010, 1, 18, 19, 20, 1, 0);
		expect(dat.format('yyMMdd')).toEqual('100218');
		expect(dat.format('MMMM dd yyyy EEEE')).toEqual('February 18 2010 Thursday');
		expect(dat.format('HH:mm:ss')).toEqual('19:20:01');
		expect(dat.format('hh a')).toEqual('07 PM');
	});
	
	it('should be able to fill a specified string pattern with specified objects', function() {
		var fmt = '{0} of the {1}: ({2})'.format('Word', 'Day', 'cynosure');
		expect(fmt).toEqual('Word of the Day: (cynosure)');
	});
	
	it('should be able to calculate Scrabble score for a given word', function() {
		expect("word".get_scrabble_score()).toEqual(8);
		expect("w-o-r-d".get_scrabble_score()).toEqual(0);
		expect("WORD".get_scrabble_score()).toEqual(8);
	});
});