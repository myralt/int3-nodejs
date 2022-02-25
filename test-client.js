//Node application examples that act as a client.
let http = require('http');


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
http.get(request, response);

//Test 2: Receive chunks asynchronously.