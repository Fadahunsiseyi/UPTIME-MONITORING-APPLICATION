/*
Primary file for the API
*/

//Dependencies

const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require('./config')
const fs = require("fs");

//Instantiate the HTTP server

var httpServer = http.createServer((req, res) => {
   unifiedServer(req, res)
});

//Start the http server
httpServer.listen(config.httpPort, () => {
  console.log("The server is listening on port "+config.httpPort+", in "+config.envName+" mode");
});


//Instantiate the HTTP server

const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem'),
}

var httpsServer = https.createServer(httpsServerOptions,(req, res) => {
  unifiedServer(req, res)
});


//Start the https server
httpsServer.listen(config.httpsPort, () => {
  console.log("The server is listening on port "+config.httpsPort+", in "+config.envName+" mode");
});



// All the server logic for the htto and https server

const unifiedServer = (req, res) => {
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
  
      //choose the handler the request should go to, else go to the notFound handler
  
      const chosenHandler =
        typeof router[trimmedPath] !== "undefined"
          ? router[trimmedPath]
          : handlers.notFound;
      const data = {
        trimmedPath,
        method,
        headers,
        buffer,
        queryStringObject,
      };
      chosenHandler(data, (statusCode, payload) => {
        console.log(data);
        statusCode = typeof statusCode !== undefined ? statusCode : 200;
        payload = typeof payload === "object" ? payload : {};
        const payloadString = JSON.stringify(payload);
        //Get the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
  
        //Log the request path
        console.log("Returning this response :", statusCode, payload);
      });
    });
}

const handlers = {};

handlers.sample = (data, callback) => {
  callback(406, { name: "sample handler" });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

//Routes

const router = {
  sample: handlers.sample,
};
