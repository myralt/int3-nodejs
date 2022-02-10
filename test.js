let http = require("http");
let server = http.createServer(newClientCallback);

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  console.log("New Client Connection");
  console.log(request.rawHeaders);
  response.writeHead(200, {'content-type': 'text/html'});
  response.end("<h1>Hello, world!</h1>");
}
