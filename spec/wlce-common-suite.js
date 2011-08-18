describe('wlce.common', function() {
	var dat;
	
	beforeEach(function() {
		dat = new Date(2010, 2, 18, 0, 0, 0, 0);
	});
	
	it('should be able to pad zeros to a given string', function() {
		var num = 7;
		expect(wlce.common.pad(num)).toEqual('07');
		expect(wlce.common.pad(num, 5)).toEqual('00007');
	});
	
	it('should be able to stringify date to ISO date format (yyyy-MM-dd)', function() {
		var err = "error";
		expect(wlce.common.format_date(err)).toEqual("error");
		expect(wlce.common.format_date(dat)).toEqual('2010-03-18');
	});
	
	it('should be able to fill a specified string pattern with specified objects', function() {
		var fmt = '{0} of the {1}: ({2})'.format('Word', 'Day', dat);
		expect(fmt).toEqual('Word of the Day: (' + dat.toString() + ')');
	});
	
	it('should be able to take a specified number of elements from an array', function() {
		var arr = [1, 2, 3, 4].take(3);
		expect(arr.length).toEqual(3);
		expect(arr[0]).toEqual(1);
	});
});