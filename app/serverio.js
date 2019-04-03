/**
* Socket Server - socket.io
*/
'use strict'

const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

let
  expressServer,
  httpServer,
  socketServer,
  port = 3000;

  // build Webserver
  expressServer = express();

  // building a httüp server for socket binding
  httpServer = http.createServer(expressServer);

  // a static route for http documents
  expressServer.use(express.static(path.join(__dirname, '../')))

  httpServer.listen(port, function() {
    console.log('http server including express listening on port 3000');
  })

  // building the socket Server
  socketServer = socketio(httpServer);

  function onSocketMessage(message) {
    console.log(message);
  }

  function onSocketConnect(socket) {
    console.log('a client is connected');

    // recieve message
    socket.on('message', onSocketMessage);

    // send a message to a client
    socket.emit('message', 'hello from your soul!');

    // send to all clients
    socketServer.emit('message', 'hello from your soul!');
  }

  socketServer.sockets.on('connection', onSocketConnect);
