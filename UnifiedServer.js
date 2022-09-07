
const url = require("url");
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");
const StringDecoder = require("string_decoder").StringDecoder;

// All the server logic for the http and https server

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
    console.log(headers,'header line 23');
  
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
        payload: helpers.parseJsonToObject(buffer),
        queryStringObject,
      };
      chosenHandler(data, (statusCode, payload) => {
        console.log(data,'from te handler in unifiedServer');
        statusCode = typeof statusCode !== undefined ? statusCode : 200;
        payload = typeof payload === "object" ? payload : {};
        const payloadString = JSON.stringify(payload);
        console.log(payloadString,'line 52')
        //Get the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
  
        //Log the request path
        console.log("Returning this response :", statusCode, payload);
      });
    });
}


//Routes

const router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
};


module.exports = unifiedServer;