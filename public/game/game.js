var socket = io();

var myGuid, seconds, temp, mili, canCountdown = false;

window.onload = function() {
    myGuid = getCookie('guid') ? getCookie('guid') : guid();
    socket.emit('join', { guid: myGuid, isGame: true, gameid: getCookie('inGame') });
};

Element.prototype.getElementById = function(req) {
    var elem = this, children = elem.childNodes, i, len, id;
 
    for (i = 0, len = children.length; i < len; i++) {
        elem = children[i];
        
        //we only want real elements
        if (elem.nodeType !== 1 )
            continue;

        id = elem.id || elem.getAttribute('id');
        
        if (id === req) {
            return elem;
        }
        //recursion ftw
        //find the correct element (or nothing) within the child node
        id = elem.getElementById(req);

        if (id)
            return id;
    }
    //no match found, return null
    return null;
};

if (getCookie('inGame')) {
    var gameid = getCookie('inGame');
    
    var sqr1;
    var sqr2;
    var sqr3;
    var sqr4;
    var sqr5;
    var sqr6;
    var sqr7;
    var sqr8;
    var sqr9;
    var sqrs = [];
    var moveCount = 0;
    var turn = 1;
    var mode = 2;
    
    console.log('Board Outer');
    console.log(document.getElementById('board-outer').getElementById('board'));
    
    function vari() {
        sqr1 = document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').innerHTML;
        sqr2 = document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr2').innerHTML;
        sqr3 = document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr3').innerHTML;
        sqr4 = document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr4').innerHTML;
        sqr5 = document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr5').innerHTML;
        sqr6 = document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr6').innerHTML;
        sqr7 = document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr7').innerHTML;
        sqr8 = document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr8').innerHTML;
        sqr9 = document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr9').innerHTML;
    }
    
    function disable(bool) {
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr2').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr3').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr4').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr5').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr6').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr7').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr8').disabled = bool;
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr9').disabled = bool;
    }
    
    function markSquare(number, player) {
        if (number >= 1 && number <= 3) {
            document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr' + number).innerHTML = player.toUpperCase();
            document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr' + number).setAttribute("class", player.toLowerCase());
        } else if (number >= 4 && number <= 6) {
            document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr' + number).innerHTML = player.toUpperCase();
            document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr' + number).setAttribute("class", player.toLowerCase());
        } else if (number >= 7 && number <= 9) {
            document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr' + number).innerHTML = player.toUpperCase();
            document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr' + number).setAttribute("class", player.toLowerCase());
        }
        sqrs[number] = 1;
    }
    
    function onPlay(square) {
        if (square) {
            canCountdown = false;
            waitCountdown();
            var canDisable = false;
            
            switch(square) {
                case 1:
                    console.log(document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').innerHTML)
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(1, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 2:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr2').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(2, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 3:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr3').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(3, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 4:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr4').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(4, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 5:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr5').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(5, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 6:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr6').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(6, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 7:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr7').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(7, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 8:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr8').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(8, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                case 9:
                    if(document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr9').innerHTML == '&nbsp;' && turn == 1 && mode == 2) {markSquare(9, 'X'); turn = 0; updateServer(square); canDisable = true}
                    break;
                default:
                    break;
            }
        } else {
            turn = 0;
            updateServer(square); 
            canDisable = true;
        }
        
        if (canDisable) {
            vari();
            player1Check();
            disable(true);
        }
    }
    
    function player1Check() {
        vari();
        if (sqr1 == "X" && sqr2 == "X" && sqr3 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr4 == "X" && sqr5 == "X" && sqr6 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr7 == "X" && sqr8 == "X" && sqr9 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr1 == "X" && sqr5 == "X" && sqr9 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr1 == "X" && sqr4 == "X" && sqr7 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr2 == "X" && sqr5 == "X" && sqr8 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr3 == "X" && sqr6 == "X" && sqr9 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr1 == "X" && sqr5 == "X" && sqr9 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else if (sqr3 == "X" && sqr5 == "X" && sqr7 == "X") {
            //reset();
            alert("You win!");
            reset();
        } else {
            player2Check();
            drawCheck();
        }
    }
    
    function player2Check() {
        vari();
        if (sqr1 == "O" && sqr2 == "O" && sqr3 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr4 == "O" && sqr5 == "O" && sqr6 == "O") {
            //reset();
            alert("You lose!");
        } else if (sqr7 == "O" && sqr8 == "O" && sqr9 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr1 == "O" && sqr5 == "O" && sqr9 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr1 == "O" && sqr4 == "O" && sqr7 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr2 == "O" && sqr5 == "O" && sqr8 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr3 == "O" && sqr6 == "O" && sqr9 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr1 == "O" && sqr5 == "O" && sqr9 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else if (sqr3 == "O" && sqr5 == "O" && sqr7 == "O") {
            //reset();
            alert("You lose!");
            reset();
        } else {
            drawCheck();
        }
    }
    
    function drawCheck() {
        vari();
        moveCount = sqrs[1] + sqrs[2] + sqrs[3] + sqrs[4] + sqrs[5] + sqrs[6] + sqrs[7] + sqrs[8] + sqrs[9];
        if (moveCount == 9) {
            //reset();
            alert("Draw");
            reset();
        }
    }
    
    function reset() {
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr2').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr3').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr4').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr5').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr6').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr7').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr8').innerHTML = "&nbsp;";
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr9').innerHTML = "&nbsp;";
        
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr1').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr2').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row1').getElementById('sqr3').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr4').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr5').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row2').getElementById('sqr6').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr7').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr8').setAttribute("class", "");
        document.getElementById('board-outer').getElementById('board').getElementById('row3').getElementById('sqr9').setAttribute("class", "");
        sqrs[1] = 0;
        sqrs[2] = 0;
        sqrs[3] = 0;
        sqrs[4] = 0;
        sqrs[5] = 0;
        sqrs[6] = 0;
        sqrs[7] = 0;
        sqrs[8] = 0;
        sqrs[9] = 0;
        vari();
        turn = 1;
        moveCount = 0;
    }
    
    socket.on('move', function(data) {
        if (data.square) {
            if (data.gameid == gameid) {
                if (socket.id !== data.socketid) {
                    markSquare(data.square, 'O');
                    
                    disable(false);
                    
                    turn = 1;
                    
                    player1Check();
                    
                    initCountdown();
                    canCountdown = true;
                    countdown();
                }
            }
        } else {
            if (socket.id !== data.socketid) {
                disable(false);
                
                turn = 1;
                
                player1Check();
                
                initCountdown();
                canCountdown = true;
                countdown();
            }
        }
    });
    
    socket.on('forfeit', function(data) {
        if (data.gameid == gameid) {
            alert('Your opponent has left. You win!');
            window.location = 'http://act-adassonvil32.c9.io/joinqueue/';
        }
    });
    
    function updateServer(square) {
        socket.emit('mymove', { square: square, gameid: gameid });
    }
    
    function countdown() {
        if (canCountdown) {
            seconds = document.getElementById('countdown').innerHTML;
            seconds = parseInt(seconds, 10);
            
            if (seconds == 1) {
                temp = document.getElementById('countdown');
                temp.innerHTML = "YOU DID NOT MOVE IN TIME!";
                onPlay(false);
                
                return;
            }
            
            seconds--;
            temp = document.getElementById('countdown');
            temp.innerHTML = seconds;
            setTimeout(countdown, 1000);
            mili = setInterval(updateMilliseconds, 10);
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return false;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function initCountdown() {
    document.getElementById('countdown').innerHTML = 5;
}

function waitCountdown() {
    document.getElementById('countdown').innerHTML = "Opponent's turn...";
}

function updateMilliseconds() {
    var d = new Date();
    temp = document.getElementById('countdown');
    if (!isNaN(temp.innerHTML)) {
        var mili = 100 - Math.round(d.getMilliseconds()/10);
        if (mili < 10) {
            mili = '0' + mili;
        }
        temp.innerHTML = temp.innerHTML.split('.')[0] + '.' + mili;
    }
}