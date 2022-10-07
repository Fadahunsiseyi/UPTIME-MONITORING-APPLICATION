/*
Primary file for the API
*/

//Dependencies

const http = require("http");
const https = require("https");
const config = require("./config");
const fs = require("fs");
const UnifiedServer = require("./unifiedserver/UnifiedServer.js");
const helpers = require("../lib/helpers");
const path = require("path");


// _data.delete('test','newFile',(err) => {
//   console.log('this was the error: ',err)
// })

const server = {}

//@TODO 
helpers.sendTwilioSms('4158375309','hello world',(err) =>{
  console.log('Error message: ',err)
})

//Instantiate the HTTP server
server.httpServer = http.createServer((req, res) => {
  UnifiedServer(req, res);
});

//Instantiate the HTTP server
const httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'/../https/cert.pem')),
};

server.httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  UnifiedServer(req, res);
});

server.init = () => {
    //Start the http server
server.httpServer.listen(config.httpPort, () => {
    console.log(
      "The server is listening on port " +
        config.httpPort +
        ", in " +
        config.envName +
        " mode"
    );
  });

  //Start the https server
server.httpsServer.listen(config.httpsPort, () => {
    console.log(
      "The server is listening on port " +
        config.httpsPort +
        ", in " +
        config.envName +
        " mode"
    );
  });
  
}

module.exports = server;