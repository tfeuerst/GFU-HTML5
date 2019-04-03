/**
* A Websocket
*/
!(function () {
    'use strict';
    // declaration
    let
      address = 'ws://localhost:3000',
      socket = new WebSocket(address);
    // methods
    function onSocketOpen() {
        console.log('socket opened');
    }

    function onSocketError(error) {
        console.log('socket error', error);
    }

    function onSocketMessage(message) {
        console.log('socket message recieved', message);
    }

    // event-control
    socket.addEventListener('open', onSocketOpen);
    socket.addEventListener('error', onSocketError);
    socket.addEventListener('message', onSocketMessage);

    socket.send('A message from Chrome ..');
}());
