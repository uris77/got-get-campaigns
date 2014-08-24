utils = {
	isNumber: function(str) {
		var parsedInt = parseInt(str.trim());
		return !_.isUndefined(str) && (!_.isEmpty(str.trim())) && ((parsedInt > 0) || (parsedInt < 0)) && _.isNumber(parsedInt);
	}
};