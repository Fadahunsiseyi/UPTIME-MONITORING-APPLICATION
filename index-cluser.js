

//Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const cluster = require('cluster')
const os = require('os')

//Declare the application
const app = {};

app.init = (callback) => {

  //Start the workers
  workers.init();
  if(cluster.isMaster){
      //making the CLI start last with setTIMEOUT(macro tasks)
  setTimeout(() => {
    cli.init()
    callback()
  }, 50);
  //Fork the process
  for(let i=0;i<os.cpus().length;i++){
    cluster.fork()
  }
  } else {
    //If we're not on the master thread, Start the HTTP server
    server.init();
  }

}

//self invoking only if required directly

if(require.main === module){
app.init(()=>{})
}


module.exports = app;