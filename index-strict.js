

//Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');

//Declare the application
const app = {};

//Declare a global (that strict mode should catch)
foo = 'bar'

app.init = () => {
  //Start the server
  server.init();
  //Start the workers
  workers.init();
  //making the CLI start last with setTIMEOUT(macro tasks)
  setTimeout(() => {
    cli.init()
  }, 50);
}

app.init()

module.exports = app;