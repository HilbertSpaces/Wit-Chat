var express= require('express');

var app=express();
app.use(express.static('public'));
var socket_io= require('socket.io');
var http= require('http');
const {Wit,log}= require('../').Wit;

'use strict';

var server= http.Server(app);
var io= socket_io(server);
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
server.listen(process.env.PORT || 8080, process.env.IP);
console.log("listening on..."+process.env.PORT);
