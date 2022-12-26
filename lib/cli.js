const readline = require("readline");
const util = require("util");
const debug = util.debuglog("cli");
const events = require("events");
class _events extends events {}
const e = new _events();

const cli = {};

//Input processor

cli.processInput = (str) =>{
    str = typeof(str) == "string" && str.trim().length > 0 ? str.trim() : false;
    //only process if the user wrotes something
    if(str){
        //codify the unique strings that the user can ask
        const uniqueInputs = [
            'man',
            'help',
            'exist',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info',
        ]
        //Go through the possible inputs, and emit an event
        let matchFound = false
        let counter = 0
        uniqueInputs.some((input)=>{
            if(str.toLowerCase().indexOf(input) > -1){
                matchFound = true
                //Emit an event matching the input
                e.emit(input,str)
                return true
            }
        })
        //if no match found, tell the user to try again
        if(!matchFound){
            console.log('Sorry,try again')
        }
    }
}

cli.init = () => {
  console.log("\x1b[34m%s\x1b[0m", "The CLI is now available");

  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  _interface.prompt();

  //Handle each line of input separately

  _interface.on("line", (str) => {
    cli.processInput(str);

    //Re-initialize the prompt
    _interface.prompt();
  });
  //if the user stops the CLI, stop the associated process
  _interface.on('close',()=>{
    process.exit(0);
  })
};

module.exports = cli;
