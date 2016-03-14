var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Users = require('./lib/users.js');
var Game = require('./lib/game.js');

var userManager = new Users();
var gameManager = new Game();

var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket) {
    socket.emit('players', { number_players: userManager.getPlayersInQueue() });
    
    socket.on('join', function(data) {
        console.log(data);
        
        if (data.isGame) {
            userManager.createUser(data.guid);
            userManager.setSocketId(data.guid, socket.id);
            userManager.setStatus(userManager.getGuidBySocketId(socket.id), Users.EUserStatus.InGame);
            userManager.setGameid(userManager.getGuidBySocketId(socket.id), data.gameid);
        } else {
            userManager.createUser(data.guid);
            userManager.setSocketId(data.guid, socket.id);
            userManager.setStatus(userManager.getGuidBySocketId(socket.id), Users.EUserStatus.InQueue);
        }
        
        console.log(userManager.getStatus(data.guid));
        
        socket.emit('success', { guid: data.guid });
    });
    
    socket.on('mymove', function(data) {
        io.emit('move', { gameid: data.gameid, square: data.square, socketid: socket.id });
    });
    
    socket.on('disconnect', function() {
        if (userManager.getGuidBySocketId(socket.id)) {
            var guid = userManager.getGuidBySocketId(socket.id);
            
            if (userManager.getStatus(guid) == Users.EUserStatus.InGame) {//we need to emit forfeit for people who RIP
                var player = userManager.getPlayers()[guid];
                
                if (player) {
                    io.emit('forfeit', { gameid: player.gameid }); 
                }
            }
        }
        
        userManager.removeUser(userManager.getGuidBySocketId(socket.id));
    });
});

setInterval(function() {
    var numPlayers = userManager.getPlayersInQueue();
    var queueTime = Math.floor((numPlayers/2) * 10);
    
    if (numPlayers <= 1) {
        queueTime = 'inf';
    }
    
    io.emit('players', { number_players: numPlayers });
    io.emit('queuetime', { seconds: queueTime });
}, 500);

setInterval(function() {
    var users = userManager.getPlayers();
    var forGame = [];
    if (userManager.getPlayersInQueue() >= 2) {
        for (var i = 0; i < 2; i++) {
            var property = pickRandomProperty(users);
            forGame.push(users[property].guid);
            delete users[property];
        }
        
        initGame(forGame);
    }
}, 10000);

function initGame(players) {
    var gameid = gameManager.createGame(2);
    
    players.forEach(function(player) {
        gameManager.addPlayerToGame(gameid, player);
    });
    
    gameManager.startGame(gameid);
    
    console.log(Game.EGameStatus.getStatusName(gameManager.getGame(gameid).status));
    
    io.emit('start', { gameid: gameid });
    
    players.forEach(function(player) {
        var socketid = userManager.getSocketIdByGuid(player);
        
        if (io.sockets.connected[socketid]) {
            io.sockets.connected[socketid].emit('game', { gameid: gameid });
        }
    });
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj) {
        if (Math.random() < 1/++count) {
            result = prop;
        }
    }
    
    return result;
}

app.use(express.static(__dirname + '/public'));
