var ws;

window.onload = function() {
  init();
}

function toggleButton(buttonId) {
  // console.log(buttonId);
  var classes = document.getElementById(buttonId).classList;

  if(classes.length == 1) {
    //Currently transparent
    classes.add("blue-button");
    ws.send({
      led: holdToInt(buttonId), 
      red: 0, 
      green: 0, 
      blue: 255
    });
  }
  else if(classes.length == 2) {
    if(classes.item(1) == "blue-button") {
      //Currently blue
      classes.remove("blue-button");
      classes.add("green-button");
      ws.send({
        led: holdToInt(buttonId), 
        red: 0, 
        green: 255, 
        blue: 0
      });
    }
    else if(classes.item(1) == "green-button") {
      //Currently green
      classes.remove("green-button");
      classes.add("red-button");
      ws.send({
      led: holdToInt(buttonId), 
        red: 255, 
        green: 0, 
        blue: 0
      });
    }
    else if(classes.item(1) == "red-button") {
      //Currently red
      classes.remove("red-button");
      ws.send({
        led: holdToInt(buttonId), 
        red: 0, 
        green: 0, 
        blue: 0
      });
    }
  }
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

// function test() {
//   var letters = "ABCDEFGHIJK";
//   for(var i = 0; i < 11; i++) {
//     for(var j = 1; j <= 18; j++) {
//       console.log(letters[i] + j + " " + holdToInt(letters[i] + j));
//     }
//   }
// }

// function test2() {
//   for(var i = 0; i < 198; i++) {
//     console.log(i + " " + intToHold(i));
//   }
// }

function init() {
  // Connect to Web Socket
  ws = new WebSocket("ws://localhost:9001/");

  // Set event handlers.
  ws.onopen = function() {
    console.log("Successfully opened WebSocket");
  };
  
  ws.onmessage = function(e) {
    // e.data contains received string.
    console.log("Message: " + e.data);
  };
  
  ws.onclose = function() {
    console.log("Successfully closed WebSocket");
  };

  ws.onerror = function(e) {
    console.log("An error occurred: " + e);
  };
}

// function onSubmit() {
//   var input = document.getElementById("input");
//   // You can send message to the Web Socket using ws.send.
//   ws.send(input.value);
//   output("send: " + input.value);
//   input.value = "";
//   input.focus();
// }

// function onCloseClick() {
//   ws.close();
// }

// function output(str) {
//   var log = document.getElementById("log");
//   var escaped = str.replace(/&/, "&amp;").replace(/</, "&lt;").
//     replace(/>/, "&gt;").replace(/"/, "&quot;"); // "
//   log.innerHTML = escaped + "<br>" + log.innerHTML;
// }
