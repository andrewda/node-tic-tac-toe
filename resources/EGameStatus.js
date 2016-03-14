module.exports = {
    "Waiting": 0,
	"Live": 1,
	"Complete": 2
};

module.exports.getStatusName = function(result) {
	for (var i in module.exports) {
		if (module.exports.hasOwnProperty(i) && module.exports[i] == result) {
			return i;
		}
	}
	
	return 'Invalid';
};
