const readline = require("readline");
const util = require("util");
const debug = util.debuglog("cli");
const events = require("events");
class _events extends events {}
const e = new _events();
const os = require("os");
const v8 = require("v8");
const _data = require('./data')
const _logs = require('./logs')
const helpers = require('./helpers')
const childProcess = require('child_process');

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
  //compile an object of stats
  const stats = {
    'Load Average': os.loadavg().join(' '),
    'CPU Count': os.cpus().length,
    'Free Memory': os.freemem(),
    'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size) * 100),
    'Available Heap Allocated (%)':  Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime': os.uptime()+' Seconds'
  }
  //create header for the stats
  cli.horizontalLine()
  cli.centered('SYSTEM STATISTICS')
  cli.horizontalLine()
  cli.verticalSpace(2)
  
  for(const key in stats){
    if(stats.hasOwnProperty(key)){
        const value = stats[key]
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

//LIST USERS
cli.responders.listUsers = () => {
  _data.list('users',(err,userIds)=>{
    if(!err && userIds && userIds.length > 0) {
        cli.verticalSpace()
        userIds.forEach((userId) => {
            _data.read('users',userId,(err,userData)=>{
                if(!err && userData){
                    let line = 'Name: '+userData.firstName+' '+userData.lastName+' Phone: '+userData.phone+' Checks: ';
                    const numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0
                    line+=numberOfChecks
                    console.log(line)
                    cli.verticalSpace()
                }
            })
        })
    }
  })
};

//MORE USER INFO
cli.responders.moreUserInfo = (str) => {
  //Get the ID from the string
  const arr = str.split('--')
  const userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1] : false
  if(userId){
    _data.read('users',userId,(err,userData)=>{
        if(!err && userData){
            //remove the hashed password of the user
            delete userData.hashedPassword
            //Print the JSON with text highlighting
            cli.verticalSpace()
            console.dir(userData,{'colors': true})
            cli.verticalSpace()
        }
    })
  }
};

//LIST CHECKS
cli.responders.listChecks = (str) => {
  _data.list('checks',(err,checkIds)=>{
    if(!err && checkIds && checkIds.length > 0) {
        cli.verticalSpace()
        checkIds.forEach((checkId)=>{
            _data.read('checks',checkId,(err,checkData)=>{
                const includeCheck = false
                const lowerString = str.toLowerCase()
                //get the state default to down
                const state = typeof(checkData.state) == 'string' ? checkData.state : 'down'
                //get the state default to unknown
                const stateOrUnknown = typeof(checkData.state) == 'string' ? checkData.state : 'unknown'
                //if the user has specified the state,include check accordingly
                if(lowerString.indexOf('--'+state) > -1 || (lowerString.indexOf('--down')==-1 && lowerString.indexOf('--up') == -1)){
                    const line = 'ID: '+checkData.id+' '+checkData.method.toUpperCase()+' '+checkData.protocol+'://'+checkData.url+' State: '+stateOrUnknown
                    console.log(line)
                    cli.verticalSpace()
                }
            })
        })
    }
  })
};

//MORE CHECKS INFO
cli.responders.moreCheckInfo = (str) => {
    //Get the ID from the string
    const arr = str.split('--')
    const checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1] : false
    if(checkId){
      _data.read('checks',checkId,(err,checkData)=>{
          if(!err && checkData){
              //Print the JSON with text highlighting
              cli.verticalSpace()
              console.dir(checkData,{'colors': true})
              cli.verticalSpace()
          }
      })
    }
};

//LIST LOGS
cli.responders.listLogs = () => {
  // _logs.list (true,(err,logFileNames)=>{
  //   if(!err && logFileNames && logFileNames.length > 0 ){
  //       cli.verticalSpace()

  //   }
  // })
  const ls = childProcess.spawn('ls',['././logs/'])
  ls.stdout.on('data',(dataObj)=>{
    const dataStr = dataObj.toString()
    const logFileNames = dataStr.split('\n')
logFileNames.forEach((logFileName) => {
  if(typeof(logFileName) == 'string' && logFileName.length > 0 && logFileName.includes('-')){
      console.log(logFileName)
      cli.verticalSpace()
  }
})
  })
}


//MORE LOGS INFO
cli.responders.moreLogInfo = (str) => {
    //Get the LogfileName from the string
    const arr = str.split('--')
    const logFileName = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1] : false
    if(logFileName){
    cli.verticalSpace()
    //decompress the log
    _logs.decompress(logFileName,(err,strData)=>{
        console.log(strData,'why null',logFileName)
        if(!err && strData){
            //Split into lines
            const arr = strData.split('\n')
            console.log(arr)
            arr.forEach((jsonString)=>{
                const logObject = helpers.parseJsonToObject(jsonString)
                if(logObject && JSON.stringify(logObject) !== '{}' ){
                    console.dir(logObject,{'colors': true})
                    cli.verticalSpace()
                }
            })
        }
    })
    }
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
