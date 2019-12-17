const WebSocket = require('ws');

const ws = new WebSocket('ws://80.211.33.82:3000');

const message = JSON.stringify({ 
  request : "login", 
  UserID: 13,
  key : 'chiave'
});

/* const message = JSON.stringify({
  request: "login",
  UserID: 1,
  key: 'chiave'
}); */

ws.on('open', function open() {
  ws.send(message);
});

ws.on('message', function incoming(data) {
  console.log(data);
});

ws.on('close', function () {
  console.log("Connection closed")
})