let http = require("http");
let server = http.createServer(newClientCallback);

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  console.log("New Client Connection");
  // console.log(request);
  // console.log(request.rawHeaders);
  // console.log(request.headers['accept-language']);
  let languages = request.headers['accept-language'].split(",");
  // console.log(languages);
  let fr = languages[0].includes("fr");
  if (fr) {
    console.log(languages[0]);
    response.writeHead(200, {'content-type': 'text/html'});
    response.end("<h1>Bonjour au monde!</h1>");
  }
  else {
    console.log(languages[0]);
    response.writeHead(200, {'content-type': 'text/html'});
    response.end("<h1>Hello, world!</h1>");
  }
}
