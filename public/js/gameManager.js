$(function() {
    var socket = io();

    var $window = $(window);
    var $online = undefined;
    var $minutes = undefined;
    var $seconds = undefined;
    
    var blur = false;
    
    var loginSuccess = false;
    
    var myGuid;
    
    //When window is not in focus
    window.onblur = function() {
        blur = true;
    };

    //When window is in focus
    window.onfocus = function() {
        blur = false;
    };
    
    window.onload = function() {
        myGuid = getCookie('guid') ? getCookie('guid') : guid();
        socket.emit('join', { guid: myGuid });
        
        $online = $('#online');
        $online.html('0');
        
        //deleteAllCookies();
    };
    
    socket.on('success', function(data) {
        setCookie('guid', data.guid, 30);
        
        loginSuccess = true;
    });
    
    socket.on('game', function(data) {
        new Audio('http://soundjax.com/reddo/42986%5Eding.mp3').play();
        
        setCookie('inGame', data.gameid, 0.1);
        
        window.location = "https://act-adassonvil32.c9.io/game/";
    });
    
    socket.on('players', function(data) {
        var players = data.number_players;
        
        if (!loginSuccess) {
            players++;
        }
        
        if ($online) {
            $online.html(players);
        }
    });
    
    socket.on('queuetime', function(data) {
        $minutes = $('#queueminutes');
        $seconds = $('#queueseconds');
        
        if (data.seconds === 'inf') {
            $minutes.html('∞');
            $seconds.html('∞');
        } else {
            if (data.seconds < 60) {
                $minutes.html('0');
                $seconds.html(getDouble(Math.round(data.seconds).toString()));
                
                console.log('0:' + getDouble(data.seconds.toString()));
            } else {
                $minutes.html(Math.floor(data.seconds/60));
                $seconds.html(getDouble(Math.round(data.seconds % 60).toString()));
                
                console.log(Math.floor(data.seconds/60) + ':' + getDouble(data.seconds.toString()));
            }
        }
    });
    
    function getDouble(seconds) {
        if (seconds.length === 2) {
            return seconds;
        } else {
            return '0' + seconds;
        }
    }
    
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires+"; path=/";
    }
    
    function getCookie(cname) {
        // do not get cookie
        return false;
        /*var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return false;*/
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
        	var cookie = cookies[i];
        	var eqPos = cookie.indexOf("=");
        	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
});