let http = require("http");
let server = http.createServer(newClientCallback);
var n = 0;

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  n++;
  console.log(`Number of connections: ${n}`);
  // console.log(request);
  // console.log(request.rawHeaders);
  // console.log(request.url);
  // console.log(request.headers['accept-language']);
  // let languages = request.headers['accept-language'].split(",");
  // console.log(languages);
  // let fr = languages[0].includes("fr");
  // if (fr) {
  //   console.log(languages[0]);
  response.writeHead(200, {'content-type': 'text/html'});
  response.end(`<h1>${request.url.substring(1)}</h1>`);
  // response.end("<h1>Bonjour au monde!</h1>");
  // }
  // else {
  //   console.log(languages[0]);
  //   response.writeHead(200, {'content-type': 'text/html'});
  //   response.end("<h1>Hello, world!</h1>");
  // }
}
