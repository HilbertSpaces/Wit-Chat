var express= require('express');

var app=express();
app.use(express.static('public'));
var socket_io= require('socket.io');
var http= require('http');
app.use(express.static('public'));

var server= http.Server(app);
var io= socket_io(server);
io.on('connection', function(socket){
	console.log('Client connected');
	socket.on('message', function(message){
	    console.log('Received message:',message);
	    socket.broadcast.emit ('message', message);
	});
});

server.listen(8080);