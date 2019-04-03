/**
* A Worker Thread
*/
!(function() {
  // declaration

  // methods
  function ajaxLoad(url){
    let
      xhr = new XMLHttpRequest();

      // This part for modern browsers
      xhr.addEventListener("progress", updateProgress);
      xhr.addEventListener("load", transferComplete);
      xhr.addEventListener("error", transferFailed);
      xhr.addEventListener("abort", transferCanceled);

//      xhr.addEventListener('onreadystatechange', function() {
      xhr.onreadystatechange = function() {
        console.log(xhr);
        switch (xhr.readyState) {
            case 0:
            console.log('no ajax');
            break;
            case 1:
            console.log('request opened');
            break;
            case 2:
            console.log('request send');
            break;
            case 3:
            console.log('response part 1 recieved');
            if(xhr.status === 404) {self.postMessage(JSON.stringify({
              message: 'file not found.'
              }));
            }
            if(xhr.status === 200) {self.postMessage(JSON.stringify({
              message: 'file found.'
              }));
            }
            break;
            case 4:
            console.log('response end');
            self.postMessage(xhr.response);
            break;
        }
      };

      xhr.open('POST', url);
      xhr.send();
  }

  // progress on transfers from the server to the client (downloads)
  function updateProgress (event) {
    console.log(event);
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total * 100;
      console.log("The transfer is " + percentComplete + "% complete.");
    } else {
      console.log("Unable");

    }
  }

  function transferComplete(evt) {
    console.log("The transfer is complete.");
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
  }

  function onMainThreadMessage(event) {
    let
      data = {},
      command = undefined,
      url = undefined;

      data = JSON.parse(event.data);
      command = data.command;
      url = data.url;

      console.log(data);
      console.log(command);
      console.log(url);

      switch (command) {
        case 'start':
          break;
        case 'ajax':
          ajaxLoad(url);
          break;
        case 'stop':
          break;
      }

    self.postMessage(JSON.stringify({
      message: 'Thx for your message: ' + event.data
      }));
  }
  // event-control
  console.dir(self);
  self.addEventListener('message', onMainThreadMessage);
}());
