
const helpers = require('./../lib/helpers')
const assert = require('assert')
const app = require('../index-debug')
const logs = require('./../lib/logs')
const exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem')


//Holder for these tests

const unit = {}


unit['helpers.getANumber should return 1'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(val, 1)
    done()
}

unit['helpers.getANumber should return number'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(typeof(val), 'number')
    done()
}

unit['helpers.getANumber should return 2'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(val, 2)
    done()
}

//Logs.list should call back an array and a false error

unit['logs.list should callback a false error and an array of logs names'] = (done)=>{
    logs.list(true,(err,logFileNames) =>{
        assert.equal(err,false)
        assert.ok(logFileNames instanceof Array)
        assert.ok(logFileNames.length > -1)
        done()
    })
}

//Logs.truncate should not show if the log doesn't exist

unit['logs truncate should not show if the logId doesnt exist. It should callback an error instead'] = (done)=>{
    assert.doesNotThrow(() =>{
        logs.truncate('I do not exist',(err)=>{
            assert.ok(err)
            done()
        })
    },TypeError)
}



//exmapleDebuggingProblem should not throw but it does

unit['exampleDebuggingProblem.init should not throw when called'] = (done)=>{
    assert.doesNotThrow(() =>{
      exampleDebuggingProblem.init()
      done()
    },TypeError)
}







module.exports = unit