//Node application examples that act as a client or proxy.

//Test 1: request Google's homepage.
let http = require('http');

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

let currency, usd, euro;

response = (resp) => {
  let rawData = "";
  resp.on('data', (chunk) => {
    rawData += chunk;
  });
  resp.on('end', (lastChunk) => {
    currency = JSON.parse(rawData); //we only ask for the information once and don't make unnecessary requests (money).
    usd = currency.rates["USD"] * value;
    euro = currency.rates["EUR"] * value;
    console.log(usd);
    console.log(euro);
  });
}

//https.get(request, response);
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
// function responseBrowser(req, res){
//   res.writeHead(200, {'content-type': 'text/html'});
//   res.end(`<h1>Conversion from USD to EUR</h1><p>${usd} dollars valent ${euro}</p>`);
// }

//Test 7: Now give the option to choose currency as well as target of conversion.
let url = require('url');

function responseBrowser(req, res){
  if (url.parse(req.url).pathname === "/convert"){
    let valueToConvert = url.parse(req.url, true).query.symbol;
    let target = url.parse(req.url, true).query.target;
    let data, value, converted;

    if (valueToConvert && target){
      let requestToApi = {
        "host": "open.er-api.com",
        "port": 443,
        "path": `/v6/latest/${valueToConvert}`
      }
      let responseFromApi = (resp) => {
        let rawData = "";
        resp.on('data', (chunk) => {
          rawData += chunk;
        });
        resp.on('end', (lastChunk) => {
          data = JSON.parse(rawData);
          value = data.rates[valueToConvert];
          converted = data.rates[target];
        });
      }

      https.get(requestToApi, responseFromApi);

      res.writeHead(200, {'content-type': 'text/x-json'});
      res.end(JSON.stringify([value, converted], null, 4));
    }
    else {
      res.writeHead(404, {'content-type': 'text/html'});
      res.end("<h1>Air = Air I guess</h1>");
    }
  } else {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(`<h1>Conversion for whatever you want!</h1>`);
  }
}

//parse the url for the path containing query parameters
//retrieve the euro value for multiplication
//retrieve the target currency
//read the file
//extract euro and target props from rates prop in currency object
//format as html
//write head and send the html