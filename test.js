let http = require('http');
let url = require('url');

let server = http.createServer(newClientCallback);
var n = 0;

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  n++;
  console.log(`Number of connections: ${n}`);

  let date = new Date();
  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let links = ["/time", "/date", "/header", "/multiply"];
  
  if (request.url === "/time") {
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(`<h1>${date.getHours()}:${date.getMinutes()}</h1>`);
  }
  else if (request.url === "/date"){
    let month = date.getMonth() + 1;
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(`<h1>${week[date.getDay()]} ${date.getDate()}/${ month < 10 ? "0" + month : month }/${date.getFullYear()}</h1>`);
  }
  else if (request.url === "/header"){
    let list = "<ul>";
    request.rawHeaders.forEach((props, i) => {
      if (i % 2) list += props + "</li>";
      else list += "<li>" + props + ": ";
    }
    );
    list += "</ul>";
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(list);
  }
  else if (url.parse(request.url).pathname === "/multiply"){
    let val1 = url.parse(request.url, true).query.val1;
    let val2 = url.parse(request.url, true).query.val2;

    if (val1 && val2){
      response.writeHead(200, {'content-type': 'text/html'});
      response.end(`<h1>${val1} x ${val2} = ${val1 * val2}</h1>`);
    }
    else {
      response.writeHead(200, {'content-type': 'text/html'});
      response.end(`<h1>Air x Air = Lots of Air</h1> <p>Hint: you might want to actually provide numbers ( /multiply?val1=2&val2=2 )</p>`);
    }
  }
  else {
    let list = "<ul>";
    let message = "<h1>Welcome!</h1><p>To access the different services provided enter at the end of the url either:</p>";
    links.forEach((link) => {
      list += "<li>" + link + "</li>";
    });
    list += "</ul>";
    message += list;
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(message);
  }

  // console.log(request);
  // console.log(request.rawHeaders);
  // console.log(request.url);
  // console.log(request.headers['accept-language']);
  // let languages = request.headers['accept-language'].split(",");
  // console.log(languages);
  // let fr = languages[0].includes("fr");
  // if (fr) {
  //   console.log(languages[0]);
  // response.end(`<h1>${request.url.substring(1)}</h1>`);
  // response.end("<h1>Bonjour au monde!</h1>");
  // }
  // else {
  //   console.log(languages[0]);
  //   response.writeHead(200, {'content-type': 'text/html'});
  //   response.end("<h1>Hello, world!</h1>");
  // }
}
