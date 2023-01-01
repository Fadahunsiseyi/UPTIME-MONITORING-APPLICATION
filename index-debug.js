

//Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const exampleDebuggingProblem = require('./lib/exampleDebuggingProblem');

//Declare the application
const app = {};

app.init = () => {
  //Start the server
  debugger;
  server.init();
  debugger
  //Start the workers
  debugger;
  workers.init();
  //making the CLI start last with setTIMEOUT(macro tasks)
  debugger;
  setTimeout(() => {
    cli.init()
  }, 50);
  debugger;
  let foo = 1
  debugger;
  foo+=1
  debugger;
  foo = foo * foo
  debugger;
  foo = foo.toString()
  debugger;
  exampleDebuggingProblem.init();
  debugger
}

app.init()

module.exports = app;