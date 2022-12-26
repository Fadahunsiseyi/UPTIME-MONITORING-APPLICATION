const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli')
const events = require('events');
class _events extends events{}
const e = new _events()


const cli = {}

cli.init = () =>{
    console.log('\x1b[34m%s\x1b[0m','The CLI is now available')
}

const _readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
})

_readline.prompt()





module.exports = cli