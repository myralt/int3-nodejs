let http = require("http");
let server = http.createServer(newClientCallback);

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  console.log("New Client Connection");
}
