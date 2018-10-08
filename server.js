var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayerID = 0; // Keep track of the last id assigned to a new player

io.on('connection',function(socket){
	console.log("Connection");
    socket.on('newplayer',function(){
    	console.log("Connection calls new player");
        socket.player = {
            id: server.lastPlayerID++,
            /*
            x: randomInt(100,400),
            y: randomInt(100,400)
        	*/
        };
        console.log("Emit + broadcast");
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);
        console.log("Completed!");
    });

    socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}