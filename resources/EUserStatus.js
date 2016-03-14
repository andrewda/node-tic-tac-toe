module.exports = {
    "Idle": 0,
	"InQueue": 1,
	"InAccept": 2,
	"InGame": 3
};

module.exports.getStatusName = function(result) {
	for (var i in module.exports) {
		if (module.exports.hasOwnProperty(i) && module.exports[i] == result) {
			return i;
		}
	}
	
	return 'Invalid';
};
