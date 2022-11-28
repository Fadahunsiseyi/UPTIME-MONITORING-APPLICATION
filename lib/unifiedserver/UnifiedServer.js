
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
        debug(data,'from te handler in unifiedServer');
        statusCode = typeof statusCode !== undefined ? statusCode : 200;
        payload = typeof payload === "object" ? payload : {};
        const payloadString = JSON.stringify(payload);
        debug(payloadString,'line 52')
        //Get the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
  
        //Log the request path
        if(statusCode == 200){      
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
        } else {
          debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
        }
      });
    });
}


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
};


module.exports = unifiedServer;