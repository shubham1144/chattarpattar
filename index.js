var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;
//Handler to give a html page in response
app.get('/', function(request, response){
  console.log("Sending html response to client");
  response.sendFile(__dirname +'/index.html');

});


//assiging a port to node.js server
io.on('connection', function(socket){
	console.log('a user connected');

	//catching the messages sent by the client sockets
	socket.on('chat message', function(msg){
		console.log('Message is : ' + msg);
		io.emit('chat message', msg);
	});
	//executed when the client socket is disconnected
	socket.on('disconnect', function(){
		console.log('Disconnected user');
	});

});

http.listen(PORT, function(){
	console.log('Listening on port ');
});
console.log('Server is listening on port ');
