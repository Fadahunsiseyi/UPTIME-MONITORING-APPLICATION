/*
Primary file for the API
*/

//Dependencies

const http = require("http");
const https = require("https");
const config = require("./config");
const fs = require("fs");
const UnifiedServer = require("./UnifiedServer.js");
const _data = require('./lib/data');


_data.update('test','newFile',{'fizz-edit': 'buzz-edit'},(err) => {
  console.log('this was the error: ',err)
})

//Instantiate the HTTP server
var httpServer = http.createServer((req, res) => {
  UnifiedServer(req, res);
});

//Start the http server
httpServer.listen(config.httpPort, () => {
  console.log(
    "The server is listening on port " +
      config.httpPort +
      ", in " +
      config.envName +
      " mode"
  );
});

//Instantiate the HTTP server
const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

var httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  UnifiedServer(req, res);
});

//Start the https server
httpsServer.listen(config.httpsPort, () => {
  console.log(
    "The server is listening on port " +
      config.httpsPort +
      ", in " +
      config.envName +
      " mode"
  );
});
