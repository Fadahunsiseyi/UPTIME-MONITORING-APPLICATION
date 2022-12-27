const readline = require("readline");
const util = require("util");
const debug = util.debuglog("cli");
const events = require("events");
class _events extends events {}
const e = new _events();

const cli = {};

//Input handlers
e.on("man", (str) => {
  cli.responders.help();
});

e.on("help", (str) => {
  cli.responders.help();
});

e.on("exit", (str) => {
  cli.responders.exit();
});

e.on("stats", (str) => {
  cli.responders.stats();
});

e.on("more user info", (str) => {
  cli.responders.moreUserInfo(str);
});

e.on("list users", (str) => {
  cli.responders.listUsers();
});

e.on("list checks", (str) => {
  cli.responders.listChecks(str);
});

e.on("more check info", (str) => {
  cli.responders.moreCheckInfo(str);
});

e.on("list logs", (str) => {
  cli.responders.listLogs();
});

e.on("more log info", (str) => {
  cli.responders.moreLogInfo(str);
});

//Responders object
cli.responders = {};

//Help / Man
cli.responders.help = () => {
  const commands = {
    "exit": 'Kill the CLI and the rest of the applications',
    "man": 'Show this help page',
    "help": 'Alias of the "man" command',
    "stats": 'Get statistics on the underlying  OS and resource utilization',
    "list users": 'Show list of all the registered users in the system',
    "more user info --{userId}": 'Show details of a specific user in the system',
    "list checks --up --down": 'Show a list of all the active checks in the system,including their states. The "--up" and the "--down" flags are both optional',
    "more check info --{checkId} ": 'Show details of a specified check',
    "list logs": 'Show a list of all logs files available to be read (compressed and uncompressed)',
    "more log info --{fileName}": 'Show details of a specified log file',
  }
  //Show a header for the help page that is as wide as the screen
  cli.horizontalLine()
  cli.centered('CLI MANUAL')
  cli.horizontalLine()
  cli.verticalSpace(2)

  for(const key in commands){
    if(commands.hasOwnProperty(key)){
        const value = commands[key]
        let line = '\x1b[33m'+key+'\x1b[0m'
        const padding = 60 - line.length
        for(let i=0;i<padding;i++){
            line+='  '
        }
        line += value
        console.log(line)
        cli.verticalSpace()
    }
  }

  cli.verticalSpace(1)
  cli.horizontalLine()
};

//Create a vertical space
cli.verticalSpace = (lines) =>{
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1
    for(let i=0;i<lines;i++) {
        console.log('')
    }
}

//Create a horizontal line across the screen
cli.horizontalLine = () =>{
    //get the screen size
    const width = process.stdout.columns
    let line = ''
    for(let i=0;i<width;i++) {
        line+='-'
    }
    console.log(line)
}

//create centered text on the screen
cli.centered = (str) => {
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : '';
        //get the screen size
        const width = process.stdout.columns
        const leftPadding = Math.floor((width - str.length)/2)
        //Put in left padding spaces
        let line = ''
        for(let i=0;i<leftPadding;i++){
            line+=' '
        }
        line+=str;
        console.log(line)
}



//EXIT
cli.responders.exit = () => {
  process.exit(0)
};

//STATS
cli.responders.stats = () => {
  console.log("You asked for stats");
};

//LIST USERS
cli.responders.listUsers = () => {
  console.log("You asked to list users");
};

//MORE USER INFO
cli.responders.moreUserInfo = (str) => {
  console.log("You asked for more user info", str);
};

//LIST CHECKS
cli.responders.listChecks = (str) => {
  console.log("You asked to list checks", str);
};

//MORE CHECKS INFO
cli.responders.moreCheckInfo = (str) => {
  console.log("You asked for more check info", str);
};

//LIST LOGS
cli.responders.listLogs = () => {
  console.log("You asked to list logs");
};

//MORE LOGS INFO
cli.responders.moreLogInfo = (str) => {
  console.log("You asked for more log info", str);
};

//Input processor
cli.processInput = (str) => {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : false;
  //only process if the user wrotes something
  if (str) {
    //codify the unique strings that the user can ask
    const uniqueInputs = [
      "man",
      "help",
      "exit",
      "stats",
      "list users",
      "more user info",
      "list checks",
      "more check info",
      "list logs",
      "more log info",
    ];
    //Go through the possible inputs, and emit an event
    let matchFound = false;
    let counter = 0;
    uniqueInputs.some((input) => {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        //Emit an event matching the input
        e.emit(input, str);
        return true;
      }
    });
    //if no match found, tell the user to try again
    if (!matchFound) {
      console.log("Sorry,try again");
    }
  }
};

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
  _interface.on("close", () => {
    process.exit(0);
  });
};

module.exports = cli;
