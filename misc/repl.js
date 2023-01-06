

const repl = require('repl')

repl.start({
    'prompt': '>',
    'eval': (str)=>{
        console.log('We are at the evaluation stage',str)
        if(str.indexOf('fizz') > -1){
            console.log('buzz')
        }
    }
})