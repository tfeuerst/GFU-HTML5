/**
* Socket Server
* noch eine Änderung
*/
let WsServer = require('ws').Server,
  socketServer = new WsServer ({
    host: 'localhost',
    port: 3000
  });

function onSocketConnection(socketConnection) {
  console.log('client via socket connected.');

  socketConnection.send('Hey there.');
  socketConnection.on('message', onSocketMessage);
}

function onSocketMessage(message) {
  console.log('message from client received:', message);
}

socketServer.on('connection', onSocketConnection);
