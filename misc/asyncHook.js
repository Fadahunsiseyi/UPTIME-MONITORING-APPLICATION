

const async_hooks = require('async_hooks');
const fs = require('fs');

let targetExecutionContext = false


const whatTimeIsIt = (callback)=>{
    setInterval(()=>{
        fs.writeSync(1,'When the setInterval runs, the execution context is '+async_hooks.executionAsyncId()+'\n')
        callback(Date.now())
    },1000)
}


whatTimeIsIt((time)=>{
    fs.writeSync(1,"The time is "+time+"\n ")
})


const hooks = {
    init(asyncId){
        fs.writeSync(1,'Hook init '+asyncId+'\n ')
    },
    before(asyncId){
        fs.writeSync(1,'Hook before '+asyncId+'\n ')
    },
    destroy(asyncId){
        fs.writeSync(1,'Hook after '+asyncId+'\n ')
    },
    detroys(asyncId){
        fs.writeSync(1,'Hook destroy '+asyncId+'\n ')
    },
    promiseResolve(asyncId){
        fs.writeSync(1,'Hook promiseResolve '+asyncId+'\n ')
    },
}

const asyncHook = async_hooks.createHook(hooks)

asyncHook.enable()