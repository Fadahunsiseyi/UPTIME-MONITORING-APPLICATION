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

e.on("stat", (str) => {
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
  console.log("You asked for help");
};

//EXIT
cli.responders.exit = () => {
  console.log("You asked for exit");
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
