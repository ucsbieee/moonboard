var ws;
var board;

window.onload = function() {
  init();
}

function toggleButton(buttonId) {
  // console.log(buttonId);
  var classes = document.getElementById(buttonId).classList;

  var data = {
    led: holdToInt(buttonId),
    color: ""
  };

  if(classes.length == 1) {
    //Currently off, turn blue
    data.color = "B";
  }
  else if(classes.length == 2) {
    if(classes.item(1) == "blue-button") {
      //Currently blue, turn green
      data.color = "G";
    }
    else if(classes.item(1) == "green-button") {
      //Currently green, turn red
      data.color = "R";
    }
    else if(classes.item(1) == "red-button") {
      //Currently red, turn off
      data.color = "o";
    }
  }

  ws.send(JSON.stringify(data));
}

function confirmClear() {
  showMessage("regular", "Are you sure you want to clear the Moonboard?");
  document.getElementById('confirm-buttons').style.display = "block";
}

function clearMoonboard() {
  var data = {
    led: -1,
    color: "o"
  };

  ws.send(JSON.stringify(data));

  closeModal();
}

function closeModal() {
  document.getElementById('messageModal').style.display = "none";
  document.getElementById('connect-buttons').style.display = "none";
  document.getElementById('confirm-buttons').style.display = "none";
}

function holdToInt(hold) {
  var column = hold.match(/[A-Z]/g)[0].charCodeAt(0) - 65;
  var row = hold.match(/[0-9]+/g)[0] - 1;
  return (18 * column) + (Math.abs((column % 2) - 1) * row) + ((column % 2) * (17 - row));
}

function intToHold(int) {
  var letters = "ABCDEFGHIJK";
  var column = letters[Math.floor(int / 18)];
  var row = (((Math.floor(int / 18) % 2) * (18 - int % 18)) + (Math.abs((Math.floor(int / 18) % 2) - 1) * (int % 18 + 1)));
  return column + row;
}

function showMessage(type, message) {
  document.getElementById('message').innerHTML = message;

  //Update class list
  var classToAdd = "";
  if(type == "error") {
    classToAdd = "red-border";
  }
  else if(type == "success") {
    classToAdd = "green-border";
  }
  else {
    classToAdd = "grey-border";
  }

  document.getElementById('messageDiv').classList = "modal-content " + classToAdd;
  document.getElementById('messageModal').style.display = "block";
}

function init() {
  // Display loading message
  showMessage("regular", "Connecting to Moonboard...");
  document.getElementById('connect-buttons').style.display = "none";

  // Connect to Web Socket
  ws = new WebSocket("ws://192.168.4.1:9001/");
  // ws = new WebSocket("ws://localhost:9001/");

  // Set event handlers.
  ws.onopen = function() {
    console.log("Successfully opened WebSocket");
    closeModal();
  };
  
  ws.onmessage = function(e) {
    // e.data contains received string.
    board = JSON.parse(e.data);
    console.log(board);

    for(var i = 0; i < 198; i++) {
      var classToAdd = "";
      if(board[i] == "R") {
        classToAdd = "red-button";
      }
      else if(board[i] == "G") {
        classToAdd = "green-button";
      }
      else if(board[i] == "B") {
        classToAdd = "blue-button";
      }

      document.getElementById(intToHold(i)).classList = "led-button " + classToAdd;
    }
  };
  
  ws.onclose = function() {
    console.log("Successfully closed WebSocket");
    showMessage("error", "Failed to connect to the Moonboard server.<br>Ensure that the Raspberry Pi is on and you are connected to the 'MoonboardPi' network.");
    document.getElementById('connect-buttons').style.display = "block";
  };

  ws.onerror = function(e) {
    console.log("An error occurred:");
    console.log(e);
    showMessage("error", "Failed to connect to the Moonboard server.<br>Ensure that the Raspberry Pi is on and you are connected to the 'MoonboardPi' network.");
    document.getElementById('connect-buttons').style.display = "block";
  };
}