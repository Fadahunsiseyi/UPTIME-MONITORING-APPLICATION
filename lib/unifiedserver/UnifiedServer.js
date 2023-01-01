
const url = require("url");
const handlers = require("../handlers");
const helpers = require("../helpers");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require('util');
const debug = util.debuglog('server')

// All the server logic for the http and https server

const unifiedServer = (req, res) => {
    //Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    // debug(parsedUrl);
  
    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, "");
    //Get query string as an object
    const queryStringObject = parsedUrl.query;
    var method = req.method.toLowerCase();
  
    //Get the headers
    var headers = req.headers;
    debug(headers,'header line 23');
  
    //Get the payload if any
    var decoder = new StringDecoder("utf-8");
    var buffer = "";
    req.on("data", (data) => {
      buffer += decoder.write(data);
    });
    req.on("end", () => {
      buffer += decoder.end();
  
      //choose the handler the request should go to, else go to the notFound handler
      let chosenHandler =
        typeof router[trimmedPath] !== "undefined"
          ? router[trimmedPath]
          : handlers.notFound;

          //If the request is within the public directory,use the public handler
          chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler
      const data = {
        trimmedPath,
        method,
        headers,
        payload: helpers.parseJsonToObject(buffer),
        queryStringObject,
      };

    });
    processHandlerResponse = (res,method,trimmedPath,statusCode,payload,contentType)=>{
      console.log(statusCode,payload,contentType,'from the handler in unifiedServer!!!!!!!!!!!!');
      //Determine the type of response fallback to json
      contentType = typeof contentType == 'string' ? contentType : 'json';
      statusCode = typeof statusCode == 'number' ? statusCode : 200;
      console.log(statusCode,'the status code!!!')
      //Return response part that are content specific
      let payloadString = '';
      if(contentType == 'json'){
        res.setHeader('Content-Type', 'application/json');
        payload = typeof payload == "object" ? payload : {};
        console.log(payload,'the payload!!!')
        payloadString = JSON.stringify(payload);
      }
      if(contentType == 'html'){
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof payload == "string" ? payload : '';
      }
      if(contentType == 'favicon'){
        res.setHeader('Content-Type', 'image/x-icon');
        payloadString = typeof payload !== "undefined" ? payload : '';
      }
      if(contentType == 'css'){
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof payload !== "undefined" ? payload : '';
      }
      if(contentType == 'jpg'){
        res.setHeader('Content-Type', 'image/jpeg');
        payloadString = typeof payload == "string" ? payload : '';
      }
      if(contentType == 'png'){
        res.setHeader('Content-Type', 'image/png');
        payloadString = typeof payload !== "undefined" ? payload : '';
      }
      if(contentType == 'plain'){
        res.setHeader('Content-Type', 'text/plain');
        payloadString = typeof payload !== "undefined" ? payload : '';
      }
      //Return the response parts that are common to all content types
      res.writeHead(statusCode);
      res.end(payloadString);

      //Log the request path
      if(statusCode == 200){      
      debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
    }
}

//process the response from the handler
//Routes

const router = {
  '': handlers.index,
  'account/create': handlers.accountCreate,
  'account/edit': handlers.accountEdit,
  'account/deleted': handlers.accountDeleted,
  'session/create': handlers.sessionCreate,
  'session/deleted': handlers.sessionDeleted,
  'checks/all': handlers.checksList,
  'checks/create': handlers.checksCreate,
  'checks/edit': handlers.checksEdit,
  'ping': handlers.ping,
  'api/users': handlers.users,
  'api/tokens': handlers.tokens,
  'api/checks': handlers.checks,
  'favicon.ico': handlers.favicon,
  'public': handlers.public,
  'examples/error': handlers.exampleError
};


module.exports = unifiedServer;