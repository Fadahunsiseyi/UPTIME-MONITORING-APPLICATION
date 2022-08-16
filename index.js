/*
Primary file for the APi
*/

//Dependencies

var http = require('http')

//The server should respond to all request with a string

var server = http.createServer((req,res) => {
    res.end('Hello world\n');
})


//Start the server and let it listen on port 3000