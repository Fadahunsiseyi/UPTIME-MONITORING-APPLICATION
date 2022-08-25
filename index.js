/*
Primary file for the API
*/

//Dependencies

var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

//The server should respond to all request with a string

var server = http.createServer((req, res) => {
  //Get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  // console.log(parsedUrl);

  //Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  //Get query string as an object
  const queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();

  //Get the headers
  var headers = req.headers;
  console.log(headers);

  //Get the payload if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();

    //Get the response
    res.end("Hello world\n");

    //Log the request path
    console.log("Request is received on path: ", queryStringObject);
    console.log("Request is received with payload: ", buffer);
  });
});

//Start the server and let it listen on port 3000

server.listen(4000, () => {
  console.log("The server is listening on port 4000");
});
