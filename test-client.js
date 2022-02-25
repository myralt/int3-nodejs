//Node application examples that act as a client.
let http = require('http');
let url = require('url');


//Test 1: request Google's homepage.
//Prepare request:
let request = {
  "host": "www.google.com",
  "port": 80,
  "path": "/index.html"
  };

//Define callback function:
let response = (resp) => {
  console.log(resp.statusCode);
}

//Send request and wait:
//http.get(request, response);

//Test 2: Receive chunks asynchronously.
response = (resp) => {
  let rawData = "";
  resp.on('data', (chunk) => {
    rawData += chunk;
  });
  resp.on('end', (lastChunk) => {
    console.log(rawData);
  });
}

//http.get(request, response);

//Test 3: Using https.
let https = require('https');

request = {
  "host": "www.interface3.be",
  "port": 443,
  "path": "/index.html"
};

//https.get(request, response);

//Test 4: Query an api (https://open.er-api.com/v6/latest/USD).
request = {
  "host": "open.er-api.com",
  "port": 443,
  "path": "/v6/latest/EUR"
}

//https.get(request, response);

//Test 5: Return rates as an object.
response = (resp) => {
  let rawData = "";
  resp.on('data', (chunk) => {
    rawData += chunk;
  });
  resp.on('end', (lastChunk) => {
    let currency = JSON.parse(rawData);
    console.log(currency.rates);
  });
}

//https.get(request, response);

//Test 6: Now display the object in a browser window (so not client anymore).
let value = 100 //USD to convert to EUR
request = {
  "host": "open.er-api.com",
  "port": 443,
  "path": "/v6/latest/USD"
}

let usd, euro;

response = (resp) => {
  let rawData = "";
  resp.on('data', (chunk) => {
    rawData += chunk;
  });
  resp.on('end', (lastChunk) => {
    let currency = JSON.parse(rawData);
    usd = currency.rates["USD"] * value;
    euro = currency.rates["EUR"] * value;
    console.log(usd);
    console.log(euro);
  });
}

https.get(request, response);
//format response now to html
//send it to localhost port 8080
//it displays?

//Create a server instance:
let server = http.createServer(responseBrowser);

//Set it to a port:
server.listen(8080);

//Quick shortcut and sanity check:
console.log("Server running at http://127.0.0.1:8080/");

//Define the callback function:
function responseBrowser(req, res){
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(`<h1>Conversion from USD to EUR</h1><p>${usd} dollars valent ${euro}</p>`);
}
