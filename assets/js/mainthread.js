/**
* A Main Thread
*/

!(function() {
  // declaration
  let
    init = undefined,
    worker = new Worker('assets/js/workerthread.js'),
    buttons = document.querySelectorAll('button[data-command]'),
    message = document.querySelector('#message'),
    output = document.querySelector('#data');

  // methods
  init = function (){
    worker.postMessage(JSON.stringify({
      message : 'A message from main!'
    }));
  };

  function onWorkerMessage(event){
    let
      data = JSON.parse(event.data);
      if ('message' in data) {
        message.innerHTML = data.message
      }

      if ('data' in data) {
        for (let key in data.data) {
          output.innerHTML += '<li>' + key + ': ' + data.data[key] + '</li>'
        }
      }
  }

  function onButtonClick(event){
    let
      url = undefined,
      command = event.target.dataset.command;

      switch (command) {
        case 'stop':
          worker.terminate();
          break;
        case 'start':
          if (typeof worker != "undefined") {
              worker = new Worker('assets/js/workerthread.js');
          }
          worker.postMessage(JSON.stringify({
            command : 'start'
          }));
          break;
        case 'ajax':
          let command = {
            command : 'ajax',
            url : event.target.dataset.url
          };
          worker.postMessage(JSON.stringify(command))
          break;
      }
  }
  // event-control
  window.addEventListener('load', init);
  worker.addEventListener('message', onWorkerMessage);

  for (let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click', onButtonClick)
  }

}());
