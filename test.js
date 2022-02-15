let http = require('http');
let url = require('url');
let filestream = require('fs');

let server = http.createServer(newClientCallback);
var n = 0;

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");

function newClientCallback(request, response) {
  n++;
  console.log(`Number of connections: ${n}`);

  let date = new Date();
  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let links = ["/time", "/date", "/header", "/multiply", "/convert"];
  
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
      response.writeHead(404, {'content-type': 'text/html'});
      response.end(`<h1>Air x Air = Lots of Air</h1> <p>Hint: you might want to actually provide numbers ( /multiply?val1=2&val2=2 )</p>`);
    }
  }
  else if (url.parse(request.url).pathname === "/convert") 
  {
    let dollars = url.parse(request.url, true).query.usd;
    let euros = 0.88 * dollars;
    if (dollars)
    {
      response.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
      response.end(`${dollars} USD = ${euros} EUR.`);
    }
    else {
      response.writeHead(404, {'content-type': 'text/html'});
      response.end(`<h1>Air is very valuable I know. Not very monetisable though...</h1> <p>Hint: you might want to try ( /convert?usd=1 )</p>`);
    }
  }
  else if (url.parse(request.url).pathname === "/json/getEmployees") 
  {
    let employees = {
      "employees": [
        {"firstName": "John", "lastName":"Doe"},
        {"firstName": "Peter", "lastName":"Jones"}
      ]
    };
    response.writeHead(200, {'content-type': 'text/x-json'});  //application/json
    response.end(JSON.stringify(employees, null, 4));
  }
  else if (url.parse(request.url).pathname === "/json/getZipCode")
  {
    let city = url.parse(request.url, true).query.city;
    const zipFile = filestream.readFileSync('code-postaux-belge.json');

    const cities = JSON.parse(zipFile);

    if (city)
    {
      cities.forEach((c) => {
        if (c.city == city){
          response.writeHead(200, {'content-type': 'text/x-json'});
          response.end(JSON.stringify(c.zip));
        }
      });
    }
    else
    {
      response.writeHead(404, {'content-type': 'text/x-json'});
      response.end("Sorry, no zip code corresponds to city you provided (Or you didn't provide any...)");
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
