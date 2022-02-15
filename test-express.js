let http = require('http');
let express = require('express');

// Set up listener at port 8080:
let server = http.createServer(newClientCallback);
var n = 0;

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

// Callback for listener:
function newClientCallback(request, response) {
  // Just to know how many calls were made:
  n++;
  console.log(`Number of connections: ${n}`);
}
