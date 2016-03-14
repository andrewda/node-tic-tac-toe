module.exports = {
    "Multiplayer": 0,
    "Online": 0, // obsolete, use "Multiplayer"
	"AI": 1,
	"Offline": 1 // obsolete, use "AI"
};

module.exports.getStatusName = function(result) {
	for (var i in module.exports) {
		if (module.exports.hasOwnProperty(i) && module.exports[i] == result) {
			return i;
		}
	}
	
	return 'Invalid';
};
