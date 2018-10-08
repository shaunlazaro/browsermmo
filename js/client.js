var Client = {};
Client.socket = io.connect(); // This is what you connect to, default is localhost

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};


var players = 0;

// New player joined, data is a single player
Client.socket.on('newplayer',function(data){
    //Game.addNewPlayer(data.id,data.x,data.y);
    players++;
    document.getElementById("playerCount").innerHTML = "Players" + players;
});

// Get on joining, gives a list of all connected players.
Client.socket.on('allplayers',function(data){
	console.log("All Players Heard!");
	players = data.length;
    document.getElementById("playerCount").innerHTML = "Players" + players;
});

Client.socket.on('remove',function(id){
    //Game.removePlayer(id);
    players--;

    document.getElementById("playerCount").innerHTML = "Players" + players;
});

console.log("client is done");