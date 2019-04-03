/**
* A Websocket - socket.io
*/
!(function () {
    'use strict';
    // declaration
    let socket = io()
    // methods
    function onSocketConnect() {
      console.log('socket connected');

      socket.on('message', onMessage);

      socket.emit('message', 'A hello from the outer space.');
    }

    function onMessage(message) {
      console.log(message);
    }

    // event-control
    socket.on('connect', onSocketConnect)
}());
