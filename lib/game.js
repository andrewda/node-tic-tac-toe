var crypto = require('crypto');
var Users = require('./users.js');

var userManager = new Users();

module.exports = Game;

Game.EGameStatus = require('../resources/EGameStatus.js');

function Game() {
    this._games = {};
}

Game.prototype.createGame = function(slots) {
    var gameid = crypto.randomBytes(20).toString('hex');
    this._games[gameid] = { gameid: gameid, slots: slots, players: [], status: Game.EGameStatus.Waiting };
    return gameid;
};

Game.prototype.addPlayerToGame = function(gameid, guid) {
    this._games[gameid].players.push(guid);
};

Game.prototype.getGame = function(gameid) {
    if (this._games[gameid]) {
        return this._games[gameid];
    } else {
        return false;
    }
};

Game.prototype.setStatus = function(gameid, status) {
    if (this._games[gameid]) {
        this._games[gameid].status = status;
    } else {
        return false;
    }
};

Game.prototype.startGame = function(gameid) {
    if (typeof this._games[gameid] !== 'undefined') {
        var game = this.getGame(gameid);
        
        if (game) {
            this.setStatus(gameid, Game.EGameStatus.Live);
            
            game.players.forEach(function(guid) {
                userManager.setStatus(guid, Users.EUserStatus.InGame);
                userManager.setGameid(guid, gameid);
            });
        }
    }
};
