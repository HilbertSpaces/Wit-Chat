var express= require('express');

var app=express();
app.use(express.static('public'));
var socket_io= require('socket.io');
var http= require('http');
Wit=require('../').Wit;
const client= new Wit({accessToken:'3LWGZX64CB5HO7RL2H4H4UCIFHPQ7W47'});

'use strict';

var server= http.Server(app);
const io= socketIO(server);
io.on('connection', function(socket){
	console.log('Client connected');
	socket.on('message', function(message){
		console.log(message);
		socket.broadcast.emit('message',message);
		client.converse('my-user-session-42', message,{}).then((data)=>{
			io.emit('message',data.msg);
		});
	});
});
server.listen(PORT);
console.log("listening on...8080");
