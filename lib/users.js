var crypto = require('crypto');

module.exports = Users;

Users.EUserStatus = require('../resources/EUserStatus.js');

function Users() {
	this._online = {};
	this._socketids = {};
	this._socketidByGuid = {};
	this._confirmations = {};
	
	this._numplayers = 0;
}

Users.prototype.createUser = function(guid) {
    this._online[guid] = { guid: guid, status: 0 };
    this._numplayers++;
};

Users.prototype.removeUser = function(guid) {
    delete this._online[guid];
    delete this._socketidByGuid[guid];
    delete this._socketids[this.getSocketIdByGuid(guid)];
    this._numplayers--;
};

Users.prototype.setSocketId = function(guid, socketid) {
    for (var key in this._socketids) {
        if (!this._socketids.hasOwnProperty(key)) continue;
    
        var thisGuid = this._socketids[key];
        
        if (thisGuid === guid) {
            delete this._socketids[key];
        }
    }
    
    if (this._socketidByGuid[guid]) {
        delete this._socketidByGuid[guid];
    }
    
    this._socketids[socketid] = guid;
    this._socketidByGuid[guid] = socketid;
};

Users.prototype.getGuidBySocketId = function(socketid) {
    if (this._socketids[socketid]) {
        return this._socketids[socketid];
    } else {
        return false;
    }
};

Users.prototype.setConfirmation = function(socketid, confirmation) {
    this._confirmations[socketid] = confirmation;
};

Users.prototype.getConfirmationBySocketId = function(socketid) {
    if (this._confirmations[socketid]) {
        return this._confirmations[socketid];
    } else {
        return false;
    }
};

Users.prototype.getSocketIdByGuid = function(guid) {
    if (this._socketidByGuid[guid]) {
        return this._socketidByGuid[guid];
    } else {
        return false;
    }
};

Users.prototype.setStatus = function(guid, status) {
    if (this._online[guid]) {
        this._online[guid].status = status;
    } else {
        return false;
    }
};

Users.prototype.getStatus = function(guid) {
    if (this._online[guid]) {
        return this._online[guid].status;
    } else {
        return false;
    }
};

Users.prototype.setGameid = function(guid, gameid) {
    if (this._online[guid]) {
        this._online[guid].gameid = gameid;
    } else {
        return false;
    }
};

Users.prototype.getGameid = function(guid) {
    if (this._online[guid]) {
        return this._online[guid].gameid;
    } else {
        return false;
    }
};

Users.prototype.getPlayersInQueue = function() {
    var players = 0;
    for (var key in this._online) {
        if (!this._online.hasOwnProperty(key)) continue;
    
        var player = this._online[key];
        
        if (player.status === Users.EUserStatus.InQueue) {
            players++;
        }
    }
    
    return players;
};

Users.prototype.getPlayers = function() {
    return this._online;
};

Users.prototype.generateGuid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

Users.prototype.generateConfirmation = function() {
    return crypto.randomBytes(16).toString('hex');
};
